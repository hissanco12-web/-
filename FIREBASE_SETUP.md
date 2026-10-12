# KINGSMEN LINE — إعداد Firebase ولوحة التحكم

المشروع: `kingofline-a2d40`

| الخدمة | الاستخدام |
|---|---|
| Firebase Authentication | دخول المدير بالبريد وكلمة السر |
| Firestore `siteContent/public` | كل محتوى الموقع (يقرؤه الزوار، يعدّله المدير فقط) |
| Firestore `admins/{uid}` | مدراء إضافيون (اختياري) |
| Storage `media/public/...` | صور الموقع |

---

## 1) الدخول إلى لوحة التحكم `/admin`

البريد: `smthysan@gmail.com` — كلمة السر: **أنت من يحددها**، ولا توجد في الكود.

خطوات لمرة واحدة في [Firebase Console](https://console.firebase.google.com/project/kingofline-a2d40):

1. **Authentication ← Sign-in method** ← فعّل **Email/Password**.
2. **Authentication ← Users**:
   - إذا لم يوجد مستخدم بالبريد أعلاه: **Add user** وضع البريد وكلمة السر التي تريدها.
   - إذا كان موجوداً ونسيت كلمة السر: من صفحة `/admin` اضغط **"نسيت كلمة السر"**.
3. **Authentication ← Settings ← Authorized domains** ← أضف نطاق موقعك
   (مثل `your-site.netlify.app` أو `your-site.vercel.app` أو نطاقك الخاص).
4. ادخل `/admin` بالبريد وكلمة السر.
   - إذا ظهر تنبيه "بريدك غير مؤكَّد": اضغط **إرسال رسالة تأكيد البريد**، افتح الرابط، ثم سجّل الخروج وادخل مجدداً.
   - أعلى اللوحة يظهر الـ **UID** الخاص بحسابك.

> رسائل الخطأ في صفحة الدخول تذكر السبب الحقيقي (كلمة سر خاطئة، طريقة دخول غير مفعّلة، نطاق غير مصرّح...).

## 2) نشر قواعد الحماية (مهم جداً)

تعديل الملفات في GitHub **لا يكفي**؛ يجب نشرها على Firebase بإحدى الطريقتين:

**أ) يدوياً من المتصفح**
- Firestore Database ← Rules ← الصق محتوى `firestore.rules` ← **Publish**.
- Storage ← Rules ← الصق محتوى `storage.rules` ← **Publish**.

**ب) من الطرفية**
```bash
npm install -g firebase-tools
firebase login
firebase deploy --only firestore:rules,storage
```

ما تفعله القواعد:
- الزوار: قراءة محتوى الموقع والصور فقط.
- الكتابة: للمالك فقط (بالـ UID، أو بالبريد بشرط أن يكون مؤكَّداً) أو للمدراء في `admins/{uid}`.

## 3) الصور (Firebase Storage)

- الصور تُضغط تلقائياً (WebP، عرض أقصى 1600px) ثم تُرفع إلى Storage.
- فعّل Storage من **Storage ← Get started**. (المشاريع الجديدة قد تتطلب خطة Blaze؛ الاستخدام البسيط غالباً مجاني ضمن الحصة.)
- إذا كان Storage غير متاح، تُحفظ نسخة مصغّرة داخل بيانات الموقع مؤقتاً مع تنبيه، لكن حجم البيانات محدود بـ 1MB،
  لذا يُنصح بتفعيل Storage.

## 4) مدير إضافي (اختياري)

أنشئ له مستخدماً في Authentication، ثم في Firestore أنشئ الوثيقة `admins/{UID}`:
```json
{ "email": "his-email@example.com", "active": true }
```
