'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { Heart, MessageCircle, Users, Sparkles } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuth();
  const { t } = useLanguage();

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
      {/* Header - Responsive */}
      <header className="container mx-auto px-4 py-4 sm:py-6">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-primary-600 fill-primary-600" />
            <span className="text-xl sm:text-2xl font-bold text-gray-900">{t('appName')}</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSwitcher />
            <Link href="/auth/login">
              <button className="btn-secondary">{t('login')}</button>
            </Link>
            <Link href="/auth/signup">
              <button className="btn-primary">{t('signup')}</button>
            </Link>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center gap-2">
            <LanguageSwitcher />
            <Link href="/auth/login">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600">
                {t('login')}
              </button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section - Responsive */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20 text-center">
        <div className="max-w-3xl mx-auto animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary-100 text-primary-700 px-3 py-2 sm:px-4 rounded-full mb-4 sm:mb-6">
            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">Join thousands today</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            {t('tagline').split(' ').slice(0, 3).join(' ')}
            <br />
            <span className="gradient-primary bg-clip-text text-transparent">
              {t('tagline').split(' ').slice(3).join(' ')}
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 leading-relaxed px-4">
            {t('description')}
          </p>
          
          {/* CTA Buttons - Responsive */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link href="/auth/signup" className="w-full sm:w-auto">
              <button className="btn-primary w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                {t('getStarted')}
              </button>
            </Link>
            <Link href="#features" className="w-full sm:w-auto">
              <button className="btn-secondary w-full sm:w-auto text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
                {t('learnMore')}
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section - Responsive Grid */}
      <section id="features" className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            {t('whyVexa')}
          </h2>
          <p className="text-lg sm:text-xl text-gray-600">
            {t('featuresDescription')}
          </p>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Feature 1 */}
          <div className="card text-center animate-slide-up hover:scale-105 transition-transform">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
              {t('feature1Title')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t('feature1Desc')}
            </p>
          </div>

          {/* Feature 2 */}
          <div className="card text-center animate-slide-up hover:scale-105 transition-transform" style={{ animationDelay: '0.1s' }}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
              {t('feature2Title')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t('feature2Desc')}
            </p>
          </div>

          {/* Feature 3 */}
          <div className="card text-center animate-slide-up hover:scale-105 transition-transform sm:col-span-2 lg:col-span-1" style={{ animationDelay: '0.2s' }}>
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-7 h-7 sm:w-8 sm:h-8 text-primary-600" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">
              {t('feature3Title')}
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              {t('feature3Desc')}
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section - Responsive */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="card max-w-4xl mx-auto text-center gradient-primary text-white">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Ready to start?
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 opacity-90">
            Join now and discover a new world of connections
          </p>
          <Link href="/auth/signup">
            <button className="bg-white text-primary-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:scale-105 transition-transform w-full sm:w-auto">
              {t('createAccount')}
            </button>
          </Link>
        </div>
      </section>

      {/* Footer - Responsive */}
      <footer className="border-t border-gray-200 py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p className="text-sm sm:text-base mb-2">© 2024 VeXa. All rights reserved.</p>
          <p className="text-xs sm:text-sm">Made with ❤️ for global connections</p>
          <div className="mt-4 flex justify-center gap-4 text-xs sm:text-sm">
            <Link href="/privacy" className="hover:text-primary-600">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary-600">Terms of Service</Link>
            <Link href="/contact" className="hover:text-primary-600">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}