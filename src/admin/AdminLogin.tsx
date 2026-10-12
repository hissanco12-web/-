/**
 * شاشة تسجيل دخول لوحة التحكم (/admin).
 *
 * - الدخول يتم فقط عبر Firebase Authentication بالبريد وكلمة السر.
 * - كلمة السر يحددها المالك من Firebase Console (Authentication → Users)
 *   أو من زر "نسيت كلمة السر" هنا. لا توجد أي كلمة سر داخل الكود.
 * - رسائل الخطأ تشرح السبب الحقيقي (كلمة سر خاطئة، طريقة دخول غير مفعّلة،
 *   نطاق غير مصرّح...) — انظر describeFirebaseError في integration.ts.
 */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, CheckCircle2, Shield } from 'lucide-react';
import {
  AUTHORIZED_ADMIN_EMAIL,
  adminResetPassword,
  adminSignIn,
} from '../lib/firebase/integration';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState(AUTHORIZED_ADMIN_EMAIL);
  const [password, setPassword] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);
    setIsBusy(true);
    try {
      // عند النجاح يلتقط AdminPortal تغيّر حالة الدخول تلقائياً ويفتح اللوحة.
      await adminSignIn(email, password);
    } catch (err) {
      setStatusMsg({ type: 'error', text: err instanceof Error ? err.message : 'فشل تسجيل الدخول.' });
    } finally {
      setIsBusy(false);
    }
  };

  const handleResetPassword = async () => {
    setStatusMsg(null);
    setIsBusy(true);
    try {
      await adminResetPassword(email);
      setStatusMsg({
        type: 'success',
        text: `تم إرسال رابط تعيين كلمة السر إلى ${email.trim()}. افحص البريد الوارد والرسائل غير المرغوبة (Spam).`,
      });
    } catch (err) {
      setStatusMsg({ type: 'error', text: err instanceof Error ? err.message : 'تعذر الإرسال.' });
    } finally {
      setIsBusy(false);
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#090909] text-[#F7F7F5] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111111] border border-[#C9A24A]/40 p-8 space-y-6">
        <div className="flex items-center gap-3 text-[#C9A24A]">
          <Shield className="w-7 h-7" />
          <div>
            <h1 className="font-editorial text-2xl tracking-wider text-[#F7F7F5]">KINGSMEN LINE</h1>
            <p className="text-xs text-[#C9A24A]">مركز قيادة الأتيليه — بوابة المدير (`/admin`)</p>
          </div>
        </div>

        {statusMsg && (
          <div
            role="alert"
            className={`p-3 text-xs border flex items-start gap-2 leading-relaxed ${
              statusMsg.type === 'success'
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-red-500/40 bg-red-500/10 text-red-300'
            }`}
          >
            {statusMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            )}
            <span>{statusMsg.text}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="admin-email" className="block text-xs text-[#A3A3A3]">
              البريد الإلكتروني للمدير
            </label>
            <input
              id="admin-email"
              type="email"
              required
              dir="ltr"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#090909] border border-white/15 focus:border-[#C9A24A] px-3.5 py-2.5 text-sm outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="admin-password" className="block text-xs text-[#A3A3A3]">
              كلمة السر
            </label>
            <input
              id="admin-password"
              type="password"
              required
              dir="ltr"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#090909] border border-white/15 focus:border-[#C9A24A] px-3.5 py-2.5 text-sm outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isBusy}
            className="w-full py-3.5 bg-[#C9A24A] hover:bg-[#E0C878] disabled:opacity-60 text-[#090909] font-semibold text-xs uppercase tracking-[0.16em] transition-colors"
          >
            {isBusy ? 'جاري التحقق...' : 'دخول لوحة الإدارة'}
          </button>

          <button
            type="button"
            onClick={handleResetPassword}
            disabled={isBusy}
            className="w-full text-xs text-[#C9A24A] hover:underline disabled:opacity-60"
          >
            نسيت كلمة السر؟ أرسل رابط التعيين إلى بريدي
          </button>
        </form>

        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-[#A3A3A3]">
          <Link to="/ar" className="text-[#C9A24A] hover:underline">
            ← العودة للموقع العام
          </Link>
          <span>Project: kingofline-a2d40</span>
        </div>
      </div>
    </div>
  );
};
