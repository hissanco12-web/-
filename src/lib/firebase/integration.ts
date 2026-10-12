import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  Auth,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  Firestore,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  FirebaseStorage,
} from 'firebase/storage';
import { CMSData } from '../../types/cms';
import { databaseId, firebaseConfig, isFirebaseConfigured } from './config';

export { isFirebaseConfigured };

/**
 * هوية المالك (المدير الرئيسي).
 * - هذه القيم ليست سرية؛ الحماية الحقيقية تتم عبر Firebase Authentication (كلمة السر)
 *   وعبر قواعد firestore.rules و storage.rules التي تتحقق من نفس القيم على الخادم.
 * - كلمة السر لا تُكتب في الكود أبداً، بل يحددها المالك من Firebase Console
 *   (Authentication → Users) أو عبر زر "نسيت كلمة السر" في صفحة الدخول.
 * - أي تغيير هنا يجب أن يقابله نفس التغيير في firestore.rules و storage.rules.
 */
export const AUTHORIZED_ADMIN_EMAIL = 'smthysan@gmail.com';
export const AUTHORIZED_ADMIN_UID = 'nYe0azkrCYMaJ7yOrkEfkYMQ1K62';

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

if (isFirebaseConfigured()) {
  try {
    app = getApps().length > 0 ? getApps()[0] : initializeApp(firebaseConfig);
    auth = getAuth(app);
    db =
      databaseId && databaseId !== '(default)'
        ? getFirestore(app, databaseId)
        : getFirestore(app);
    storage = getStorage(app);
  } catch (err) {
    console.warn('Firebase initialization skipped or failed:', err);
  }
}

