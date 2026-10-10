import { CMSData } from '../types/cms';

export const initialCMSData: CMSData = {
  settings: {
    brandName: 'KINGSMEN LINE',
    logoUrl: '',
    tagline: {
      ar: 'الخياطة الملكية الراقية وتراث النخبة العربية بدقة سافيل رو',
      en: 'Bespoke Tailoring & Modern Royal Menswear Crafted with Savile Row Precision',
    },
    whatsappNumber: '+15108305874',
    phoneDisplay: '+1 (510) 830-5874',
    contactEmail: 'concierge@kingsmenline.com',
    address: {
      ar: 'جناح التصميم الخاص — الرياض | لندن سافيل رو (بموعد مسبق)',
      en: 'Private Bespoke Salon — Riyadh | London Savile Row (By Appointment)',
    },
    workingHours: {
      ar: 'السبت – الخميس: 11:00 صباحاً – 10:00 مساءً',
      en: 'Saturday – Thursday: 11:00 AM – 10:00 PM',
    },
    adminEmail: 'smthysan@gmail.com',
    instagramUrl: 'https://instagram.com',
    socials: {
      instagram: 'https://instagram.com',
      snapchat: '',
      tiktok: '',
      twitter: '',
      facebook: '',
      youtube: '',
      googleMaps: '',
    },
    seo: {
      metaTitle: {
        ar: 'KINGSMEN LINE — الخياطة الملكية الراقية والأزياء الرجالية الفاخرة',
        en: 'KINGSMEN LINE — Luxury Tailoring & Modern Royal Menswear',
      },
      metaDescription: {
        ar: 'اكتشف دار KINGSMEN LINE: تفصيل البدلات الملكية، البشوت الحساوية بالزري الحر، وأزياء السهرة الفاخرة بدقة سافيل رو.',
        en: 'Discover KINGSMEN LINE: bespoke tailoring, ceremonial royal bishts, and luxury eveningwear crafted with Savile Row precision and Arabian heritage.',
      },
      keywords: {
        ar: 'كينغزمان لاين, تفصيل بدلات رجالية, بشت ملكي, توكسيدو فاخر, خياطة ملكية, سافيل رو الرياض',
        en: 'KINGSMEN LINE, bespoke tailoring, royal bisht, luxury tuxedo, Savile Row menswear, ceremonial attire',
      },
      ogImage:
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=85',
    },
    theme: {
      primaryBg: '#090909',
      surfaceBg: '#111111',
      accentGold: '#C9A24A',
      accentLightGold: '#E0C878',
      textPrimary: '#F7F7F5',
      textMuted: '#A3A3A3',
    },
    homeSections: {
      showPillars: true,
      showCollections: true,
      showFeaturedProducts: true,
      showCraftsmanshipBanner: true,
      collectionsEyebrow: {
        ar: 'مجموعات الدار',
        en: 'THE COLLECTIONS',
      },
      collectionsTitle: {
        ar: 'إصدارات الفخامة الملكية',
        en: 'Sovereign Sartorial Divisions',
      },
      productsEyebrow: {
        ar: 'الأتيليه الملكي',
        en: 'BESPOKE ARCHIVE',
      },
      productsTitle: {
        ar: 'قطع مختارة من الأتيليه',
        en: 'Curated Atelier Pieces',
      },
      pillars: [
        {
          title: {
            ar: 'تفصيل سافيل رو اليدوي',
            en: 'Savile Row Bespoke Cut',
          },
          description: {
            ar: 'باترون خاص لكل عميل مع بطانة داخلية حرة كاملة تحاك يدوياً.',
            en: 'Individual paper patterns and hand-padded floating horsehair canvas.',
          },
        },
        {
          title: {
            ar: 'البشت الملكي والزري الحر',
            en: 'Imperial Arabian Bishts',
          },
          description: {
            ar: 'حياكة تراثية فاخرة بخيوط الزري المذهبة للمراسم والمناسبات الكبرى.',
            en: 'Hand-loomed ceremonial bishts finished with 24k gold-plated zari.',
          },
        },
        {
          title: {
            ar: 'استشارة خاصة وخدمة VIP',
            en: 'Private VIP Concierge',
          },
          description: {
            ar: 'حجز مواعيد خاصة في الأتيليه أو زيارة الخياط الخاص لمقركم.',
            en: 'By-appointment salon fittings or private travelling tailor visits.',
          },
        },
      ],
    },
    hero: {
      eyebrow: {
        ar: 'دار كينغزمان لاين — الأتيليه الملكي الخاص',
        en: 'HOUSE OF KINGSMEN LINE — PRIVATE ROYAL ATELIER',
      },
      title: {
        ar: 'هيبة الحضور الملكي في كل تفصيلة تُحاك يدوياً',
        en: 'Sovereign Presence in Every Hand-Cut Stitch',
      },
      subtitle: {
        ar: 'نجمع بين عراقة البشت الملكي العربي وأرقى تقاليد الحياكة الإنجليزية في سافيل رو، لنصنع قطعاً استثنائية تُفصّل حصرياً لشخصيتك.',
        en: 'Uniting ceremonial Arabian heritage with uncompromising Savile Row tailoring to create bespoke garments of enduring authority.',
      },
      primaryCta: {
        ar: 'استكشف الأزياء الملكية',
        en: 'Explore Royal Attire',
      },
      secondaryCta: {
        ar: 'احجز جلسة قياس خاصة',
        en: 'Book Private Fitting',
      },
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1800&q=85',
    },
    craftsmanshipBanner: {
      eyebrow: {
        ar: 'فلسفة الإتقان والندرة',
        en: 'THE ART OF BESPOKE CRAFTSMANSHIP',
      },
      title: {
        ar: 'أكثر من 80 ساعة من العمل اليدوي المتقن لكل قطعة',
        en: 'Over 80 Hours of Master Handwork in Every Commission',
      },
      description: {
        ar: 'نختار أندر الأقمشة الإيطالية والإنجليزية من الصوف الخالص، الكشمير الملكي، والمخمل الفاخر مع خيوط الزري المذهبة لنمنحك قطعة تدوم لأجيال.',
        en: 'Sourcing rare Super 180s wools, inner-Mongolian cashmere, silk velvet, and pure gold-plated zari threadwork for garments built to last generations.',
      },
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1600&q=85',
    },
  },
  collections: [
    {
      id: 'col-1',
      slug: 'sovereign-eveningwear',
      title: {
        ar: 'مجموعة السهرة السيادية',
        en: 'Sovereign Eveningwear',
      },
      subtitle: {
        ar: 'توكسيدو وسترات سهرة مخملية للمناسبات الرفيعة',
        en: 'Ceremonial Tuxedos & Velvet Dinner Jackets',
      },
      description: {
        ar: 'تصاميم مسائية تجمع بين الوقار الكلاسيكي واللمسات الملكية المعاصرة، منفذة من الحرير الطبيعي والمخمل الإيطالي.',
        en: 'Commanding black-tie silhouettes crafted from barathea wool, silk grosgrain, and plush Italian cotton-silk velvet.',
      },
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=85',
      season: {
        ar: 'إصدار خاص — خريف وشتاء',
        en: 'Private Edition — Autumn / Winter',
      },
      featured: true,
    },
    {
      id: 'col-2',
      slug: 'imperial-bisht',
      title: {
        ar: 'البشت الإمبراطوري والمراسم',
        en: 'Imperial Ceremonial Bisht',
      },
      subtitle: {
        ar: 'حياكة حساوية يدوية بخيوط الزري الملكي',
        en: 'Hand-Loomed Arabian Bishts with Pure Gold Zari',
      },
      description: {
        ar: 'بشوت مراسم ملكية منسوجة من أجود أنواع الوبر والصوف النادر مع تطريز يدوي متقن يعكس الفخامة العربية الأصيلة.',
        en: 'Heirloom ceremonial bishts woven from ultra-fine camel hair and merino wool, finished with hand-braided gold and silver zari.',
      },
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85',
      season: {
        ar: 'المجموعة الدائمة للمراسم',
        en: 'Permanent Ceremonial Archive',
      },
      featured: true,
    },
    {
      id: 'col-3',
      slug: 'savile-row-bespoke',
      title: {
        ar: 'البدلات المفصلة — سافيل رو',
        en: 'Savile Row Bespoke Suits',
      },
      subtitle: {
        ar: 'حياكة كاملة بالبطانة الحرة (Full Canvas)',
        en: 'Full-Canvas Architectural Tailoring',
      },
      description: {
        ar: 'بدلات تنفيذية ورسمية مفصلة بالكامل حسب القياس الشخصي لتمنحك انسيابية مثالية وهيبة لا تضاهى في مجالس الإدارة والقمم الرسمية.',
        en: 'Individually drafted paper patterns and hand-padded horsehair canvas delivering unmatched structure and effortless movement.',
      },
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      season: {
        ar: 'تفصيل حسب الطلب طوال العام',
        en: 'Year-Round Bespoke Commission',
      },
      featured: true,
    },
  ],
  products: [
    {
      id: 'prod-1',
      slug: 'sovereign-midnight-tuxedo',
      name: {
        ar: 'توكسيدو "سوفيرين" بلون منتصف الليل',
        en: 'The Sovereign Midnight Tuxedo',
      },
      subtitle: {
        ar: 'صوف باراثيا إنجليزي مع ياقة حرير غروسغرين',
        en: 'English Barathea Wool with Silk Grosgrain Peak Lapels',
      },
      description: {
        ar: 'بدلة سهرة ملكية مصممة بحياكة يدوية كاملة (Full Canvas)، تتميز بلون كحلي ليلي أعمق من الأسود تحت الإضاءة المسائية، مع ياقة عريضة مكسوة بالحرير الطبيعي المنسوج في إنجلترا.',
        en: 'Cut with a commanding structured shoulder and roped sleevehead, our signature midnight blue barathea tuxedo appears richer than jet black under evening illumination.',
      },
      price: {
        ar: '14,500 ر.س (تفصيل خاص)',
        en: '$3,850 USD (Bespoke Commission)',
      },
      category: 'Eveningwear',
      collectionSlug: 'sovereign-eveningwear',
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=85',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      ],
      fabric: {
        ar: 'صوف باراثيا إنجليزي فائق النعومة 100% مع حرير طبيعي',
        en: '100% English Barathea Wool & Pure Mulberry Silk Facings',
      },
      origin: {
        ar: 'نسيج هدرسفيلد، إنجلترا — تفصيل يدوي خاص',
        en: 'Woven in Huddersfield, England — Hand-Tailored',
      },
      leadTime: {
        ar: '4 إلى 6 أسابيع (تشمل جلستي بروفة)',
        en: '4 to 6 Weeks (Includes Two Private Fittings)',
      },
      features: [
        { ar: 'بناء داخلي كامل من شعر الخيل الطبيعي (Full Floating Canvas)', en: 'Full floating horsehair canvas construction' },
        { ar: 'عراوي أكمام مشغولة يدوياً بالحرير (Working Milanese Buttonholes)', en: 'Hand-sewn Milanese silk lapel buttonhole' },
        { ar: 'بطانة داخلية من حرير البمبرغ الفاخر مع تطريز الاسم الشخصي', en: 'Bemberg cupro lining with bespoke monogramming' },
      ],
      featured: true,
      available: true,
      badge: {
        ar: 'الأكثر طلباً للمناسبات الملكية',
        en: 'Signature Piece',
      },
    },
    {
      id: 'prod-2',
      slug: 'emerald-velvet-dinner-jacket',
      name: {
        ar: 'سترة سهرة مخملية ملكية',
        en: 'Imperial Velvet Dinner Jacket',
      },
      subtitle: {
        ar: 'مخمل قطن وحرير إيطالي بياقة شال من الساتان',
        en: 'Italian Silk-Cotton Velvet with Satin Shawl Collar',
      },
      description: {
        ar: 'سترة سهرة استثنائية تجمع بين فخامة المخمل الإيطالي الكثيف وأناقة ياقة الشال الحريرية، مثالية لحفلات الاستقبال الخاصة والمناسبات الاحتفالية الراقية.',
        en: 'Crafted from luminous Italian velvet with a sweeping silk satin shawl collar, offering effortless distinction for private galas and formal receptions.',
      },
      price: {
        ar: '11,200 ر.س (تفصيل خاص)',
        en: '$2,980 USD (Bespoke Commission)',
      },
      category: 'Eveningwear',
      collectionSlug: 'sovereign-eveningwear',
      image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85',
      ],
      fabric: {
        ar: 'مخمل إيطالي فاخر ممزوج بالحرير الطبيعي',
        en: 'Plush Italian Velvet blended with Mulberry Silk',
      },
      origin: {
        ar: 'بييلا، إيطاليا — تفصيل خاص',
        en: 'Biella, Italy — Bespoke Atelier',
      },
      leadTime: {
        ar: '3 إلى 5 أسابيع',
        en: '3 to 5 Weeks',
      },
      features: [
        { ar: 'ياقة شال منحوتة يدوياً من الساتان الحريري', en: 'Hand-shaped silk satin shawl lapel' },
        { ar: 'أزرار مغطاة بالحرير الطبيعي المشغول يدوياً', en: 'Silk-covered bespoke buttons' },
        { ar: 'قصّة ملكية متوازنة تبرز عرض الكتفين', en: 'Architectural shoulder line with natural drape' },
      ],
      featured: true,
      available: true,
      badge: {
        ar: 'إصدار محدود',
        en: 'Limited Velvet Cloth',
      },
    },
    {
      id: 'prod-3',
      slug: 'imperial-hasawi-royal-bisht',
      name: {
        ar: 'البشت الملكي الإمبراطوري — زري حر',
        en: 'The Imperial Royal Bisht — Pure Gold Zari',
      },
      subtitle: {
        ar: 'وبر الجمل الفاخر مع تطريز زري ألماني مذهب يدوياً',
        en: 'Ultra-Fine Camel Hair with Hand-Braided Gold Zari',
      },
      description: {
        ar: 'تحفة تراثية منسوجة بدقة متناهية لأصحاب المعالي والسمو وعشاق التميز، يُحاك الزري يدوياً على يد أمهر الحرفيين بنقشة ملكية خاصة بدار كينغزمان لاين.',
        en: 'An heirloom garment of state and ceremony. Hand-woven from featherweight desert wool and adorned with intricate gold zari embroidery by master artisans.',
      },
      price: {
        ar: '16,800 ر.س (شامل القياس والتجهيز الملكي)',
        en: '$4,480 USD (Bespoke Ceremonial Grade)',
      },
      category: 'Ceremonial Bisht',
      collectionSlug: 'imperial-bisht',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85',
      ],
      fabric: {
        ar: 'صوف ووبر طبيعي نخب أول مع خيوط زري مذهبة عيار 24',
        en: 'First-Grade Fine Wool & 24k Gold-Plated Zari Thread',
      },
      origin: {
        ar: 'حياكة يدوية تراثية — الأحساء والرياض',
        en: 'Master Artisan Handwork — Al-Ahsa & Riyadh',
      },
      leadTime: {
        ar: '3 إلى 4 أسابيع',
        en: '3 to 4 Weeks',
      },
      features: [
        { ar: 'زري ملكي حر مضمون اللمعان والثبات مدى الحياة', en: 'Lifetime tarnish-resistant pure gold zari' },
        { ar: 'خبطة يدوية متقنة (مكسر ملكي ثلاثي)', en: 'Triple-tier royal artisanal border embroidery' },
        { ar: 'يُسلّم في صندوق جلدي ملكي مخصص للحفظ مع البخور الفاخر', en: 'Presented in a bespoke leather archival trunk' },
      ],
      featured: true,
      available: true,
      badge: {
        ar: 'فئة المراسم العليا',
        en: 'Royal Protocol Grade',
      },
    },
    {
      id: 'prod-4',
      slug: 'savile-double-breasted-suit',
      name: {
        ar: 'بدلة "كراون" دبل بريستد — صوف سوبر 180s',
        en: 'The Crown Double-Breasted Bespoke Suit',
      },
      subtitle: {
        ar: 'صوف أسترالي نادر بحياكة إنجليزية كلاسيكية',
        en: 'Super 180s Merino Wool with 6x2 Peak Lapel Cut',
      },
      description: {
        ar: 'تجسيد للقوة والأناقة الدبلوماسية؛ بدلة بصدر مزدوج (Double-Breasted) مقصوصة يدوياً لتمنح حضوراً واثقاً وانسيابية فائقة.',
        en: 'A masterclass in diplomatic tailoring. Our 6x2 double-breasted silhouette commands the room with sweeping peak lapels and a clean, tapered waist.',
      },
      price: {
        ar: '13,900 ر.س (تفصيل خاص)',
        en: '$3,700 USD (Bespoke Commission)',
      },
      category: 'Bespoke Suits',
      collectionSlug: 'savile-row-bespoke',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      gallery: [
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      ],
      fabric: {
        ar: 'صوف ميرينو Super 180s نادر',
        en: 'Rare Super 180s Australian Merino Wool',
      },
      origin: {
        ar: 'إنجلترا وإيطاليا',
        en: 'England & Italy',
      },
      leadTime: {
        ar: '4 إلى 6 أسابيع',
        en: '4 to 6 Weeks',
      },
      features: [
        { ar: 'تفصيل باترون ورقي خاص لكل عميل يُحفظ في أرشيف الدار', en: 'Individual paper pattern archived for future commissions' },
        { ar: 'أزرار من قرن الجاموس الطبيعي المصقول يدوياً', en: 'Hand-polished natural horn buttons' },
        { ar: 'حياكة يدوية دقيقة للياقة والأكتاف', en: 'Hand-padded lapels and collar for permanent roll' },
      ],
      featured: true,
      available: true,
    },
  ],
  services: [
    {
      id: 'srv-1',
      slug: 'private-atelier-fitting',
      title: {
        ar: 'جلسة القياس الملكية الخاصة (في الجناح أو مقر العميل)',
        en: 'Private VIP Atelier & Travelling Tailor Service',
      },
      subtitle: {
        ar: 'خدمة الخياط الخاص في منزلك أو مكتبك أو جناحنا الخاص',
        en: 'Personal Master Cutter Visits at Your Residence, Office, or Private Suite',
      },
      description: {
        ar: 'نوفر لك تجربة تفصيل خاصة بالكامل؛ حيث يحضر كبير الخياطين مع كتالوجات الأقمشة النادرة لأخذ أكثر من 35 قياساً دقيقاً وتحديد أدق تفاصيل التصميم.',
        en: 'Our Master Cutter travels to your private residence, executive office, or welcomes you in our private salon with curated cloth books and ceremonial samples.',
      },
      duration: {
        ar: '60 – 90 دقيقة (بموعد حصري)',
        en: '60 – 90 Minutes (By Private Appointment)',
      },
      priceNote: {
        ar: 'مشمولة ضمن طلبات التفصيل الخاص',
        en: 'Complimentary with Bespoke Commissions',
      },
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
      highlights: [
        { ar: 'أكثر من 2,500 عينة قماش من أعرق الدور الأوروبية', en: 'Access to over 2,500 rare European cloth bunches' },
        { ar: 'أخذ قياسات تشريحية دقيقة لضمان راحة وهيبة مثالية', en: '35-point anatomical posture and measurement profile' },
        { ar: 'خصوصية تامة وخدمة ضيافة ملكية', en: 'Complete discretion and royal hospitality' },
      ],
    },
    {
      id: 'srv-2',
      slug: 'ceremonial-wardrobe-curation',
      title: {
        ar: 'تجهيز خزانة المراسم والمناسبات الكبرى',
        en: 'Royal Ceremonial & Groom Wardrobe Curation',
      },
      subtitle: {
        ar: 'تصميم متكامل لإطلالات الزفاف الملكي والمناسبات الدبلوماسية',
        en: 'Complete Sartorial Direction for Royal Weddings & State Occasions',
      },
      description: {
        ar: 'إشراف كامل على إطلالتك في الليالي الكبرى، بدءاً من البشت الملكي المحاك بالزري الحر أو التوكسيدو المفصل يدوياً، وصولاً إلى القمصان الحريرية والإكسسوارات.',
        en: 'End-to-end wardrobe architecture for weddings, diplomatic summits, and black-tie galas—combining bespoke eveningwear with ceremonial bishts.',
      },
      duration: {
        ar: 'برنامج مخصص (3 إلى 6 أسابيع)',
        en: 'Tailored Timeline (3 to 6 Weeks)',
      },
      priceNote: {
        ar: 'باقات ملكية مخصصة حسب الطلب',
        en: 'Bespoke Curation Packages',
      },
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
      highlights: [
        { ar: 'تنسيق كامل بين البشت الملكي والبدلة الرسمية', en: 'Harmonized ceremonial bisht and eveningwear ensembles' },
        { ar: 'تطريز الأحرف الأولى والتاريخ داخل البطانة الحريرية', en: 'Custom date and monogram embroidery inside the jacket' },
        { ar: 'خدمة تجهيز وتسليم شخصي قبل المناسبة', en: 'White-glove pressing and personal delivery before your event' },
      ],
    },
  ],
  gallery: [
    {
      id: 'gal-1',
      title: {
        ar: 'تفاصيل القص اليدوي في الأتيليه',
        en: 'Hand-Drafted Chalk Patterns in the Atelier',
      },
      caption: {
        ar: 'كل قطعة تبدأ بباترون ورقي يُرسم يدوياً باسم العميل.',
        en: 'Every garment begins with an individual hand-drawn paper pattern.',
      },
      category: {
        ar: 'الحرفية اليدوية',
        en: 'Craftsmanship',
      },
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'gal-2',
      title: {
        ar: 'توكسيدو السهرة الملكي',
        en: 'Sovereign Black-Tie Silhouette',
      },
      caption: {
        ar: 'ياقة بيك عريضة من الحرير الطبيعي مع بناء صدر منحوت.',
        en: 'Broad silk grosgrain peak lapels with a sculpted chest canvas.',
      },
      category: {
        ar: 'أزياء السهرة',
        en: 'Eveningwear',
      },
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'gal-3',
      title: {
        ar: 'الأناقة التنفيذية المعاصرة',
        en: 'Executive Bespoke Authority',
      },
      caption: {
        ar: 'صوف إنجليزي فاخر يمنحك حضوراً استثنائياً طوال اليوم.',
        en: 'English worsted wool engineered for commanding presence.',
      },
      category: {
        ar: 'بدلات سافيل رو',
        en: 'Bespoke Tailoring',
      },
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'gal-4',
      title: {
        ar: 'مخمل السهرة الإمبراطوري',
        en: 'Imperial Evening Velvet',
      },
      caption: {
        ar: 'ملمس غني وإضاءة عميقة تليق بالمناسبات الخاصة.',
        en: 'Deep tonal lustre crafted from Italian silk-cotton velvet.',
      },
      category: {
        ar: 'إصدارات خاصة',
        en: 'Private Editions',
      },
      image: 'https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=1200&q=85',
    },
  ],
  articles: [
    {
      id: 'art-1',
      slug: 'art-of-full-canvas-tailoring',
      title: {
        ar: 'سر الخياطة بالبطانة الحرة (Full Canvas): لماذا تزداد البدلة جمالاً مع السنين؟',
        en: 'The Architecture of Full-Canvas Tailoring: Why True Bespoke Improves with Age',
      },
      excerpt: {
        ar: 'تعرف على الفرق الجوهري بين البدلات الجاهزة والملصقة، وبين الحياكة اليدوية الكاملة التي تتشكل على قوام جسمك.',
        en: 'Discover how thousands of hand-padded stitches in horsehair canvas mold naturally to your physique over time.',
      },
      content: {
        ar: 'في دار كينغزمان لاين، نرفض استخدام اللاصق الحراري في صناعة البدلات. بدلاً من ذلك، نعتمد تقنية البطانة الحرة الكاملة (Full Floating Canvas) المصنوعة من شعر الخيل الطبيعي والقطن الكتاني، والتي تُحاك يدوياً بآلاف الغرز غير المرئية لتمنح الصدر والياقة انحناءة طبيعية فاخرة تتكيف مع حركة جسمك وتدوم لعقود.',
        en: 'At KINGSMEN LINE, every bespoke jacket is built around a floating internal structure of natural horsehair canvas. Rather than fusing cloth with synthetic adhesives, our tailors execute thousands of hand-padded stitches so the chest and lapels roll with organic grace and conform to your posture.',
      },
      category: {
        ar: 'أسرار الحياكة',
        en: 'Sartorial Craft',
      },
      readTime: {
        ar: '4 دقائق للقراءة',
        en: '4 Min Read',
      },
      publishedAt: '2026-09-15',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 'art-2',
      slug: 'heritage-of-the-royal-bisht',
      title: {
        ar: 'البشت الملكي بين أصالة التراث العربي وبروتوكول المراسم الحديثة',
        en: 'The Royal Bisht: Arabian Heritage & Modern Ceremonial Protocol',
      },
      excerpt: {
        ar: 'قراءة في رمزية البشت العربي وكيفية اختيار اللون ونوع الزري المناسب لكل وقت ومناسبة رسمية.',
        en: 'A guide to selecting the right weave weight, tonal shade, and gold zari grade for daytime and evening state occasions.',
      },
      content: {
        ar: 'يمثل البشت الملكي ذروة الأناقة العربية والوقار في المناسبات الرسمية وحفلات الزفاف. يعتمد اختيار البشت المثالي على توقيت المناسبة؛ حيث تُفضل الألوان الفاتحة والبيج الكريمي في النهار، بينما يتألق الأسود الملكي والكحلي الداكن والعودي في المساء مع خيوط الزري الحر المذهبة.',
        en: 'For centuries, the Arabian Bisht has signified nobility, ceremony, and statecraft. Selecting the appropriate weight of wool and shade—from cream and camel for daytime protocol to obsidian black and deep navy for evening galas—ensures impeccable presence.',
      },
      category: {
        ar: 'التراث الملكي',
        en: 'Royal Heritage',
      },
      readTime: {
        ar: '5 دقائق للقراءة',
        en: '5 Min Read',
      },
      publishedAt: '2026-10-01',
      image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=1200&q=85',
    },
  ],
  offers: [
    {
      id: 'off-1',
      title: {
        ar: 'باقة العريس الملكية المتكاملة',
        en: 'The Sovereign Groom Ceremonial Package',
      },
      subtitle: {
        ar: 'بشت مراسم ملكي زري حر + بدلة توكسيدو أو سترة سهرة مفصلة + قميص حريري خاص',
        en: 'Bespoke Tuxedo or Velvet Ensemble + Imperial Gold-Zari Bisht + Monogrammed Evening Shirt',
      },
      description: {
        ar: 'تجربة ملكية متكاملة لليلة العمر تشمل جلسات قياس خاصة، تطريز الاسم وتاريخ المناسبة داخل البطانة، وصندوق حفظ جلدي فاخر.',
        en: 'Complete bespoke curation for your wedding or gala, including private fittings, custom interior date embroidery, and a handcrafted presentation trunk.',
      },
      priceText: {
        ar: '24,900 ر.س بدلاً من 29,500 ر.س',
        en: '$6,600 USD (Private Bundle Privilege)',
      },
      validUntil: {
        ar: 'متاح لـ 10 حجوزات خاصة هذا الموسم',
        en: 'Limited to 10 Private Commissions This Season',
      },
      badge: {
        ar: 'امتياز حصري',
        en: 'Exclusive Privilege',
      },
      image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1200&q=85',
      active: true,
    },
  ],
  pages: {
    about: {
      title: {
        ar: 'عن دار KINGSMEN LINE',
        en: 'The House of KINGSMEN LINE',
      },
      subtitle: {
        ar: 'حيث تلتقي صرامة الخياطة الإنجليزية في سافيل رو مع هيبة التراث الملكي العربي',
        en: 'Where Savile Row Architectural Precision Meets Arabian Royal Heritage',
      },
      sections: [
        {
          heading: {
            ar: 'رؤيتنا وهويتنا',
            en: 'Our Heritage & Vision',
          },
          body: {
            ar: 'تأسست دار KINGSMEN LINE لتقدم مفهوماً غير مسبوق في عالم الأزياء الرجالية الفاخرة. نحن لا نبيع ملابس جاهزة، بل نصنع قطعاً فنية تُحاك خصيصاً لتعكس شخصية الرجل القيادي ووقاره في أهم لحظات حياته.',
            en: 'KINGSMEN LINE was founded on a singular conviction: true luxury is personal, architectural, and enduring. We do not mass-produce garments; we craft bespoke attire and ceremonial bishts tailored exclusively to the individual.',
          },
        },
        {
          heading: {
            ar: 'معايير لا تقبل المساومة',
            en: 'Uncompromising Standards',
          },
          body: {
            ar: 'من اختيار أندر أقمشة الصوف والكشمير والمخمل من أعرق المصانع في إنجلترا وإيطاليا، إلى حياكة البشوت الملكية بخيوط الزري الحر، تخضع كل قطعة لفحص دقيق يضمن الكمال في كل غرزة.',
            en: 'From sourcing rare cloths woven in Huddersfield and Biella to commissioning master zari artisans, every commission undergoes rigorous inspection before delivery.',
          },
        },
      ],
    },
    privacy: {
      title: {
        ar: 'سياسة الخصوصية والسرية',
        en: 'Privacy & Client Confidentiality Policy',
      },
      subtitle: {
        ar: 'خصوصية عملائنا وسرية قياساتهم ومواعيدهم هي ركيزة أساسية في دار كينغزمان لاين',
        en: 'Absolute Discretion for Our Private Clients',
      },
      sections: [
        {
          heading: {
            ar: 'حماية البيانات والخصوصية',
            en: 'Data Protection & Discretion',
          },
          body: {
            ar: 'نلتزم بالحفاظ على سرية كافة المعلومات الشخصية وسجلات القياسات الخاصة بعملائنا، ولا يتم مشاركتها مع أي طرف ثالث تحت أي ظرف. يتم التواصل المباشر حصرياً عبر قنوات الدار الرسمية.',
            en: 'All personal client profiles, anatomical pattern archives, and private appointment details are held in strict confidence and never shared with third parties.',
          },
        },
      ],
    },
    terms: {
      title: {
        ar: 'الشروط والأحكام',
        en: 'Terms & Bespoke Commission Conditions',
      },
      subtitle: {
        ar: 'ضوابط التفصيل الخاص وحجز المواعيد في دار KINGSMEN LINE',
        en: 'Guidelines for Private Commissions & Appointments',
      },
      sections: [
        {
          heading: {
            ar: 'طلبات التفصيل حسب القياس',
            en: 'Bespoke Orders & Fittings',
          },
          body: {
            ar: 'نظراً لأن كل قطعة يتم قصها وحياكتها خصيصاً حسب قياسات العميل واختياراته من الأقمشة، يبدأ العمل فور تأكيد الطلب وجلسة القياس الأولى، مع ضمان إجراء كافة التعديلات اللازمة خلال جلسات البروفة للوصول إلى القياس المثالي.',
            en: 'Because every bespoke garment is individually cut from cloth selected for the client, commissions include dedicated fitting sessions to guarantee an impeccable final fit.',
          },
        },
      ],
    },
  },
  updatedAt: new Date().toISOString(),
};
