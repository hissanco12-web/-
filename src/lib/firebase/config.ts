/**
 * إعدادات Firebase العامة (ليست سرية).
 * ملف صغير منفصل حتى يستطيع الموقع العام معرفة الإعدادات دون تحميل مكتبات Firebase
 * الثقيلة؛ هذه تُحمَّل لاحقاً عند الحاجة فقط (انظر CMSContext و integration.ts).
 */
export const firebaseConfig = {
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

export const databaseId = import.meta.env.VITE_FIREBASE_DATABASE_ID || '(default)';

export function isFirebaseConfigured(): boolean {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.apiKey !== 'your_firebase_api_key' &&
      firebaseConfig.projectId
  );
}