function withTimeout<T>(promise: Promise<T>, ms = 4000): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('TIMEOUT')), ms);
    promise
      .then((val) => {
        clearTimeout(timer);
        resolve(val);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export async function fetchPublicSiteContent(): Promise<CMSData | null> {
  if (!db) return null;
  try {
    const snap = await withTimeout(getDoc(doc(db, 'siteContent', 'public')), 4000);
    if (snap.exists()) {
      return snap.data() as CMSData;
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch siteContent/public from Firestore:', err);
    return null;
  }
}

/** الحد الأقصى لحجم وثيقة Firestore هو 1MB؛ نترك هامشاً للأمان. */
const FIRESTORE_DOC_SAFE_BYTES = 950 * 1024;

/**
 * يحفظ محتوى الموقع في Firestore (siteContent/public).
 * يرمي خطأً واضحاً بالعربية عند الفشل بدل الادعاء بنجاح الحفظ.
 */
export async function savePublicSiteContent(data: CMSData): Promise<void> {
  if (!db) {
    throw new Error('Firebase غير مهيأ، لا يمكن الحفظ في السحابة.');
  }
  if (!auth?.currentUser) {
    throw new Error('انتهت جلسة الدخول. سجّل الدخول مرة أخرى ثم أعد الحفظ.');
  }
  const payload: CMSData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };
  const sizeBytes = new Blob([JSON.stringify(payload)]).size;
  if (sizeBytes > FIRESTORE_DOC_SAFE_BYTES) {
    throw new Error(
      `حجم بيانات الموقع (${Math.round(sizeBytes / 1024)}KB) تجاوز حد Firestore (1MB). ` +
        'السبب غالباً صور محفوظة داخل البيانات بدل Firebase Storage. فعّل Storage أو استبدل بعض الصور بروابط.'
    );
  }
  try {
    await withTimeout(setDoc(doc(db, 'siteContent', 'public'), payload, { merge: false }), 15000);
  } catch (err) {
    throw new Error(describeFirebaseError(err, 'تعذر الحفظ في Firestore.'));
  }
}

/** هل هذا المستخدم هو المالك (بالمعرّف UID أو بالبريد)؟ */
export function isOwnerUser(user: User): boolean {
  return (
    user.uid === AUTHORIZED_ADMIN_UID ||
    (user.email || '').toLowerCase() === AUTHORIZED_ADMIN_EMAIL
  );
}

/**
 * قواعد Firestore تقبل المالك عبر البريد فقط إذا كان البريد مؤكَّداً (email_verified)،
 * أو عبر المعرّف UID مباشرة. هذه الدالة تخبر الواجهة إن كان التأكيد مطلوباً.
 */
export function ownerNeedsEmailVerification(user: User): boolean {
  return user.uid !== AUTHORIZED_ADMIN_UID && !user.emailVerified;
}

/**
 * يتحقق أن المستخدم المسجَّل مدير فعلاً.
 * - المالك: مسموح دائماً.
 * - غيره: يجب وجود سجل admins/{uid} مفعّل وبنفس البريد.
 * - عند أي خطأ: الرفض (لا نفتح اللوحة عند الشك).
 */
export async function verifyAdminRecord(user: User): Promise<boolean> {
  if (isOwnerUser(user)) return true;
  if (!db) return false;
  try {
    const snap = await withTimeout(getDoc(doc(db, 'admins', user.uid)), 5000);
    if (!snap.exists()) return false;
    const data = snap.data();
    return Boolean(
      data &&
        data.active === true &&
        typeof data.email === 'string' &&
        user.email &&
        data.email.toLowerCase() === user.email.toLowerCase()
    );
  } catch {
    return false;
  }
}

/** يحوّل رموز أخطاء Firebase إلى رسائل عربية مفهومة تشرح السبب الحقيقي. */
export function describeFirebaseError(err: unknown, fallback: string): string {
  const code = (err as { code?: string })?.code || (err instanceof Error ? err.message : '');
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/invalid-login-credentials':
      return 'البريد الإلكتروني أو كلمة السر غير صحيحة. يمكنك استخدام "نسيت كلمة السر".';
    case 'auth/user-not-found':
      return 'لا يوجد حساب بهذا البريد في Firebase Authentication. أنشئه من Firebase Console ← Authentication ← Users.';
    case 'auth/invalid-email':
      return 'صيغة البريد الإلكتروني غير صحيحة.';
    case 'auth/user-disabled':
      return 'هذا الحساب معطّل في Firebase Authentication.';
    case 'auth/operation-not-allowed':
      return 'طريقة الدخول بالبريد وكلمة السر غير مفعّلة. فعّلها من Firebase Console ← Authentication ← Sign-in method ← Email/Password.';
    case 'auth/unauthorized-domain':
      return `هذا النطاق (${window.location.hostname}) غير مصرّح له. أضفه من Firebase Console ← Authentication ← Settings ← Authorized domains.`;
    case 'auth/too-many-requests':
      return 'محاولات كثيرة خاطئة. انتظر بضع دقائق أو أعد تعيين كلمة السر.';
    case 'auth/network-request-failed':
    case 'TIMEOUT':
      return 'تعذر الاتصال بخوادم Firebase. تحقق من الإنترنت ثم أعد المحاولة.';
    case 'auth/missing-password':
      return 'أدخل كلمة السر.';
    case 'permission-denied':
      return 'رفضت قواعد Firebase العملية. تأكد من نشر firestore.rules الجديدة ومن تأكيد بريدك الإلكتروني (انظر FIREBASE_SETUP.md).';
    case 'unauthenticated':
      return 'انتهت جلسة الدخول. سجّل الدخول مرة أخرى.';
    default:
      return code ? `${fallback} (${code})` : fallback;
  }
}

/**
 * تسجيل دخول المدير بالبريد وكلمة السر عبر Firebase Authentication فقط.
 * لا يوجد أي مسار يفتح اللوحة بدون كلمة سر صحيحة.
 */
export async function adminSignIn(email: string, password: string): Promise<User> {
  if (!auth) throw new Error('Firebase Authentication غير مهيأ.');
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail || !password) throw new Error('أدخل البريد الإلكتروني وكلمة السر.');

  let user: User;
  try {
    const cred = await withTimeout(signInWithEmailAndPassword(auth, cleanEmail, password), 15000);
    user = cred.user;
  } catch (err) {
    throw new Error(describeFirebaseError(err, 'فشل تسجيل الدخول.'));
  }

  if (!(await verifyAdminRecord(user))) {
    await adminSignOut();
    throw new Error('تم التحقق من كلمة السر، لكن هذا الحساب غير مصرّح له بإدارة الموقع.');
  }
  return user;
}

/** يرسل رابط إعادة تعيين كلمة السر إلى البريد. */
export async function adminResetPassword(email: string): Promise<void> {
  if (!auth) throw new Error('Firebase Authentication غير مهيأ.');
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) throw new Error('اكتب بريدك الإلكتروني أولاً ثم اضغط "نسيت كلمة السر".');
  try {
    await withTimeout(sendPasswordResetEmail(auth, cleanEmail), 15000);
  } catch (err) {
    throw new Error(describeFirebaseError(err, 'تعذر إرسال رابط إعادة التعيين.'));
  }
}

