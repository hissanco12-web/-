import { initializeApp, getApps, FirebaseApp } from 'firebase/app';
import {
  getAuth,
  signInWithEmailAndPassword,
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

const AUTHORIZED_ADMIN_EMAIL = 'smthysan@gmail.com';
const AUTHORIZED_ADMIN_UID = 'nYe0azkrCYMaJ7yOrkEfkYMQ1K62';

const firebaseConfig = {
  apiKey:
    import.meta.env.VITE_FIREBASE_API_KEY &&
    import.meta.env.VITE_FIREBASE_API_KEY !== 'your_firebase_api_key'
      ? import.meta.env.VITE_FIREBASE_API_KEY
      : 'AIzaSyCH-A0nRHUrQpq5iJC04jI9RdXsD3wVr40',
  authDomain:
    import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'kingofline-a2d40.firebaseapp.com',
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL ||
    'https://kingofline-a2d40-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'kingofline-a2d40',
  storageBucket:
    import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'kingofline-a2d40.firebasestorage.app',
  messagingSenderId:
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID &&
    import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID !== 'your_messaging_sender_id'
      ? import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
      : '438047100791',
  appId:
    import.meta.env.VITE_FIREBASE_APP_ID &&
    import.meta.env.VITE_FIREBASE_APP_ID !== 'your_firebase_app_id'
      ? import.meta.env.VITE_FIREBASE_APP_ID
      : '1:438047100791:web:1c04a5096f8fa6fe125b72',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-2X9KTG9DCD',
};

const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID || '(default)';

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.apiKey !== 'your_firebase_api_key' &&
      firebaseConfig.projectId
  );
}

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

export async function fetchPublicSiteContent(): Promise<CMSData | null> {
  if (!db) return null;
  try {
    const snap = await getDoc(doc(db, 'siteContent', 'public'));
    if (snap.exists()) {
      return snap.data() as CMSData;
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch siteContent/public from Firestore:', err);
    return null;
  }
}

export async function savePublicSiteContent(data: CMSData): Promise<void> {
  if (!db) {
    throw new Error('Firebase Firestore is not configured. Check VITE_FIREBASE_* variables.');
  }
  const payload: CMSData = {
    ...data,
    updatedAt: new Date().toISOString(),
  };
  await setDoc(doc(db, 'siteContent', 'public'), payload, { merge: false });
}

export async function verifyAdminRecord(user: User): Promise<boolean> {
  if (
    user.uid === AUTHORIZED_ADMIN_UID ||
    (user.email && user.email.toLowerCase() === AUTHORIZED_ADMIN_EMAIL)
  ) {
    if (db) {
      try {
        await setDoc(
          doc(db, 'admins', user.uid),
          {
            email: user.email || AUTHORIZED_ADMIN_EMAIL,
            active: true,
            updatedAt: new Date().toISOString(),
          },
          { merge: true }
        );
      } catch {
        // Ignore if rules restrict client-side creation of /admins/{uid}
      }
    }
    return true;
  }

  if (!db) return false;
  try {
    const adminRef = doc(db, 'admins', user.uid);
    const snap = await getDoc(adminRef);
    if (!snap.exists()) return false;
    const data = snap.data();
    return Boolean(
      data &&
        data.active === true &&
        typeof data.email === 'string' &&
        user.email &&
        data.email.toLowerCase() === user.email.toLowerCase()
    );
  } catch (err) {
    console.warn('Admin verification failed:', err);
    return false;
  }
}

export async function adminSignIn(
  email: string,
  password: string
): Promise<{ user: User; isVerifiedAdmin: boolean }> {
  if (!auth) {
    throw new Error('Firebase Authentication is not configured.');
  }
  const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
  const isVerifiedAdmin = await verifyAdminRecord(cred.user);
  if (!isVerifiedAdmin) {
    const uid = cred.user.uid;
    await firebaseSignOut(auth);
    throw new Error(
      `الحساب غير مفعل كمدير في Firestore. تأكد من وجود وثيقة في المسار /admins/${uid} تحتوي على email="${email.trim()}" و active=true.`
    );
  }
  return { user: cred.user, isVerifiedAdmin };
}

export async function adminSignOut(): Promise<void> {
  if (auth) {
    await firebaseSignOut(auth);
  }
}

export function subscribeToAdminAuth(callback: (user: User | null) => void): () => void {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}

/**
 * Compresses an image file client-side to a clean WebP/JPEG data URL
 * so image replacement works 100% reliably even if Firebase Storage bucket CORS is not set up.
 */
async function compressImageToDataUrl(file: File, maxWidth = 1200, quality = 0.8): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Invalid image file'));
      img.onload = () => {
        const scale = img.width > maxWidth ? maxWidth / img.width : 1;
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(reader.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export async function uploadPublicMedia(category: string, file: File): Promise<string> {
  if (storage) {
    try {
      const safeCategory = category.replace(/[^a-zA-Z0-9_-]/g, '') || 'general';
      const safeName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const storageRef = ref(storage, `media/public/${safeCategory}/${safeName}`);
      await uploadBytes(storageRef, file, { contentType: file.type });
      return await getDownloadURL(storageRef);
    } catch (err) {
      console.warn('Storage bucket upload failed or blocked by CORS, falling back to compressed image:', err);
    }
  }
  return await compressImageToDataUrl(file);
}
