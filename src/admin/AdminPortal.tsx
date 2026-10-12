import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  LogOut,
  Save,
  RotateCcw,
  Plus,
  Trash2,
  Upload,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Sparkles,
  Settings,
  ShoppingBag,
  Layers,
  Scissors,
  Image as ImageIcon,
  FileText,
  Tag,
  Palette,
  LayoutTemplate,
  Globe,
  Share2,
  Download,
} from 'lucide-react';
import { useCMS } from '../context/CMSContext';
import { initialCMSData } from '../data/initialData';
import type { User } from 'firebase/auth';
import {
  adminSignOut,
  ownerNeedsEmailVerification,
  isOwnerUser,
  sendAdminEmailVerification,
  subscribeToAdminAuth,
  uploadPublicMedia,
  verifyAdminRecord,
} from '../lib/firebase/integration';
import { AdminLogin } from './AdminLogin';
import {
  ArticleItem,
  CMSData,
  Collection,
  GalleryItem,
  LocalizedText,
  OfferItem,
  Product,
  ServiceItem,
} from '../types/cms';

// Self-contained types so updating ONLY src/admin/AdminPortal.tsx works seamlessly
interface AdminThemeColors {
  primaryBg: string;
  surfaceBg: string;
  accentGold: string;
  accentLightGold: string;
  textPrimary: string;
  textMuted: string;
}

interface AdminSEOSettings {
  metaTitle: LocalizedText;
  metaDescription: LocalizedText;
  keywords: LocalizedText;
  ogImage: string;
}

interface AdminSocialLinks {
  instagram: string;
  snapchat: string;
  tiktok: string;
  twitter: string;
  facebook: string;
  youtube: string;
  googleMaps: string;
}

interface AdminHomeSections {
  showPillars: boolean;
  showCollections: boolean;
  showFeaturedProducts: boolean;
  showCraftsmanshipBanner: boolean;
  collectionsEyebrow: LocalizedText;
  collectionsTitle: LocalizedText;
  productsEyebrow: LocalizedText;
  productsTitle: LocalizedText;
}

type AdminTab =
  | 'settings'
  | 'seoSocial'
  | 'homeSections'
  | 'theme'
  | 'products'
  | 'collections'
  | 'services'
  | 'offers'
  | 'gallery'
  | 'articles'
  | 'pages';

const DEFAULT_THEME: AdminThemeColors = {
  primaryBg: '#090909',
  surfaceBg: '#111111',
  accentGold: '#C9A24A',
  accentLightGold: '#E0C878',
  textPrimary: '#F7F7F5',
  textMuted: '#A3A3A3',
};

const DEFAULT_SEO: AdminSEOSettings = {
  metaTitle: {
    ar: 'KINGSMEN LINE — الخياطة الملكية الراقية والأزياء الرجالية الفاخرة',
    en: 'KINGSMEN LINE — Luxury Tailoring & Modern Royal Menswear',
  },
  metaDescription: {
    ar: 'اكتشف دار KINGSMEN LINE: تفصيل البدلات الملكية، البشوت الحساوية بالزري الحر، وأزياء السهرة الفاخرة بدقة سافيل رو.',
    en: 'Discover KINGSMEN LINE: bespoke tailoring, ceremonial royal bishts, and luxury eveningwear crafted with Savile Row precision and Arabian heritage.',
  },
  keywords: {
    ar: 'كينغزمان لاين, تفصيل بدلات رجالية, بشت ملكي, توكسيدو فاخر, خياطة ملكية',
    en: 'KINGSMEN LINE, bespoke tailoring, royal bisht, luxury tuxedo, Savile Row menswear',
  },
  ogImage:
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=85',
};

const DEFAULT_SOCIALS: AdminSocialLinks = {
  instagram: 'https://instagram.com',
  snapchat: '',
  tiktok: '',
  twitter: '',
  facebook: '',
  youtube: '',
  googleMaps: '',
};

const DEFAULT_HOME_SECTIONS: AdminHomeSections = {
  showPillars: true,
  showCollections: true,
  showFeaturedProducts: true,
  showCraftsmanshipBanner: true,
  collectionsEyebrow: { ar: 'مجموعات الدار', en: 'THE COLLECTIONS' },
  collectionsTitle: { ar: 'إصدارات الفخامة الملكية', en: 'Sovereign Sartorial Divisions' },
  productsEyebrow: { ar: 'الأتيليه الملكي', en: 'BESPOKE ARCHIVE' },
  productsTitle: { ar: 'قطع مختارة من الأتيليه', en: 'Curated Atelier Pieces' },
};

const COLOR_PRESETS: { name: string; theme: AdminThemeColors }[] = [
  {
    name: 'الذهبي الملكي الكلاسيكي (الافتراضي)',
    theme: DEFAULT_THEME,
  },
  {
    name: 'البلاتينيوم الفضي (Savile Silver)',
    theme: {
      primaryBg: '#0B0C10',
      surfaceBg: '#14161D',
      accentGold: '#C0C5CE',
      accentLightGold: '#E2E8F0',
      textPrimary: '#F8FAFC',
      textMuted: '#94A3B8',
    },
  },
  {
    name: 'الأخضر الزمردي الملكي (Royal Emerald)',
    theme: {
      primaryBg: '#060D0A',
      surfaceBg: '#0D1914',
      accentGold: '#D4AF37',
      accentLightGold: '#F3E5AB',
      textPrimary: '#F5F7F6',
      textMuted: '#9CAEA6',
    },
  },
  {
    name: 'الكحلي الدبلوماسي والذهبي (Midnight Sovereign)',
    theme: {
      primaryBg: '#070A12',
      surfaceBg: '#0F1523',
      accentGold: '#CDA434',
      accentLightGold: '#E6C762',
      textPrimary: '#F7F8FA',
      textMuted: '#9AA3B2',
    },
  },
];

interface ImageReplacerProps {
  label: string;
  imageUrl: string;
  category: string;
  onChange: (newUrl: string) => void;
  onUploadFile: (category: string, file: File, cb: (url: string) => void) => void;
}

