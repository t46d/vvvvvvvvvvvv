'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Heart, Mail, Lock, User, Calendar, MapPin, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { signUp, loading } = useAuth();
  
  const [step, setStep] = useState(1); // خطوة التسجيل (1 أو 2)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    age: '',
    gender: '',
    location: '',
    bio: '',
    interests: [],
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleInterestToggle = (interest) => {
    const currentInterests = formData.interests;
    if (currentInterests.includes(interest)) {
      setFormData({
        ...formData,
        interests: currentInterests.filter(i => i !== interest),
      });
    } else {
      setFormData({
        ...formData,
        interests: [...currentInterests, interest],
      });
    }
  };

  const validateStep1 = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.name) {
      setError('الرجاء ملء جميع الحقول المطلوبة');
      return false;
    }

    if (formData.password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('البريد الإلكتروني غير صالح');
      return false;
    }

    return true;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // التحقق من الخطوة الثانية
    if (!formData.age || !formData.gender) {
      setError('الرجاء إكمال المعلومات الأساسية');
      setIsSubmitting(false);
      return;
    }

    if (formData.age < 18 || formData.age > 100) {
      setError('العمر يجب أن يكون بين 18 و 100');
      setIsSubmitting(false);
      return;
    }

    // محاولة التسجيل
    const { error: signUpError } = await signUp(
      formData.email,
      formData.password,
      {
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        location: formData.location,
        bio: formData.bio,
        interests: formData.interests,
      }
    );

    if (signUpError) {
      setError(signUpError);
      setIsSubmitting(false);
    } else {
      router.push('/dashboard');
    }
  };

  const interestOptions = [
    '🎵 الموسيقى',
    '⚽ الرياضة',
    '📚 القراءة',
    '🎬 الأفلام',
    '🎮 الألعاب',
    '✈️ السفر',
    '🍳 الطبخ',
    '🎨 الفن',
    '💻 التقنية',
    '📷 التصوير',
    '🧘 اليوغا',
    '🎭 المسرح',
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-2xl">
        {/* Logo & Header */}
        <div className="text-center mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <Heart className="w-10 h-10 text-primary-600 fill-primary-600" />
            <span className="text-3xl font-bold text-gray-900">VeXa</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            إنشاء حساب جديد
          </h1>
          <p className="text-gray-600">
            انضم إلينا واكتشف أشخاص جدد
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 1 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              {step > 1 ? <CheckCircle className="w-6 h-6" /> : '1'}
            </div>
            <div className={`w-20 h-1 ${step >= 2 ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              step >= 2 ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="card animate-slide-up">
          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNextStep(); } : handleSubmit}>
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2 mb-5">
                <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            {/* Step 1: Account Info */}
            {step === 1 && (
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-gray-900 mb-4">معلومات الحساب</h3>
                
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل *
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="أدخل اسمك"
                      className="input-field pr-10"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    البريد الإلكتروني *
                  </label>
                  <div className="relative">
                    <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className="input-field pr-10"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    كلمة المرور *
                  </label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="6 أحرف على الأقل"
                      className="input-field pr-10 pl-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    تأكيد كلمة المرور *
                  </label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="أعد كتابة كلمة المرور"
                      className="input-field pr-10 pl-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <button type="submit" className="btn-primary w-full text-lg">
                  التالي ←
                </button>
              </div>
            )}

            {/* Step 2: Profile Info */}
            {step === 2 && (
              <div className="space-y-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">المعلومات الشخصية</h3>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    → العودة
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {/* Age */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      العمر *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="18"
                        min="18"
                        max="100"
                        className="input-field pr-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      الجنس *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="">اختر</option>
                      <option value="male">ذكر</option>
                      <option value="female">أنثى</option>
                      <option value="other">آخر</option>
                    </select>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    الموقع (اختياري)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="مثال: الرياض، السعودية"
                      className="input-field pr-10"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    نبذة عنك (اختياري)
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="أخبرنا عن نفسك..."
                    rows="3"
                    className="input-field resize-none"
                    maxLength="200"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.bio.length}/200 حرف
                  </p>
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    الاهتمامات (اختر على الأقل 3)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {interestOptions.map((interest) => (
                      <button
                        key={interest}
                        type="button"
                        onClick={() => handleInterestToggle(interest)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          formData.interests.includes(interest)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full text-lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>جاري إنشاء الحساب...</span>
                    </div>
                  ) : (
                    'إنشاء الحساب'
                  )}
                </button>
              </div>
            )}
          </form>

          {/* Sign In Link */}
          {step === 1 && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">أو</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600">
                  لديك حساب بالفعل؟{' '}
                  <Link
                    href="/auth/login"
                    className="text-primary-600 hover:text-primary-700 font-medium"
                  >
                    تسجيل الدخول
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            ← العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}