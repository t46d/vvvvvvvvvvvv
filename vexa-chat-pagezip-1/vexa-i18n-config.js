// src/lib/i18n.js
// نظام اللغات المتعدد - يدعم العربية والإنجليزية والمزيد

export const languages = [
  { code: 'ar', name: 'العربية', dir: 'rtl', flag: '🇸🇦' },
  { code: 'en', name: 'English', dir: 'ltr', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', dir: 'ltr', flag: '🇫🇷' },
  { code: 'es', name: 'Español', dir: 'ltr', flag: '🇪🇸' },
  { code: 'de', name: 'Deutsch', dir: 'ltr', flag: '🇩🇪' },
];

export const defaultLanguage = 'en';

// الترجمات - يمكن تخزينها في ملفات JSON منفصلة
export const translations = {
  ar: {
    // الصفحة الرئيسية
    appName: 'VeXa',
    tagline: 'تواصل مع أشخاص يشاركونك الاهتمامات',
    description: 'منصة حديثة للتعارف والدردشة، حيث يمكنك اكتشاف صداقات جديدة والتواصل مع أشخاص مميزين من حول العالم',
    getStarted: 'ابدأ الآن مجاناً',
    learnMore: 'اكتشف المزيد',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    
    // المميزات
    whyVexa: 'لماذا VeXa؟',
    featuresDescription: 'نوفر لك أفضل تجربة للتعارف والتواصل',
    feature1Title: 'تطابقات ذكية',
    feature1Desc: 'خوارزمية متقدمة لإيجاد أشخاص يشاركونك نفس الاهتمامات والهوايات',
    feature2Title: 'دردشة فورية',
    feature2Desc: 'تواصل مباشرة مع الأشخاص الذين تهتم بهم عبر الدردشة الفورية',
    feature3Title: 'مجتمع نشط',
    feature3Desc: 'انضم لمجتمع متنوع من الأشخاص المميزين من مختلف البلدان',
    
    // تسجيل الدخول
    welcomeBack: 'مرحباً بعودتك',
    loginSubtitle: 'سجل دخولك للاستمرار في التواصل',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    loggingIn: 'جاري تسجيل الدخول...',
    noAccount: 'ليس لديك حساب؟',
    createAccount: 'إنشاء حساب جديد',
    
    // التسجيل
    createNewAccount: 'إنشاء حساب جديد',
    signupSubtitle: 'انضم إلينا واكتشف أشخاص جدد',
    fullName: 'الاسم الكامل',
    confirmPassword: 'تأكيد كلمة المرور',
    next: 'التالي',
    back: 'العودة',
    age: 'العمر',
    gender: 'الجنس',
    male: 'ذكر',
    female: 'أنثى',
    other: 'آخر',
    location: 'الموقع',
    bio: 'نبذة عنك',
    interests: 'الاهتمامات',
    creating: 'جاري إنشاء الحساب...',
    haveAccount: 'لديك حساب بالفعل؟',
    
    // لوحة التحكم
    welcomeUser: 'مرحباً',
    dashboardSubtitle: 'اكتشف أشخاص جدد وابدأ محادثات مميزة',
    filterResults: 'تصفية النتائج',
    usersAvailable: 'مستخدم متاح',
    yourMatches: 'تطابقاتك',
    viewAll: 'عرض الكل',
    noMatches: 'لا يوجد تطابقات بعد',
    startLiking: 'ابدأ بالإعجاب بالمستخدمين!',
    skip: 'تخطي',
    like: 'أعجبني',
    noMoreSuggestions: 'لا يوجد المزيد من الاقتراحات',
    checkLater: 'تحقق لاحقاً أو قم بتعديل الفلاتر للحصول على نتائج جديدة',
    refresh: 'تحديث الاقتراحات',
    
    // الدردشة
    startConversation: 'ابدأ المحادثة!',
    sendFirstMessage: 'أرسل أول رسالة وابدأ بالتعرف على',
    typeMessage: 'اكتب رسالتك هنا...',
    sending: 'جاري الإرسال...',
    onlineNow: 'متصل الآن',
    
    // عام
    logout: 'تسجيل الخروج',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    loading: 'جاري التحميل...',
    error: 'حدث خطأ',
    success: 'نجح',
    
    // أخطاء
    fillAllFields: 'الرجاء ملء جميع الحقول المطلوبة',
    invalidEmail: 'البريد الإلكتروني غير صالح',
    passwordTooShort: 'كلمة المرور يجب أن تكون 6 أحرف على الأقل',
    passwordsDontMatch: 'كلمتا المرور غير متطابقتين',
    invalidCredentials: 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
    ageOutOfRange: 'العمر يجب أن يكون بين 18 و 100',
  },
  
  en: {
    // Homepage
    appName: 'VeXa',
    tagline: 'Connect with people who share your interests',
    description: 'A modern platform for dating and chatting where you can discover new friendships and connect with amazing people from around the world',
    getStarted: 'Get Started Free',
    learnMore: 'Learn More',
    login: 'Login',
    signup: 'Sign Up',
    
    // Features
    whyVexa: 'Why VeXa?',
    featuresDescription: 'We provide you with the best dating and communication experience',
    feature1Title: 'Smart Matches',
    feature1Desc: 'Advanced algorithm to find people who share your interests and hobbies',
    feature2Title: 'Instant Chat',
    feature2Desc: 'Connect directly with people you care about through instant messaging',
    feature3Title: 'Active Community',
    feature3Desc: 'Join a diverse community of amazing people from different countries',
    
    // Login
    welcomeBack: 'Welcome Back',
    loginSubtitle: 'Log in to continue connecting',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot Password?',
    loggingIn: 'Logging in...',
    noAccount: "Don't have an account?",
    createAccount: 'Create Account',
    
    // Signup
    createNewAccount: 'Create New Account',
    signupSubtitle: 'Join us and discover new people',
    fullName: 'Full Name',
    confirmPassword: 'Confirm Password',
    next: 'Next',
    back: 'Back',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    location: 'Location',
    bio: 'Bio',
    interests: 'Interests',
    creating: 'Creating account...',
    haveAccount: 'Already have an account?',
    
    // Dashboard
    welcomeUser: 'Hello',
    dashboardSubtitle: 'Discover new people and start amazing conversations',
    filterResults: 'Filter Results',
    usersAvailable: 'users available',
    yourMatches: 'Your Matches',
    viewAll: 'View All',
    noMatches: 'No matches yet',
    startLiking: 'Start liking users!',
    skip: 'Skip',
    like: 'Like',
    noMoreSuggestions: 'No more suggestions',
    checkLater: 'Check back later or adjust filters for new results',
    refresh: 'Refresh Suggestions',
    
    // Chat
    startConversation: 'Start the conversation!',
    sendFirstMessage: 'Send your first message and get to know',
    typeMessage: 'Type your message here...',
    sending: 'Sending...',
    onlineNow: 'Online now',
    
    // General
    logout: 'Logout',
    profile: 'Profile',
    settings: 'Settings',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Errors
    fillAllFields: 'Please fill all required fields',
    invalidEmail: 'Invalid email address',
    passwordTooShort: 'Password must be at least 6 characters',
    passwordsDontMatch: 'Passwords do not match',
    invalidCredentials: 'Invalid email or password',
    ageOutOfRange: 'Age must be between 18 and 100',
  },
  
  fr: {
    appName: 'VeXa',
    tagline: 'Connectez-vous avec des personnes qui partagent vos intérêts',
    description: 'Une plateforme moderne pour les rencontres et le chat où vous pouvez découvrir de nouvelles amitiés',
    getStarted: 'Commencer gratuitement',
    learnMore: 'En savoir plus',
    login: 'Connexion',
    signup: "S'inscrire",
    welcomeBack: 'Bon retour',
    email: 'Email',
    password: 'Mot de passe',
    // ... أضف باقي الترجمات الفرنسية
  },
  
  es: {
    appName: 'VeXa',
    tagline: 'Conecta con personas que comparten tus intereses',
    description: 'Una plataforma moderna para citas y chat donde puedes descubrir nuevas amistades',
    getStarted: 'Comenzar gratis',
    learnMore: 'Saber más',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    // ... أضف باقي الترجمات الإسبانية
  },
  
  de: {
    appName: 'VeXa',
    tagline: 'Verbinde dich mit Menschen, die deine Interessen teilen',
    description: 'Eine moderne Plattform für Dating und Chat, wo du neue Freundschaften entdecken kannst',
    getStarted: 'Kostenlos starten',
    learnMore: 'Mehr erfahren',
    login: 'Anmelden',
    signup: 'Registrieren',
    // ... أضف باقي الترجمات الألمانية
  },
};

// دالة للحصول على الترجمة
export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations[defaultLanguage]?.[key] || key;
};

// دالة للحصول على اتجاه اللغة
export const getLanguageDir = (lang) => {
  const language = languages.find(l => l.code === lang);
  return language?.dir || 'ltr';
};

// دالة للحصول على اسم اللغة
export const getLanguageName = (lang) => {
  const language = languages.find(l => l.code === lang);
  return language?.name || 'English';
};