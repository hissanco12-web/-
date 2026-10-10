import { Language, LocalizedText } from '../types/cms';

export function t(value: LocalizedText | undefined | null, lang: Language): string {
  if (!value) return '';
  return value[lang] || value.ar || value.en || '';
}

export function cleanWhatsAppNumber(phone: string): string {
  return phone.replace(/[^\d]/g, '');
}

export function buildWhatsAppLink(phone: string, message: string): string {
  const clean = cleanWhatsAppNumber(phone || '+15108305874');
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

export const uiStrings = {
  ar: {
    nav: {
      home: 'الرئيسية',
      collections: 'المجموعات',
      products: 'الأزياء الملكية',
      services: 'الخدمات والتفصيل',
      gallery: 'المعرض',
      articles: 'المجلة',
      offers: 'العروض الخاصة',
      about: 'عن الدار',
      contact: 'تواصل معنا',
      privacy: 'سياسة الخصوصية',
      terms: 'الشروط والأحكام',
      bookWhatsapp: 'احجز استشارة خاصة',
    },
    common: {
      exploreCollection: 'استكشف المجموعة',
      viewDetails: 'تفاصيل القطعة',
      inquireWhatsapp: 'اطلب عبر واتساب',
      bookAppointment: 'حجز موعد تفصيل عبر واتساب',
      sharePiece: 'مشاركة القطعة',
      allCategories: 'جميع الفئات',
      featuredPieces: 'قطع مختارة من الأتيليه',
      bespokeServices: 'خدمات التفصيل الملكي',
      backToProducts: 'العودة إلى الأزياء',
      backToCollections: 'العودة إلى المجموعات',
      fabric: 'القماش والنسيج',
      origin: 'المصدر والحياكة',
      leadTime: 'مدة التنفيذ',
      specifications: 'المواصفات والتفاصيل',
      relatedPieces: 'قطع مكملة لإطلالتك',
      conciergeNote: 'يتم تنفيذ كل قطعة حسب القياس الشخصي بإشراف خبراء الخياطة الملكية.',
      copyLink: 'نسخ الرابط',
      copied: 'تم النسخ',
      close: 'إغلاق',
      readMore: 'قراءة المقال',
      rightsReserved: 'جميع الحقوق محفوظة لدار KINGSMEN LINE للأزياء الملكية.',
    },
  },
  en: {
    nav: {
      home: 'Home',
      collections: 'Collections',
      products: 'Royal Attire',
      services: 'Bespoke Services',
      gallery: 'Lookbook',
      articles: 'Journal',
      offers: 'Private Offers',
      about: 'The House',
      contact: 'Concierge',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      bookWhatsapp: 'Private Consultation',
    },
    common: {
      exploreCollection: 'Explore Collection',
      viewDetails: 'View Piece',
      inquireWhatsapp: 'Inquire via WhatsApp',
      bookAppointment: 'Book Bespoke Fitting via WhatsApp',
      sharePiece: 'Share Piece',
      allCategories: 'All Categories',
      featuredPieces: 'Curated Atelier Pieces',
      bespokeServices: 'Royal Bespoke Services',
      backToProducts: 'Back to Royal Attire',
      backToCollections: 'Back to Collections',
      fabric: 'Cloth & Weave',
      origin: 'Provenance',
      leadTime: 'Tailoring Time',
      specifications: 'Craftsmanship Specifications',
      relatedPieces: 'Complementary Pieces',
      conciergeNote: 'Every garment is individually cut and hand-finished to your personal measurements.',
      copyLink: 'Copy Link',
      copied: 'Copied',
      close: 'Close',
      readMore: 'Read Editorial',
      rightsReserved: 'All rights reserved. KINGSMEN LINE Bespoke Tailoring.',
    },
  },
} as const;
