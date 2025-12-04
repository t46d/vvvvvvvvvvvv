'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useMatches } from '@/hooks/useMatches';
import { Heart, MessageCircle, X, LogOut, User, Settings, Search } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { user, profile, isAuthenticated, signOut, loading: authLoading } = useAuth();
  const { suggestions, matches, loading, likeUser, skipUser, refreshSuggestions } = useMatches();
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filters, setFilters] = useState({
    gender: '',
    minAge: '',
    maxAge: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleLike = async () => {
    if (currentIndex >= suggestions.length) return;
    
    const currentUser = suggestions[currentIndex];
    await likeUser(currentUser.id);
    setCurrentIndex(prev => prev + 1);
  };

  const handleSkip = () => {
    if (currentIndex >= suggestions.length) return;
    
    const currentUser = suggestions[currentIndex];
    skipUser(currentUser.id);
    setCurrentIndex(prev => prev + 1);
  };

  const handleApplyFilters = () => {
    refreshSuggestions(filters);
    setCurrentIndex(0);
    setShowFilters(false);
  };

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  if (authLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const currentSuggestion = suggestions[currentIndex];
  const hasMoreSuggestions = currentIndex < suggestions.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-primary-600 fill-primary-600" />
              <span className="text-2xl font-bold text-gray-900">VeXa</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                <Heart className="w-6 h-6" />
              </Link>
              <Link
                href="/dashboard/matches"
                className="text-gray-700 hover:text-primary-600 transition-colors relative"
              >
                <MessageCircle className="w-6 h-6" />
                {matches.length > 0 && (
                  <span className="notification-badge">{matches.length}</span>
                )}
              </Link>
              <Link
                href="/profile"
                className="text-gray-700 hover:text-primary-600 transition-colors"
              >
                <User className="w-6 h-6" />
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Welcome Message */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              مرحباً، {profile?.name || 'صديقنا'} 👋
            </h1>
            <p className="text-gray-600">اكتشف أشخاص جدد وابدأ محادثات مميزة</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Card Area */}
            <div className="lg:col-span-2">
              {/* Filters Button */}
              <div className="mb-4 flex justify-between items-center">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="btn-secondary flex items-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  <span>تصفية النتائج</span>
                </button>
                
                <span className="text-sm text-gray-600">
                  {suggestions.length} مستخدم متاح
                </span>
              </div>

              {/* Filters Panel */}
              {showFilters && (
                <div className="card mb-4 animate-slide-up">
                  <h3 className="font-bold text-lg mb-4">تصفية حسب:</h3>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الجنس
                      </label>
                      <select
                        value={filters.gender}
                        onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                        className="input-field"
                      >
                        <option value="">الكل</option>
                        <option value="male">ذكر</option>
                        <option value="female">أنثى</option>
                        <option value="other">آخر</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        العمر من
                      </label>
                      <input
                        type="number"
                        value={filters.minAge}
                        onChange={(e) => setFilters({ ...filters, minAge: e.target.value })}
                        placeholder="18"
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        العمر إلى
                      </label>
                      <input
                        type="number"
                        value={filters.maxAge}
                        onChange={(e) => setFilters({ ...filters, maxAge: e.target.value })}
                        placeholder="100"
                        className="input-field"
                      />
                    </div>
                  </div>
                  <button onClick={handleApplyFilters} className="btn-primary w-full">
                    تطبيق الفلتر
                  </button>
                </div>
              )}

              {/* User Card */}
              {loading ? (
                <div className="card flex items-center justify-center h-96">
                  <div className="loading-spinner"></div>
                </div>
              ) : hasMoreSuggestions && currentSuggestion ? (
                <div className="card relative overflow-hidden animate-scale">
                  {/* Profile Image */}
                  <div className="relative h-96 -mx-6 -mt-6 mb-6">
                    {currentSuggestion.avatar_url ? (
                      <img
                        src={currentSuggestion.avatar_url}
                        alt={currentSuggestion.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary-200 to-primary-400 flex items-center justify-center">
                        <User className="w-32 h-32 text-white" />
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 gradient-overlay p-6">
                      <h2 className="text-3xl font-bold text-white mb-1">
                        {currentSuggestion.name}, {currentSuggestion.age}
                      </h2>
                      {currentSuggestion.location && (
                        <p className="text-white/90">{currentSuggestion.location}</p>
                      )}
                    </div>
                  </div>

                  {/* Bio */}
                  {currentSuggestion.bio && (
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed">{currentSuggestion.bio}</p>
                    </div>
                  )}

                  {/* Interests */}
                  {currentSuggestion.interests && currentSuggestion.interests.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-gray-700 mb-2">الاهتمامات:</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentSuggestion.interests.map((interest, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4">
                    <button
                      onClick={handleSkip}
                      className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                    >
                      <X className="w-6 h-6" />
                      <span>تخطي</span>
                    </button>
                    <button
                      onClick={handleLike}
                      className="flex-1 bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Heart className="w-6 h-6" />
                      <span>أعجبني</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="card text-center py-16">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    لا يوجد المزيد من الاقتراحات
                  </h3>
                  <p className="text-gray-600 mb-6">
                    تحقق لاحقاً أو قم بتعديل الفلاتر للحصول على نتائج جديدة
                  </p>
                  <button
                    onClick={() => {
                      refreshSuggestions();
                      setCurrentIndex(0);
                    }}
                    className="btn-primary"
                  >
                    تحديث الاقتراحات
                  </button>
                </div>
              )}
            </div>

            {/* Sidebar - Matches */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900">تطابقاتك</h3>
                  <Link
                    href="/dashboard/matches"
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    عرض الكل
                  </Link>
                </div>

                {matches.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">
                      لا يوجد تطابقات بعد
                      <br />
                      ابدأ بالإعجاب بالمستخدمين!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {matches.slice(0, 5).map((match) => (
                      <Link
                        key={match.id}
                        href={`/chat/${match.otherUser.id}`}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="relative">
                          {match.otherUser.avatar_url ? (
                            <img
                              src={match.otherUser.avatar_url}
                              alt={match.otherUser.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                              <User className="w-6 h-6 text-primary-600" />
                            </div>
                          )}
                          <div className="online-indicator"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">
                            {match.otherUser.name}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {match.otherUser.age} سنة • {match.otherUser.location || 'غير محدد'}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}