/** يرسل رسالة تأكيد البريد للمستخدم الحالي. */
export async function sendAdminEmailVerification(): Promise<void> {
  if (!auth?.currentUser) throw new Error('سجّل الدخول أولاً.');
  try {
    await withTimeout(sendEmailVerification(auth.currentUser), 15000);
  } catch (err) {
    throw new Error(describeFirebaseError(err, 'تعذر إرسال رسالة التأكيد.'));
  }
}

export async function adminSignOut(): Promise<void> {
  if (auth) {
    try {
      await firebaseSignOut(auth);
    } catch {
      // Ignore signout network error
    }
  }
}

export function subscribeToAdminAuth(callback: (user: User | null) => void): () => void {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/** يحمّل ملف الصورة كعنصر Image لاستخدامه في الضغط. */
function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error('ملف الصورة غير صالح أو غير مدعوم.'));
    };
    img.src = objectUrl;
  });
}

/** يرسم الصورة على canvas بعرض أقصى محدد ويعيد الـ canvas. */
async function drawScaled(file: File, maxWidth: number): Promise<HTMLCanvasElement> {
  const img = await loadImage(file);
  const scale = img.naturalWidth > maxWidth ? maxWidth / img.naturalWidth : 1;
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
  canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('المتصفح لا يدعم معالجة الصور.');
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}

/** يضغط الصورة إلى WebP (أو JPEG إن لم يدعم المتصفح WebP) للرفع إلى Storage. */
async function compressImageToBlob(file: File, maxWidth = 1600, quality = 0.82): Promise<Blob> {
  const canvas = await drawScaled(file, maxWidth);
  const toBlob = (type: string) =>
    new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, type, quality));
  const webp = await toBlob('image/webp');
  if (webp && webp.type === 'image/webp') return webp;
  const jpeg = await toBlob('image/jpeg');
  if (!jpeg) throw new Error('تعذر ضغط الصورة.');
  return jpeg;
}

/**
 * نسخة احتياطية صغيرة جداً (Base64) تُستخدم فقط إذا كان Firebase Storage غير متاح،
 * حتى لا يتوقف تعديل الموقع. حجمها صغير عمداً لأن وثيقة Firestore محدودة بـ 1MB.
 */
async function compressImageToSmallDataUrl(file: File): Promise<string> {
  const canvas = await drawScaled(file, 800);
  return canvas.toDataURL('image/jpeg', 0.7);
}

export interface UploadResult {
  url: string;
  /** true = الصورة مرفوعة على Firebase Storage (الوضع الصحيح). */
  storedInCloud: boolean;
}

/**
 * يرفع صورة إلى Firebase Storage بعد ضغطها، ويعيد رابطها العام.
 * إذا كان Storage غير متاح (مثلاً غير مفعّل في المشروع) يعيد نسخة Base64 صغيرة
 * مع storedInCloud=false حتى تُظهر الواجهة تنبيهاً للمالك.
 */
export async function uploadPublicMedia(category: string, file: File): Promise<UploadResult> {
  if (!file.type.startsWith('image/')) {
    throw new Error('الملف المختار ليس صورة.');
  }
  if (storage && auth?.currentUser) {
    try {
      const blob = await compressImageToBlob(file);
      const ext = blob.type === 'image/webp' ? 'webp' : 'jpg';
      const safeCategory = category.replace(/[^a-zA-Z0-9_-]/g, '') || 'general';
      const baseName =
        file.name.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 60) || 'image';
      const storageRef = ref(storage, `media/public/${safeCategory}/${Date.now()}_${baseName}.${ext}`);
      await withTimeout(
        uploadBytes(storageRef, blob, {
          contentType: blob.type,
          cacheControl: 'public, max-age=31536000, immutable',
        }),
        60000
      );
      const url = await withTimeout(getDownloadURL(storageRef), 15000);
      return { url, storedInCloud: true };
    } catch (err) {
      console.warn('Storage upload failed, using small inline fallback:', err);
    }
  }
  return { url: await compressImageToSmallDataUrl(file), storedInCloud: false };
}