const ImageReplacer: React.FC<ImageReplacerProps> = ({
  label,
  imageUrl,
  category,
  onChange,
  onUploadFile,
}) => {
  return (
    <div className="bg-[#090909] border border-white/15 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#C9A24A]">{label}</span>
        {imageUrl && <span className="text-[11px] text-emerald-400">الصورة مفعّلة</span>}
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {imageUrl ? (
          <div className="w-28 h-28 shrink-0 border border-[#C9A24A]/40 overflow-hidden bg-[#111111]">
            <img src={imageUrl} alt={label} className="w-full h-full object-cover" />
          </div>
        ) : (
          <div className="w-28 h-28 shrink-0 border border-dashed border-white/20 flex items-center justify-center text-[11px] text-[#A3A3A3]">
            لا توجد صورة
          </div>
        )}

        <div className="flex-1 w-full space-y-2.5">
          <div className="flex flex-wrap gap-2">
            <label className="px-4 py-2.5 bg-[#C9A24A] hover:bg-[#E0C878] text-[#090909] font-semibold text-xs cursor-pointer inline-flex items-center gap-1.5 transition-colors">
              <Upload className="w-4 h-4" />
              <span>استبدال الصورة من الجوال / الجهاز</span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onUploadFile(category, file, onChange);
                  }
                }}
              />
            </label>
          </div>

          <div>
            <label className="block text-[11px] text-[#A3A3A3] mb-1">
              أو ضع رابط صورة مباشر (URL):
            </label>
            <input
              type="text"
              dir="ltr"
              value={imageUrl}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#111111] border border-white/15 focus:border-[#C9A24A] px-3 py-2 text-xs text-[#F7F7F5] outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminPortal() {
  const { data, updateCMSData, resetToDefaults, isLiveFirebase } = useCMS();
  const [draft, setDraft] = useState<CMSData>(data);
  const [activeTab, setActiveTab] = useState<AdminTab>('settings');
  const [activePageKey, setActivePageKey] = useState<'about' | 'privacy' | 'terms'>('about');
  // المستخدم المسجَّل والمتحقق من صلاحيته (null = غير مسجّل).
  // Firebase يحفظ الجلسة تلقائياً، فلا حاجة لإعادة الدخول عند تحديث الصفحة.
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [authChecking, setAuthChecking] = useState(true);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setDraft(data);
  }, [data]);

  useEffect(() => {
    const unsub = subscribeToAdminAuth(async (user) => {
      // الصلاحية تُحدَّد فقط من Firebase Authentication + verifyAdminRecord.
      const ok = user ? await verifyAdminRecord(user) : false;
      setAdminUser(ok ? user : null);
      setAuthChecking(false);
    });
    return () => unsub();
  }, []);

  const rawSettings = draft.settings as unknown as Record<string, unknown>;
  const currentTheme: AdminThemeColors =
    (rawSettings.theme as AdminThemeColors) ||
    (initialCMSData.settings as unknown as { theme?: AdminThemeColors }).theme ||
    DEFAULT_THEME;
  const currentHomeSections: AdminHomeSections =
    (rawSettings.homeSections as AdminHomeSections) || DEFAULT_HOME_SECTIONS;
  const currentSeo: AdminSEOSettings =
    (rawSettings.seo as AdminSEOSettings) || DEFAULT_SEO;
  const currentSocials: AdminSocialLinks =
    (rawSettings.socials as AdminSocialLinks) || DEFAULT_SOCIALS;

  const updateSettingsExtra = (patch: Record<string, unknown>) => {
    setDraft({
      ...draft,
      settings: {
        ...draft.settings,
        ...patch,
      } as CMSData['settings'],
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setStatusMsg(null);
    try {
      await updateCMSData(draft);
      setStatusMsg({
        type: 'success',
        text: isLiveFirebase
          ? 'تم حفظ كافة التعديلات والصور في Firestore (siteContent/public) بنجاح!'
          : 'تم حفظ التعديلات وتطبيقها على الموقع العام فوراً!',
      });
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: err instanceof Error ? err.message : 'حدث خطأ أثناء الحفظ.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (category: string, file: File, onUrl: (url: string) => void) => {
    setStatusMsg({ type: 'success', text: 'جاري معالجة واستبدال الصورة...' });
    try {
      const { url, storedInCloud } = await uploadPublicMedia(category, file);
      onUrl(url);
      setStatusMsg(
        storedInCloud
          ? {
              type: 'success',
              text: 'تم رفع الصورة إلى Firebase Storage بنجاح! اضغط على زر "حفظ جميع التغييرات" في الأعلى لاعتمادها.',
            }
          : {
              type: 'error',
              text:
                'تنبيه: Firebase Storage غير متاح، فحُفظت نسخة مصغّرة من الصورة داخل بيانات الموقع مؤقتاً. ' +
                'كثرة هذه الصور قد تمنع الحفظ (حد 1MB). فعّل Storage من Firebase Console (راجع FIREBASE_SETUP.md).',
            }
      );
    } catch (err) {
      setStatusMsg({
        type: 'error',
        text: err instanceof Error ? err.message : 'تعذر رفع الصورة',
      });
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(draft, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'kingsmen-line-content.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as CMSData;
        if (parsed && parsed.settings && Array.isArray(parsed.products)) {
          setDraft(parsed);
          setStatusMsg({
            type: 'success',
            text: 'تم استبدال ملف بيانات الموقع بنجاح! اضغط "حفظ جميع التغييرات" لاعتماده.',
          });
        } else {
          setStatusMsg({ type: 'error', text: 'ملف JSON غير صالح.' });
        }
      } catch {
        setStatusMsg({ type: 'error', text: 'تعذر قراءة ملف JSON.' });
      }
    };
    reader.readAsText(file);
  };

  const addNewProduct = () => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      slug: `royal-piece-${Date.now()}`,
      name: { ar: 'قطعة ملكية جديدة', en: 'New Royal Bespoke Piece' },
      subtitle: { ar: 'تفصيل يدوي فاخر', en: 'Handcrafted Bespoke Tailoring' },
      description: { ar: 'وصف تفصيلي للقطعة الملكية ونوع الحياكة...', en: 'Detailed bespoke description...' },
      price: { ar: '12,500 ر.س (تفصيل خاص)', en: '$3,300 USD (Bespoke Commission)' },
      category: 'Eveningwear',
      collectionSlug: draft.collections[0]?.slug || 'sovereign-eveningwear',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      gallery: [],
      fabric: { ar: 'صوف إنجليزي وحرير طبيعي', en: 'English Wool & Pure Silk' },
      origin: { ar: 'سافيل رو — لندن / الرياض', en: 'Savile Row / Riyadh' },
      leadTime: { ar: '4 إلى 5 أسابيع', en: '4 to 5 Weeks' },
      features: [{ ar: 'تفصيل يدوي كامل حسب القياس الشخصي', en: 'Full hand-cut bespoke construction' }],
      featured: true,
      available: true,
      badge: { ar: 'إصدار جديد', en: 'New Arrival' },
    };
    setDraft({ ...draft, products: [newProd, ...draft.products] });
  };

  const addNewCollection = () => {
    const newCol: Collection = {
      id: `col-${Date.now()}`,
      slug: `collection-${Date.now()}`,
      title: { ar: 'مجموعة ملكية جديدة', en: 'New Royal Collection' },
      subtitle: { ar: 'عنوان فرعي للمجموعة', en: 'Collection Subtitle' },
      description: { ar: 'وصف المجموعة...', en: 'Collection description...' },
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=85',
      season: { ar: 'إصدار خاص', en: 'Private Edition' },
      featured: true,
    };
    setDraft({ ...draft, collections: [newCol, ...draft.collections] });
  };

  const addNewService = () => {
    const newSrv: ServiceItem = {
      id: `srv-${Date.now()}`,
      slug: `service-${Date.now()}`,
      title: { ar: 'خدمة تفصيل ملكية جديدة', en: 'New Bespoke Service' },
      subtitle: { ar: 'تجربة خاصة', en: 'Private Experience' },
      description: { ar: 'تفاصيل الخدمة...', en: 'Service details...' },
      duration: { ar: '60 دقيقة', en: '60 Minutes' },
      priceNote: { ar: 'بموعد مسبق', en: 'By Appointment' },
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
      highlights: [{ ar: 'إشراف كبير الخياطين', en: 'Master Cutter supervision' }],
    };
    setDraft({ ...draft, services: [newSrv, ...draft.services] });
  };

  const addNewGalleryItem = () => {
    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: { ar: 'إطلالة ملكية جديدة', en: 'New Atelier Look' },
      caption: { ar: 'وصف الصورة...', en: 'Image caption...' },
      category: { ar: 'الأتيليه', en: 'Atelier' },
      image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85',
    };
    setDraft({ ...draft, gallery: [newItem, ...draft.gallery] });
  };

  const addNewOffer = () => {
    const newOffer: OfferItem = {
      id: `off-${Date.now()}`,
      title: { ar: 'عرض ملكي خاص', en: 'Exclusive Royal Offer' },
      subtitle: { ar: 'تفاصيل الباقة', en: 'Package Subtitle' },
      description: { ar: 'وصف العرض...', en: 'Offer description...' },
      priceText: { ar: '19,500 ر.س', en: '$5,200 USD' },
      validUntil: { ar: 'لفترة محدودة', en: 'Limited Time' },
      badge: { ar: 'عرض خاص', en: 'Special Privilege' },
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=85',
      active: true,
    };
    setDraft({ ...draft, offers: [newOffer, ...draft.offers] });
  };

  const addNewArticle = () => {
    const newArt: ArticleItem = {
      id: `art-${Date.now()}`,
      slug: `article-${Date.now()}`,
      title: { ar: 'مقال جديد عن الأناقة الملكية', en: 'New Sartorial Journal Entry' },
      excerpt: { ar: 'ملخص المقال...', en: 'Article excerpt...' },
      content: { ar: 'محتوى المقال الكامل...', en: 'Full article content...' },
      category: { ar: 'المجلة الملكية', en: 'Royal Journal' },
      readTime: { ar: '4 دقائق', en: '4 Min Read' },
      publishedAt: new Date().toISOString().slice(0, 10),
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
    };
    setDraft({ ...draft, articles: [newArt, ...draft.articles] });
  };

  if (authChecking) {
    return (
      <div className="min-h-screen bg-[#090909] text-[#C9A24A] flex items-center justify-center text-xs uppercase tracking-[0.2em]">
        جاري التحقق من جلسة الدخول...
      </div>
    );
  }

  if (!adminUser) {
    return <AdminLogin />;
  }

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'settings', label: 'الهوية والتواصل', icon: <Settings className="w-3.5 h-3.5" /> },
    { id: 'seoSocial', label: 'السيو وروابط التواصل', icon: <Globe className="w-3.5 h-3.5" /> },
    { id: 'homeSections', label: 'الصور الرئيسية والأقسام', icon: <LayoutTemplate className="w-3.5 h-3.5" /> },
    { id: 'theme', label: 'الألوان والمظهر', icon: <Palette className="w-3.5 h-3.5" /> },
    { id: 'products', label: `الأزياء (${draft.products.length})`, icon: <ShoppingBag className="w-3.5 h-3.5" /> },
    { id: 'collections', label: `المجموعات (${draft.collections.length})`, icon: <Layers className="w-3.5 h-3.5" /> },
    { id: 'services', label: `الخدمات (${draft.services.length})`, icon: <Scissors className="w-3.5 h-3.5" /> },
    { id: 'offers', label: `العروض (${draft.offers.length})`, icon: <Tag className="w-3.5 h-3.5" /> },
    { id: 'gallery', label: `المعرض (${draft.gallery.length})`, icon: <ImageIcon className="w-3.5 h-3.5" /> },
    { id: 'articles', label: `المجلة (${draft.articles.length})`, icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'pages', label: 'الصفحات الثابتة', icon: <Sparkles className="w-3.5 h-3.5" /> },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-[#090909] text-[#F7F7F5] pb-20">
      <header className="border-b border-[#C9A24A]/30 bg-[#111111] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#C9A24A]" />
            <div>
              <span className="font-editorial text-lg tracking-wider block leading-none">
                KINGSMEN LINE — التحكم الكامل بالموقع
              </span>
              <span className="text-[11px] text-[#A3A3A3]">
                {isLiveFirebase ? 'متصل بـ Firebase Firestore (siteContent/public)' : 'وضع المعاينة والحفظ الفوري'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/ar"
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/15 text-xs hover:border-[#C9A24A]"
            >
              <span>معاينة الموقع</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A24A] hover:bg-[#E0C878] text-[#090909] font-semibold text-xs"
            >
              <Save className="w-3.5 h-3.5" />
              <span>{isSaving ? 'جاري الحفظ...' : 'حفظ جميع التغييرات'}</span>
            </button>

            <button
              type="button"
              onClick={async () => {
                await adminSignOut();
                setAdminUser(null);
              }}
              className="p-2 text-[#A3A3A3] hover:text-red-400 border border-white/10"
              title="تسجيل الخروج"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* حساب الدخول الحالي — مفيد للتأكد من المعرّف UID عند ضبط قواعد Firebase */}
        <div className="text-[11px] text-[#A3A3A3] flex flex-wrap gap-x-4 gap-y-1" dir="ltr">
          <span>{adminUser.email}</span>
          <span>UID: {adminUser.uid}</span>
        </div>

        {/* قواعد Firestore تقبل بريد المالك فقط إذا كان مؤكَّداً، لذا ننبّه قبل أن يفشل الحفظ */}
        {isOwnerUser(adminUser) && ownerNeedsEmailVerification(adminUser) && (
          <div className="p-4 border border-amber-500/40 bg-amber-500/10 text-amber-200 text-xs space-y-2 leading-relaxed">
            <p>
              بريدك الإلكتروني غير مؤكَّد بعد، وقواعد الحماية تتطلب تأكيده قبل حفظ التعديلات.
              اضغط الزر لإرسال رسالة التأكيد، افتح الرابط في بريدك، ثم سجّل الخروج وادخل مرة أخرى.
            </p>
            <button
              type="button"
              onClick={async () => {
                try {
                  await sendAdminEmailVerification();
                  setStatusMsg({ type: 'success', text: `تم إرسال رسالة التأكيد إلى ${adminUser.email}.` });
                } catch (err) {
                  setStatusMsg({
                    type: 'error',
                    text: err instanceof Error ? err.message : 'تعذر إرسال رسالة التأكيد.',
                  });
                }
              }}
              className="px-3 py-1.5 border border-amber-400/60 hover:bg-amber-400/10"
            >
              إرسال رسالة تأكيد البريد
            </button>
          </div>
        )}

        {statusMsg && (
          <div
            className={`p-4 border text-xs flex items-center gap-2 ${
              statusMsg.type === 'success'
                ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
                : 'border-red-500/40 bg-red-500/10 text-red-300'
            }`}
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMsg.text}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs border transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#C9A24A] text-[#090909] border-[#C9A24A] font-semibold'
                    : 'bg-[#111111] border-white/15 text-[#A3A3A3] hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleExportJson}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/15 text-xs text-[#C9A24A] hover:bg-white/5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>تحميل ملف البيانات</span>
            </button>

            <label className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/15 text-xs text-[#E0C878] hover:bg-white/5 cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>استبدال ملف البيانات</span>
              <input
                type="file"
                accept=".json,application/json"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleImportJson(f);
                }}
              />
            </label>

            <button
              type="button"
              onClick={async () => {
                await resetToDefaults();
                setStatusMsg({ type: 'success', text: 'تمت استعادة الإعدادات الافتراضية للموقع.' });
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 border border-white/15 text-xs text-[#A3A3A3] hover:text-white"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>استعادة الافتراضي</span>
            </button>
          </div>
        </div>

        {/* 1. Settings & Brand Identity Tab */}
        {activeTab === 'settings' && (
          <div className="bg-[#111111] border border-white/10 p-6 space-y-5">
            <h2 className="text-sm font-semibold text-[#C9A24A]">بيانات الهوية والتواصل المباشر (واتساب)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">اسم العلامة التجارية</label>
                <input
                  type="text"
                  dir="ltr"
                  value={draft.settings.brandName}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      settings: { ...draft.settings, brandName: e.target.value },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">رقم واتساب لاستقبال الطلبات</label>
                <input
                  type="text"
                  dir="ltr"
                  value={draft.settings.whatsappNumber}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      settings: { ...draft.settings, whatsappNumber: e.target.value },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">الوصف المختصر للدار (عربي)</label>
                <input
                  type="text"
                  value={draft.settings.tagline.ar}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      settings: {
                        ...draft.settings,
                        tagline: { ...draft.settings.tagline, ar: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">Brand Tagline (English)</label>
                <input
                  type="text"
                  dir="ltr"
                  value={draft.settings.tagline.en}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      settings: {
                        ...draft.settings,
                        tagline: { ...draft.settings.tagline, en: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">رقم الهاتف المعروض</label>
                <input
                  type="text"
                  dir="ltr"
                  value={draft.settings.phoneDisplay}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      settings: { ...draft.settings, phoneDisplay: e.target.value },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">البريد الإلكتروني</label>
                <input
                  type="text"
                  dir="ltr"
                  value={draft.settings.contactEmail}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      settings: { ...draft.settings, contactEmail: e.target.value },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">العنوان (عربي)</label>
                <input
                  type="text"
                  value={draft.settings.address.ar}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      settings: {
                        ...draft.settings,
                        address: { ...draft.settings.address, ar: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">Address (English)</label>
                <input
                  type="text"
                  dir="ltr"
                  value={draft.settings.address.en}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      settings: {
                        ...draft.settings,
                        address: { ...draft.settings.address, en: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">ساعات العمل (عربي)</label>
                <input
                  type="text"
                  value={draft.settings.workingHours.ar}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      settings: {
                        ...draft.settings,
                        workingHours: { ...draft.settings.workingHours, ar: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">Working Hours (English)</label>
                <input
                  type="text"
                  dir="ltr"
                  value={draft.settings.workingHours.en}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      settings: {
                        ...draft.settings,
                        workingHours: { ...draft.settings.workingHours, en: e.target.value },
                      },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        )}

        {/* 2. SEO & Social Media Links Tab */}
        {activeTab === 'seoSocial' && (
          <div className="space-y-6">
            <div className="bg-[#111111] border border-white/10 p-6 space-y-5">
              <div className="flex items-center gap-2 text-[#C9A24A]">
                <Globe className="w-4 h-4" />
                <h2 className="text-sm font-semibold">إعدادات محركات البحث والسيو (SEO & Meta Tags)</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">عنوان الموقع في جوجل (Meta Title - عربي)</label>
                  <input
                    type="text"
                    value={currentSeo.metaTitle.ar}
                    onChange={(e) =>
                      updateSettingsExtra({
                        seo: {
                          ...currentSeo,
                          metaTitle: { ...currentSeo.metaTitle, ar: e.target.value },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">Google Meta Title (English)</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={currentSeo.metaTitle.en}
                    onChange={(e) =>
                      updateSettingsExtra({
                        seo: {
                          ...currentSeo,
                          metaTitle: { ...currentSeo.metaTitle, en: e.target.value },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">وصف الموقع في جوجل (Meta Description - عربي)</label>
                  <textarea
                    rows={3}
                    value={currentSeo.metaDescription.ar}
                    onChange={(e) =>
                      updateSettingsExtra({
                        seo: {
                          ...currentSeo,
                          metaDescription: { ...currentSeo.metaDescription, ar: e.target.value },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">Meta Description (English)</label>
                  <textarea
                    rows={3}
                    dir="ltr"
                    value={currentSeo.metaDescription.en}
                    onChange={(e) =>
                      updateSettingsExtra({
                        seo: {
                          ...currentSeo,
                          metaDescription: { ...currentSeo.metaDescription, en: e.target.value },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">الكلمات المفتاحية (Keywords - عربي)</label>
                  <input
                    type="text"
                    value={currentSeo.keywords.ar}
                    onChange={(e) =>
                      updateSettingsExtra({
                        seo: {
                          ...currentSeo,
                          keywords: { ...currentSeo.keywords, ar: e.target.value },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">SEO Keywords (English)</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={currentSeo.keywords.en}
                    onChange={(e) =>
                      updateSettingsExtra({
                        seo: {
                          ...currentSeo,
                          keywords: { ...currentSeo.keywords, en: e.target.value },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <ImageReplacer
                    label="صورة معاينة الرابط عند مشاركته في واتساب وتويتر (OpenGraph Image)"
                    imageUrl={currentSeo.ogImage}
                    category="seo"
                    onUploadFile={handleImageUpload}
                    onChange={(newUrl) =>
                      updateSettingsExtra({
                        seo: { ...currentSeo, ogImage: newUrl },
                      })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-white/10 p-6 space-y-5">
              <div className="flex items-center gap-2 text-[#C9A24A]">
                <Share2 className="w-4 h-4" />
                <h2 className="text-sm font-semibold">روابط حسابات التواصل الاجتماعي والخرائط</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">رابط إنستغرام (Instagram URL)</label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="https://instagram.com/..."
                    value={currentSocials.instagram}
                    onChange={(e) =>
                      updateSettingsExtra({
                        instagramUrl: e.target.value,
                        socials: { ...currentSocials, instagram: e.target.value },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">رابط سناب شات (Snapchat URL)</label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="https://snapchat.com/add/..."
                    value={currentSocials.snapchat}
                    onChange={(e) =>
                      updateSettingsExtra({
                        socials: { ...currentSocials, snapchat: e.target.value },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">رابط تيك توك (TikTok URL)</label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="https://tiktok.com/@..."
                    value={currentSocials.tiktok}
                    onChange={(e) =>
                      updateSettingsExtra({
                        socials: { ...currentSocials, tiktok: e.target.value },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">رابط منصة إكس / تويتر (X URL)</label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="https://x.com/..."
                    value={currentSocials.twitter}
                    onChange={(e) =>
                      updateSettingsExtra({
                        socials: { ...currentSocials, twitter: e.target.value },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">رابط فيسبوك (Facebook URL)</label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="https://facebook.com/..."
                    value={currentSocials.facebook}
                    onChange={(e) =>
                      updateSettingsExtra({
                        socials: { ...currentSocials, facebook: e.target.value },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">رابط يوتيوب (YouTube URL)</label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="https://youtube.com/..."
                    value={currentSocials.youtube}
                    onChange={(e) =>
                      updateSettingsExtra({
                        socials: { ...currentSocials, youtube: e.target.value },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-[#A3A3A3] mb-1">رابط الموقع على خرائط جوجل (Google Maps Link)</label>
                  <input
                    type="text"
                    dir="ltr"
                    placeholder="https://maps.google.com/..."
                    value={currentSocials.googleMaps}
                    onChange={(e) =>
                      updateSettingsExtra({
                        socials: { ...currentSocials, googleMaps: e.target.value },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Theme & Colors Tab */}
        {activeTab === 'theme' && (
          <div className="bg-[#111111] border border-white/10 p-6 space-y-6">
            <div>
              <h2 className="text-sm font-semibold text-[#C9A24A]">التحكم الكامل في ألوان الموقع والمظهر الملكي</h2>
              <p className="text-xs text-[#A3A3A3] mt-1">
                اختر أحد القوالب اللونية الملكية الجاهزة أو خصص كل لون يدوياً، ثم اضغط "حفظ جميع التغييرات".
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => updateSettingsExtra({ theme: preset.theme })}
                  className="p-4 border border-white/15 hover:border-[#C9A24A] text-right space-y-3 bg-[#090909]"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-full border border-white/20"
                      style={{ backgroundColor: preset.theme.primaryBg }}
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-white/20"
                      style={{ backgroundColor: preset.theme.accentGold }}
                    />
                    <span
                      className="w-5 h-5 rounded-full border border-white/20"
                      style={{ backgroundColor: preset.theme.accentLightGold }}
                    />
                  </div>
                  <div className="text-xs font-medium text-[#F7F7F5]">{preset.name}</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4 border-t border-white/10">
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1.5">لون الخلفية الأساسي</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTheme.primaryBg}
                    onChange={(e) =>
                      updateSettingsExtra({
                        theme: { ...currentTheme, primaryBg: e.target.value },
                      })
                    }
                    className="w-10 h-10 bg-transparent border border-white/20 cursor-pointer"
                  />
                  <input
                    type="text"
                    dir="ltr"
                    value={currentTheme.primaryBg}
                    onChange={(e) =>
                      updateSettingsExtra({
                        theme: { ...currentTheme, primaryBg: e.target.value },
                      })
                    }
                    className="flex-1 bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1.5">لون البطاقات والأسطح</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTheme.surfaceBg}
                    onChange={(e) =>
                      updateSettingsExtra({
                        theme: { ...currentTheme, surfaceBg: e.target.value },
                      })
                    }
                    className="w-10 h-10 bg-transparent border border-white/20 cursor-pointer"
                  />
                  <input
                    type="text"
                    dir="ltr"
                    value={currentTheme.surfaceBg}
                    onChange={(e) =>
                      updateSettingsExtra({
                        theme: { ...currentTheme, surfaceBg: e.target.value },
                      })
                    }
                    className="flex-1 bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1.5">اللون الذهبي / المميز</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={currentTheme.accentGold}
                    onChange={(e) =>
                      updateSettingsExtra({
                        theme: { ...currentTheme, accentGold: e.target.value },
                      })
                    }
                    className="w-10 h-10 bg-transparent border border-white/20 cursor-pointer"
                  />
                  <input
                    type="text"
                    dir="ltr"
                    value={currentTheme.accentGold}
                    onChange={(e) =>
                      updateSettingsExtra({
                        theme: { ...currentTheme, accentGold: e.target.value },
                      })
                    }
                    className="flex-1 bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Home Images, Sections & Main Headings Tab */}
        {activeTab === 'homeSections' && (
          <div className="space-y-6">
            <div className="bg-[#111111] border border-white/10 p-6 space-y-5">
              <h2 className="text-sm font-semibold text-[#C9A24A]">
                1. الواجهة الرئيسية والصورة الكبرى (Hero Banner)
              </h2>

              <ImageReplacer
                label="الصورة الرئيسية لأعلى الموقع (Hero Background Image)"
                imageUrl={draft.settings.hero.image}
                category="hero"
                onUploadFile={handleImageUpload}
                onChange={(newUrl) =>
                  setDraft({
                    ...draft,
                    settings: {
                      ...draft.settings,
                      hero: { ...draft.settings.hero, image: newUrl },
                    },
                  })
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">الشارة العلوية (عربي)</label>
                  <input
                    type="text"
                    value={draft.settings.hero.eyebrow.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        settings: {
                          ...draft.settings,
                          hero: {
                            ...draft.settings.hero,
                            eyebrow: { ...draft.settings.hero.eyebrow, ar: e.target.value },
                          },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">Hero Eyebrow (English)</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={draft.settings.hero.eyebrow.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        settings: {
                          ...draft.settings,
                          hero: {
                            ...draft.settings.hero,
                            eyebrow: { ...draft.settings.hero.eyebrow, en: e.target.value },
                          },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">العنوان الرئيسي الكبير (عربي)</label>
                  <input
                    type="text"
                    value={draft.settings.hero.title.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        settings: {
                          ...draft.settings,
                          hero: {
                            ...draft.settings.hero,
                            title: { ...draft.settings.hero.title, ar: e.target.value },
                          },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">Hero Main Headline (English)</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={draft.settings.hero.title.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        settings: {
                          ...draft.settings,
                          hero: {
                            ...draft.settings.hero,
                            title: { ...draft.settings.hero.title, en: e.target.value },
                          },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">الوصف الرئيسي (عربي)</label>
                  <textarea
                    rows={2}
                    value={draft.settings.hero.subtitle.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        settings: {
                          ...draft.settings,
                          hero: {
                            ...draft.settings.hero,
                            subtitle: { ...draft.settings.hero.subtitle, ar: e.target.value },
                          },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">Hero Subtitle (English)</label>
                  <textarea
                    rows={2}
                    dir="ltr"
                    value={draft.settings.hero.subtitle.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        settings: {
                          ...draft.settings,
                          hero: {
                            ...draft.settings.hero,
                            subtitle: { ...draft.settings.hero.subtitle, en: e.target.value },
                          },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-[#111111] border border-white/10 p-6 space-y-5">
              <h2 className="text-sm font-semibold text-[#C9A24A]">
                2. بانر وصورة الحرفية اليدوية (Craftsmanship Section)
              </h2>

              <ImageReplacer
                label="صورة بانر الحرفية اليدوية"
                imageUrl={draft.settings.craftsmanshipBanner.image}
                category="craftsmanship"
                onUploadFile={handleImageUpload}
                onChange={(newUrl) =>
                  setDraft({
                    ...draft,
                    settings: {
                      ...draft.settings,
                      craftsmanshipBanner: {
                        ...draft.settings.craftsmanshipBanner,
                        image: newUrl,
                      },
                    },
                  })
                }
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">العنوان (عربي)</label>
                  <input
                    type="text"
                    value={draft.settings.craftsmanshipBanner.title.ar}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        settings: {
                          ...draft.settings,
                          craftsmanshipBanner: {
                            ...draft.settings.craftsmanshipBanner,
                            title: {
                              ...draft.settings.craftsmanshipBanner.title,
                              ar: e.target.value,
                            },
                          },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">Banner Title (EN)</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={draft.settings.craftsmanshipBanner.title.en}
                    onChange={(e) =>
                      setDraft({
                        ...draft,
                        settings: {
                          ...draft.settings,
                          craftsmanshipBanner: {
                            ...draft.settings.craftsmanshipBanner,
                            title: {
                              ...draft.settings.craftsmanshipBanner.title,
                              en: e.target.value,
                            },
                          },
                        },
                      })
                    }
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. Products Tab */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-[#C9A24A]">إدارة الأزياء والقطع الملكية (تعديل واستبدال الصور)</h2>
              <button
                type="button"
                onClick={addNewProduct}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A24A] text-[#090909] text-xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة قطعة جديدة</span>
              </button>
            </div>

            {draft.products.map((prod, idx) => (
              <div key={prod.id} className="bg-[#111111] border border-white/10 p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="font-editorial text-lg text-[#C9A24A]">{prod.name.ar}</span>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-1.5 text-xs text-[#A3A3A3] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={prod.featured}
                        onChange={(e) => {
                          const next = [...draft.products];
                          next[idx] = { ...prod, featured: e.target.checked };
                          setDraft({ ...draft, products: next });
                        }}
                      />
                      <span>عرض في الرئيسية</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        const next = draft.products.filter((_, i) => i !== idx);
                        setDraft({ ...draft, products: next });
                      }}
                      className="text-xs text-red-400 hover:underline inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>حذف القطعة</span>
                    </button>
                  </div>
                </div>

                <ImageReplacer
                  label={`صورة القطعة: ${prod.name.ar}`}
                  imageUrl={prod.image}
                  category="products"
                  onUploadFile={handleImageUpload}
                  onChange={(newUrl) => {
                    const next = [...draft.products];
                    next[idx] = { ...prod, image: newUrl, gallery: [newUrl] };
                    setDraft({ ...draft, products: next });
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">الاسم (عربي)</label>
                    <input
                      type="text"
                      value={prod.name.ar}
                      onChange={(e) => {
                        const next = [...draft.products];
                        next[idx] = { ...prod, name: { ...prod.name, ar: e.target.value } };
                        setDraft({ ...draft, products: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">Name (English)</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={prod.name.en}
                      onChange={(e) => {
                        const next = [...draft.products];
                        next[idx] = { ...prod, name: { ...prod.name, en: e.target.value } };
                        setDraft({ ...draft, products: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">السعر (عربي)</label>
                    <input
                      type="text"
                      value={prod.price.ar}
                      onChange={(e) => {
                        const next = [...draft.products];
                        next[idx] = { ...prod, price: { ...prod.price, ar: e.target.value } };
                        setDraft({ ...draft, products: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">Price (English)</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={prod.price.en}
                      onChange={(e) => {
                        const next = [...draft.products];
                        next[idx] = { ...prod, price: { ...prod.price, en: e.target.value } };
                        setDraft({ ...draft, products: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs text-[#A3A3A3] mb-1">الوصف التفصيلي (عربي)</label>
                    <textarea
                      rows={2}
                      value={prod.description.ar}
                      onChange={(e) => {
                        const next = [...draft.products];
                        next[idx] = {
                          ...prod,
                          description: { ...prod.description, ar: e.target.value },
                        };
                        setDraft({ ...draft, products: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 6. Collections Tab */}
        {activeTab === 'collections' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-[#C9A24A]">إدارة المجموعات واستبدال صورها</h2>
              <button
                type="button"
                onClick={addNewCollection}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A24A] text-[#090909] text-xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة مجموعة</span>
              </button>
            </div>
            {draft.collections.map((col, idx) => (
              <div key={col.id} className="bg-[#111111] border border-white/10 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-editorial text-lg text-[#C9A24A]">{col.title.ar}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        collections: draft.collections.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-xs text-red-400 hover:underline inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>حذف المجموعة</span>
                  </button>
                </div>

                <ImageReplacer
                  label={`صورة المجموعة: ${col.title.ar}`}
                  imageUrl={col.image}
                  category="collections"
                  onUploadFile={handleImageUpload}
                  onChange={(newUrl) => {
                    const next = [...draft.collections];
                    next[idx] = { ...col, image: newUrl };
                    setDraft({ ...draft, collections: next });
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">عنوان المجموعة (عربي)</label>
                    <input
                      type="text"
                      value={col.title.ar}
                      onChange={(e) => {
                        const next = [...draft.collections];
                        next[idx] = { ...col, title: { ...col.title, ar: e.target.value } };
                        setDraft({ ...draft, collections: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">Collection Title (EN)</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={col.title.en}
                      onChange={(e) => {
                        const next = [...draft.collections];
                        next[idx] = { ...col, title: { ...col.title, en: e.target.value } };
                        setDraft({ ...draft, collections: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 7. Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-[#C9A24A]">خدمات التفصيل والأتيليه (تعديل واستبدال الصور)</h2>
              <button
                type="button"
                onClick={addNewService}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A24A] text-[#090909] text-xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة خدمة</span>
              </button>
            </div>
            {draft.services.map((srv, idx) => (
              <div key={srv.id} className="bg-[#111111] border border-white/10 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-editorial text-lg text-[#C9A24A]">{srv.title.ar}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        services: draft.services.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-xs text-red-400 hover:underline"
                  >
                    حذف
                  </button>
                </div>

                <ImageReplacer
                  label={`صورة الخدمة: ${srv.title.ar}`}
                  imageUrl={srv.image}
                  category="services"
                  onUploadFile={handleImageUpload}
                  onChange={(newUrl) => {
                    const next = [...draft.services];
                    next[idx] = { ...srv, image: newUrl };
                    setDraft({ ...draft, services: next });
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">اسم الخدمة (عربي)</label>
                    <input
                      type="text"
                      value={srv.title.ar}
                      onChange={(e) => {
                        const next = [...draft.services];
                        next[idx] = { ...srv, title: { ...srv.title, ar: e.target.value } };
                        setDraft({ ...draft, services: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">Service Title (EN)</label>
                    <input
                      type="text"
                      dir="ltr"
                      value={srv.title.en}
                      onChange={(e) => {
                        const next = [...draft.services];
                        next[idx] = { ...srv, title: { ...srv.title, en: e.target.value } };
                        setDraft({ ...draft, services: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 8. Offers Tab */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-[#C9A24A]">العروض والباقات الملكية (تعديل واستبدال الصور)</h2>
              <button
                type="button"
                onClick={addNewOffer}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A24A] text-[#090909] text-xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة عرض</span>
              </button>
            </div>
            {draft.offers.map((offer, idx) => (
              <div key={offer.id} className="bg-[#111111] border border-white/10 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-editorial text-lg text-[#C9A24A]">{offer.title.ar}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        offers: draft.offers.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-xs text-red-400 hover:underline"
                  >
                    حذف
                  </button>
                </div>

                <ImageReplacer
                  label={`صورة العرض: ${offer.title.ar}`}
                  imageUrl={offer.image}
                  category="offers"
                  onUploadFile={handleImageUpload}
                  onChange={(newUrl) => {
                    const next = [...draft.offers];
                    next[idx] = { ...offer, image: newUrl };
                    setDraft({ ...draft, offers: next });
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">عنوان العرض (عربي)</label>
                    <input
                      type="text"
                      value={offer.title.ar}
                      onChange={(e) => {
                        const next = [...draft.offers];
                        next[idx] = { ...offer, title: { ...offer.title, ar: e.target.value } };
                        setDraft({ ...draft, offers: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">السعر / الامتياز (عربي)</label>
                    <input
                      type="text"
                      value={offer.priceText.ar}
                      onChange={(e) => {
                        const next = [...draft.offers];
                        next[idx] = {
                          ...offer,
                          priceText: { ...offer.priceText, ar: e.target.value },
                        };
                        setDraft({ ...draft, offers: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 9. Gallery Tab */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-[#C9A24A]">معرض الصور (استبدال وإضافة صور المعرض)</h2>
              <button
                type="button"
                onClick={addNewGalleryItem}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A24A] text-[#090909] text-xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة صورة للمعرض</span>
              </button>
            </div>
            {draft.gallery.map((item, idx) => (
              <div key={item.id} className="bg-[#111111] border border-white/10 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-editorial text-lg text-[#C9A24A]">{item.title.ar}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        gallery: draft.gallery.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-xs text-red-400 hover:underline"
                  >
                    حذف
                  </button>
                </div>

                <ImageReplacer
                  label={`صورة المعرض: ${item.title.ar}`}
                  imageUrl={item.image}
                  category="gallery"
                  onUploadFile={handleImageUpload}
                  onChange={(newUrl) => {
                    const next = [...draft.gallery];
                    next[idx] = { ...item, image: newUrl };
                    setDraft({ ...draft, gallery: next });
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">العنوان (عربي)</label>
                    <input
                      type="text"
                      value={item.title.ar}
                      onChange={(e) => {
                        const next = [...draft.gallery];
                        next[idx] = { ...item, title: { ...item.title, ar: e.target.value } };
                        setDraft({ ...draft, gallery: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">الوصف المختصر (عربي)</label>
                    <input
                      type="text"
                      value={item.caption.ar}
                      onChange={(e) => {
                        const next = [...draft.gallery];
                        next[idx] = { ...item, caption: { ...item.caption, ar: e.target.value } };
                        setDraft({ ...draft, gallery: next });
                      }}
                      className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 10. Articles Tab */}
        {activeTab === 'articles' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-[#C9A24A]">مقالات المجلة الملكية (تعديل واستبدال الصور)</h2>
              <button
                type="button"
                onClick={addNewArticle}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#C9A24A] text-[#090909] text-xs font-semibold"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة مقال</span>
              </button>
            </div>
            {draft.articles.map((art, idx) => (
              <div key={art.id} className="bg-[#111111] border border-white/10 p-6 space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-2">
                  <span className="font-editorial text-lg text-[#C9A24A]">{art.title.ar}</span>
                  <button
                    type="button"
                    onClick={() =>
                      setDraft({
                        ...draft,
                        articles: draft.articles.filter((_, i) => i !== idx),
                      })
                    }
                    className="text-xs text-red-400 hover:underline"
                  >
                    حذف
                  </button>
                </div>

                <ImageReplacer
                  label={`صورة المقال: ${art.title.ar}`}
                  imageUrl={art.image}
                  category="articles"
                  onUploadFile={handleImageUpload}
                  onChange={(newUrl) => {
                    const next = [...draft.articles];
                    next[idx] = { ...art, image: newUrl };
                    setDraft({ ...draft, articles: next });
                  }}
                />

                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">عنوان المقال (عربي)</label>
                  <input
                    type="text"
                    value={art.title.ar}
                    onChange={(e) => {
                      const next = [...draft.articles];
                      next[idx] = { ...art, title: { ...art.title, ar: e.target.value } };
                      setDraft({ ...draft, articles: next });
                    }}
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#A3A3A3] mb-1">المحتوى (عربي)</label>
                  <textarea
                    rows={3}
                    value={art.content.ar}
                    onChange={(e) => {
                      const next = [...draft.articles];
                      next[idx] = { ...art, content: { ...art.content, ar: e.target.value } };
                      setDraft({ ...draft, articles: next });
                    }}
                    className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 11. Static Pages Tab */}
        {activeTab === 'pages' && (
          <div className="bg-[#111111] border border-white/10 p-6 space-y-6">
            <div className="flex gap-2 border-b border-white/10 pb-4">
              {(['about', 'privacy', 'terms'] as const).map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setActivePageKey(key)}
                  className={`px-4 py-2 text-xs border ${
                    activePageKey === key
                      ? 'bg-[#C9A24A] text-[#090909] border-[#C9A24A] font-semibold'
                      : 'border-white/15 text-[#A3A3A3]'
                  }`}
                >
                  {key === 'about'
                    ? 'صفحة عن الدار (About)'
                    : key === 'privacy'
                    ? 'سياسة الخصوصية (Privacy)'
                    : 'الشروط والأحكام (Terms)'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">عنوان الصفحة (عربي)</label>
                <input
                  type="text"
                  value={draft.pages[activePageKey].title.ar}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      pages: {
                        ...draft.pages,
                        [activePageKey]: {
                          ...draft.pages[activePageKey],
                          title: { ...draft.pages[activePageKey].title, ar: e.target.value },
                        },
                      },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-[#A3A3A3] mb-1">Page Title (English)</label>
                <input
                  type="text"
                  dir="ltr"
                  value={draft.pages[activePageKey].title.en}
                  onChange={(e) =>
                    setDraft({
                      ...draft,
                      pages: {
                        ...draft.pages,
                        [activePageKey]: {
                          ...draft.pages[activePageKey],
                          title: { ...draft.pages[activePageKey].title, en: e.target.value },
                        },
                      },
                    })
                  }
                  className="w-full bg-[#090909] border border-white/15 px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10">
              <h3 className="text-xs font-semibold text-[#C9A24A]">فقرات الصفحة</h3>
              {draft.pages[activePageKey].sections.map((sec, sIdx) => (
                <div key={sIdx} className="p-4 bg-[#090909] border border-white/10 space-y-3">
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">عنوان الفقرة (عربي)</label>
                    <input
                      type="text"
                      value={sec.heading.ar}
                      onChange={(e) => {
                        const nextSections = [...draft.pages[activePageKey].sections];
                        nextSections[sIdx] = {
                          ...sec,
                          heading: { ...sec.heading, ar: e.target.value },
                        };
                        setDraft({
                          ...draft,
                          pages: {
                            ...draft.pages,
                            [activePageKey]: {
                              ...draft.pages[activePageKey],
                              sections: nextSections,
                            },
                          },
                        });
                      }}
                      className="w-full bg-[#111111] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#A3A3A3] mb-1">النص (عربي)</label>
                    <textarea
                      rows={3}
                      value={sec.body.ar}
                      onChange={(e) => {
                        const nextSections = [...draft.pages[activePageKey].sections];
                        nextSections[sIdx] = {
                          ...sec,
                          body: { ...sec.body, ar: e.target.value },
                        };
                        setDraft({
                          ...draft,
                          pages: {
                            ...draft.pages,
                            [activePageKey]: {
                              ...draft.pages[activePageKey],
                              sections: nextSections,
                            },
                          },
                        });
                      }}
                      className="w-full bg-[#111111] border border-white/15 px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
