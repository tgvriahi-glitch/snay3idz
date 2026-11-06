import { CraftCategory } from '../types';

export const CRAFT_CATEGORIES: CraftCategory[] = [
  {
    id: 'plumbing',
    nameAr: 'ترصيص صحي وسباكة',
    nameFr: 'Plomberie & Chauffage',
    iconName: 'Wrench',
    description: 'إصلاح تسريبات المياه، تركيب سخانات الماء، شبكات الصرف والغاز، والتدفئة المركزية.',
    popularJobs: ['تصليح تسريب ماء', 'تركيب سخان مياه Chauffe-bain', 'تسليك مجاري', 'صيانة شوفاج سنترال'],
    bannerColor: 'from-blue-600 to-cyan-700'
  },
  {
    id: 'electricity',
    nameAr: 'كهرباء منازل وصناعية',
    nameFr: 'Électricité Générale',
    iconName: 'Zap',
    description: 'تمديدات كهربائية، إصلاح قواطع الكهرباء Disjoncteur، تركيب إنارة LED، ولوحات التوزيع.',
    popularJobs: ['انقطاع التيار الكهربائي Court-circuit', 'تركيب تابلو كهرباء', 'إضافة مآخذ Prises', 'إضاءة مخفية'],
    bannerColor: 'from-amber-600 to-yellow-600'
  },
  {
    id: 'hvac',
    nameAr: 'تبريد وتكييف هواء',
    nameFr: 'Climatisation & Froid',
    iconName: 'Fan',
    description: 'تركيب وصيانة مكيفات الهواء Climatiseur، شحن الغاز Fréon، تنظيف الفلاتر وتصليح الثلاجات وغرف التبريد.',
    popularJobs: ['تركيب كليماتيزور', 'شحن غاز R410/R22', 'تنظيف وتعقيم المكيف', 'صيانة فريجيدار'],
    bannerColor: 'from-teal-600 to-emerald-700'
  },
  {
    id: 'painting',
    nameAr: 'صباغة وديكور وبلاكو BA13',
    nameFr: 'Peinture & Décoration BA13',
    iconName: 'Paintbrush',
    description: 'صباغة جدران داخلية وخارجية، تركيب أسقف مستعارة Faux Plafond، ديكورات جبس وبلاكو بلاتر.',
    popularJobs: ['صباغة غرف وشقق', 'ديكور بلاكو بلاتر BA13', 'دهان واجهات', 'معالجة الرطوبة والتشققات'],
    bannerColor: 'from-rose-600 to-pink-700'
  },
  {
    id: 'masonry',
    nameAr: 'بناء ولياسة وسيراميك',
    nameFr: 'Maçonnerie & Carrelage',
    iconName: 'Hammer',
    description: 'أعمال البناء والترميم، تركيب الفايونس والدال دوسول، صب الخرسانة وتعديل التقسيمات الداخلية.',
    popularJobs: ['تركيب فايونس حمام ومطبخ', 'بناء جدران وترميم', 'دال دوسول وبورسلان', 'تعديل ديكور داخلي'],
    bannerColor: 'from-stone-700 to-neutral-800'
  },
  {
    id: 'carpentry',
    nameAr: 'نجارة خشب وألمنيوم وPVC',
    nameFr: 'Menuiserie Bois & Alu & PVC',
    iconName: 'Layers',
    description: 'تفصيل وتركيب أبواب ونوافذ ألمنيوم وPVC، مطابخ عصرية، خزائن حائط ودواليب Dressing.',
    popularJobs: ['تركيب نوافذ ألمنيوم ودوبل فيتراج', 'تفصيل خزانة مطبخ', 'إصلاح أبواب خشبية', 'ستائر رول رولوا Rideau'],
    bannerColor: 'from-amber-800 to-orange-900'
  },
  {
    id: 'locksmith',
    nameAr: 'حدادة وأقفال وأبواب مدرعة',
    nameFr: 'Serrurerie & Ferronnerie',
    iconName: 'Key',
    description: 'فتح أبواب مغلقة، تغيير الكالونات والأقفال، تفصيل شبابيك حماية وأبواب حديد وكراجات أوتماتيكية.',
    popularJobs: ['فتح باب مغلق ومفتاح ضائع', 'تغيير كالون Serrure', 'شباك حماية حديدي', 'أبواب Rideau métallique'],
    bannerColor: 'from-slate-700 to-zinc-900'
  },
  {
    id: 'appliances',
    nameAr: 'تصليح الأجهزة الكهرومنزلية',
    nameFr: 'Réparation Électroménager',
    iconName: 'Cpu',
    description: 'صيانة غسالات الملابس Machine à laver، غسالات الأطباق، أفران وميكروويف، وثلاجات منزلية.',
    popularJobs: ['تصليح ماشينة لافي', 'إصلاح فرن كهربائي وغاز', 'تسريب مياه الغسالة', 'عطل كارت إلكتروني Carte mère'],
    bannerColor: 'from-indigo-600 to-violet-700'
  },
  {
    id: 'mechanic',
    nameAr: 'ميكانيك وتصليح سيارات مستعجل',
    nameFr: 'Mécanique & Dépannage Auto',
    iconName: 'Car',
    description: 'ميكانيك سيارات متنقل، ديباناج وسحب سيارات، شحن وتغيير بطاريات، وتصليح أعطال الطريق.',
    popularJobs: ['ديباناج سيارة معطلة', 'تغيير بطارية في مكانك', 'سكانير وتشخيص أعطال', 'تبديل عجلات وبلاكات فرامل'],
    bannerColor: 'from-red-600 to-amber-700'
  },
  {
    id: 'cleaning',
    nameAr: 'تنظيف مباني وبستنة',
    nameFr: 'Nettoyage & Jardinage',
    iconName: 'Sparkles',
    description: 'تنظيف منازل بعد أشغال البناء، تنظيف واجهات زجاجية، بستنة وتهيئة الحدائق المنزلية.',
    popularJobs: ['تنظيف بعد البناء Fin de chantier', 'تنظيف صالونات وموكيت', 'تقليم أشجار وتنسيق حديقة'],
    bannerColor: 'from-emerald-600 to-green-700'
  }
];
