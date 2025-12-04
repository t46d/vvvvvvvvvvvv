import { useState, useEffect } from 'react';
import { Heart, Video, MessageCircle, Shield, Sparkles, Globe, ChevronRight, Play, Users, Lock, Phone, Zap, Star, TrendingUp } from 'lucide-react';

export default function ModernHomePage() {
  const [language, setLanguage] = useState('en');
  const [activeFeature, setActiveFeature] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const translations = {
    en: {
      hero: "Meet Your Perfect Match",
      subHero: "Experience next-generation dating with AI-powered matching, live video calls, and complete privacy",
      cta: "Start Free Today",
      watch: "Watch Demo",
      trust: "Trusted by 2M+ users worldwide",
      features: "Revolutionary Features",
      videoTitle: "Live Video Dating",
      videoDesc: "Connect face-to-face instantly with HD video calls",
      voiceTitle: "Voice Calls",
      voiceDesc: "Have meaningful conversations with crystal clear audio",
      chatTitle: "Smart Messaging",
      chatDesc: "AI-enhanced chat with real-time translation",
      privacyTitle: "Military-Grade Privacy",
      privacyDesc: "Your data is encrypted and completely secure",
      matchTitle: "AI Matching",
      matchDesc: "Advanced algorithm finds your perfect match",
      datingTitle: "Safe Dating",
      datingDesc: "Verified profiles and safety tools built-in",
    },
    ar: {
      hero: "اعثر على شريك حياتك المثالي",
      subHero: "جرب الجيل القادم من التعارف مع المطابقة بالذكاء الاصطناعي ومكالمات الفيديو المباشرة والخصوصية الكاملة",
      cta: "ابدأ مجاناً اليوم",
      watch: "شاهد العرض التوضيحي",
      trust: "موثوق من قبل أكثر من 2 مليون مستخدم حول العالم",
      features: "ميزات ثورية",
      videoTitle: "مواعدة بالفيديو المباشر",
      videoDesc: "تواصل وجهاً لوجه فوراً بمكالمات فيديو عالية الدقة",
      voiceTitle: "مكالمات صوتية",
      voiceDesc: "أجرِ محادثات ذات معنى بصوت واضح تماماً",
      chatTitle: "مراسلة ذكية",
      chatDesc: "دردشة محسّنة بالذكاء الاصطناعي مع ترجمة فورية",
      privacyTitle: "خصوصية عسكرية",
      privacyDesc: "بياناتك مشفرة وآمنة تماماً",
      matchTitle: "مطابقة بالذكاء الاصطناعي",
      matchDesc: "خوارزمية متقدمة تجد لك التطابق المثالي",
      datingTitle: "مواعدة آمنة",
      datingDesc: "ملفات تعريف موثقة وأدوات أمان مدمجة",
    }
  };

  const t = translations[language];
  const isRTL = language === 'ar';

  const features = [
    { 
      icon: Video, 
      title: t.videoTitle,
      desc: t.videoDesc,
      gradient: "from-purple-500 to-pink-500",
      image: "🎥"
    },
    { 
      icon: Phone, 
      title: t.voiceTitle,
      desc: t.voiceDesc,
      gradient: "from-blue-500 to-cyan-500",
      image: "🎤"
    },
    { 
      icon: MessageCircle, 
      title: t.chatTitle,
      desc: t.chatDesc,
      gradient: "from-green-500 to-emerald-500",
      image: "💬"
    },
    { 
      icon: Shield, 
      title: t.privacyTitle,
      desc: t.privacyDesc,
      gradient: "from-orange-500 to-red-500",
      image: "🔒"
    },
    { 
      icon: Sparkles, 
      title: t.matchTitle,
      desc: t.matchDesc,
      gradient: "from-violet-500 to-purple-500",
      image: "✨"
    },
    { 
      icon: Lock, 
      title: t.datingTitle,
      desc: t.datingDesc,
      gradient: "from-pink-500 to-rose-500",
      image: "💝"
    },
  ];

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-900/80 backdrop-blur-lg shadow-lg' : ''}`}>
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-pink-500 fill-pink-500 animate-pulse" />
                <Sparkles className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
                  VeXa
                </h1>
                <p className="text-[10px] sm:text-xs text-gray-400">chat.world</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline text-sm">{language === 'en' ? '🇺🇸 EN' : '🇸🇦 AR'}</span>
              </button>

              {/* CTA Buttons */}
              <button className="px-4 py-2 text-sm font-medium hover:text-pink-400 transition-colors hidden md:inline">
                Login
              </button>
              <button className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-semibold hover:shadow-lg hover:shadow-pink-500/50 transition-all text-sm sm:text-base">
                Sign Up Free
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-6 sm:space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                <TrendingUp className="w-4 h-4 text-pink-400" />
                <span className="text-sm font-medium">#1 Dating App 2024</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight">
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 bg-clip-text text-transparent animate-gradient">
                  {t.hero}
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                {t.subHero}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="group px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-pink-500/50 transform hover:scale-105 transition-all flex items-center justify-center gap-2">
                  {t.cta}
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/20">
                  <Play className="w-5 h-5" />
                  {t.watch}
                </button>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 justify-center lg:justify-start pt-4">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 border-2 border-slate-900 flex items-center justify-center text-xl">
                      {['😊','🥰','😍','🤩','💝'][i-1]}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                  </div>
                  <p className="text-gray-400">{t.trust}</p>
                </div>
              </div>
            </div>

            {/* Right Content - 3D Card */}
            <div className="relative hidden lg:block">
              <div className="relative transform hover:scale-105 transition-transform duration-500">
                {/* Floating Cards */}
                <div className="absolute -top-10 -left-10 w-48 h-64 bg-gradient-to-br from-pink-500 to-purple-600 rounded-3xl shadow-2xl transform rotate-6 opacity-80 hover:rotate-12 transition-transform"></div>
                <div className="absolute -bottom-10 -right-10 w-48 h-64 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-3xl shadow-2xl transform -rotate-6 opacity-80 hover:-rotate-12 transition-transform"></div>
                
                {/* Main Card */}
                <div className="relative w-80 h-96 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl shadow-2xl border border-white/10 p-6 backdrop-blur-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-600/20 rounded-3xl"></div>
                  <div className="relative h-full flex flex-col justify-between">
                    <div className="text-center space-y-4">
                      <div className="w-32 h-32 mx-auto bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center text-6xl">
                        💕
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Sarah, 24</h3>
                        <p className="text-sm text-gray-400">📍 2 km away</p>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-center">
                        {['🎵 Music', '✈️ Travel', '📚 Books'].map(tag => (
                          <span key={tag} className="px-3 py-1 bg-white/10 rounded-full text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 py-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
                        ❌
                      </button>
                      <button className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl hover:shadow-lg transition-all">
                        ❤️
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div className="container mx-auto max-w-6xl">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 mb-6">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="text-sm font-medium">Next-Gen Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black mb-4">
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {t.features}
              </span>
            </h2>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group relative p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/30 transition-all hover:scale-105 cursor-pointer"
                onMouseEnter={() => setActiveFeature(idx)}
              >
                {/* Gradient Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity`}></div>
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-4 text-3xl group-hover:scale-110 transition-transform`}>
                    {feature.image}
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2 group-hover:text-pink-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="relative p-12 bg-gradient-to-br from-pink-600 to-purple-700 rounded-3xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px'}}></div>
            </div>
            
            <div className="relative text-center space-y-6">
              <h2 className="text-3xl sm:text-5xl font-black">
                Ready to Find Love?
              </h2>
              <p className="text-xl text-pink-100 max-w-2xl mx-auto">
                Join 2 million users who found their perfect match on VeXa
              </p>
              <button className="px-10 py-5 bg-white text-purple-600 rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all">
                Start Your Journey Free →
              </button>
              <p className="text-sm text-pink-200">
                ✨ No credit card required • 🔒 100% Private & Secure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="container mx-auto text-center text-gray-400">
          <p className="mb-4">© 2024 VeXa Chat World. All rights reserved.</p>
          <p className="text-sm">vexachat.world</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}