'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Heart, MessageCircle, Users, Sparkles } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();

  // إذا كان المستخدم مسجل الدخول، انتقل إلى لوحة التحكم
  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-8 h-8 text-primary-600 fill-primary-600" />
            <span className="text-2xl font-bold text-gray-900">VeXa</span>
          </div>
          
          <div className="flex gap-3">
            <Link href="/auth/login">
              <button className="btn-secondary">تسجيل الدخول</button>
            </Link>
            <Link href="/auth/signup">
              <button className="btn-primary">إنشاء حساب</button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">انضم لآلاف المستخدمين اليوم</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            تواصل مع أشخاص
            <br />
            <span className="gradient-primary bg-clip-text text-transparent">
              يشاركونك الاهتمامات
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            منصة حديثة للتعارف والدردشة، حيث يمكنك اكتشاف صداقات جديدة
            <br />
            والتواصل مع أشخاص مميزين من حول العالم
          </p>
          
          <div className="flex gap-4 justify-center">
            <Link href="/auth/signup">
              <button className="btn-primary text-lg px-8 py-4">
                ابدأ الآن مجاناً
              </button>
            </Link>
            <Link href="#features">
              <button className="btn-secondary text-lg px-8 py-4">
                اكتشف المزيد
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            لماذا VeXa؟
          </h2>
          <p className="text-xl text-gray-600">
            نوفر لك أفضل تجربة للتعارف والتواصل
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="card text-center animate-slide-up hover:scale-105 transition-transform">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              تطابقات ذكية
            </h3>
            <p className="text-gray-600 leading-relaxed">
              خوارزمية متقدمة لإيجاد أشخاص يشاركونك نفس الاهتمامات والهوايات
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card text-center animate-slide-up hover:scale-105 transition-transform" style={{ animationDelay: '0.1s' }}>
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              دردشة فورية
            </h3>
            <p className="text-gray-600 leading-relaxed">
              تواصل مباشرة مع الأشخاص الذين تهتم بهم عبر الدردشة الفورية
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card text-center animate-slide-up hover:scale-105 transition-transform" style={{ animationDelay: '0.2s' }}>
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">
              مجتمع نشط
            </h3>
            <p className="text-gray-600 leading-relaxed">
              انضم لمجتمع متنوع من الأشخاص المميزين من مختلف البلدان
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="card max-w-4xl mx-auto text-center gradient-primary text-white">
          <h2 className="text-4xl font-bold mb-6">
            جاهز للبدء؟
          </h2>
          <p className="text-xl mb-8 opacity-90">
            انضم الآن واكتشف عالماً جديداً من التواصل والصداقات
          </p>
          <Link href="/auth/signup">
            <button className="bg-white text-primary-600 px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform">
              أنشئ حسابك المجاني
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="mb-2">© 2024 VeXa. جميع الحقوق محفوظة.</p>
          <p className="text-sm">صُنع بـ ❤️ للتواصل والتعارف</p>
        </div>
      </footer>
    </div>
  );
}