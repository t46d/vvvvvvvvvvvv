'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

// إنشاء Context للمصادقة
const AuthContext = createContext({});

// Hook للوصول إلى بيانات المصادقة
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth يجب استخدامه داخل AuthProvider');
  }
  return context;
};

// Provider للمصادقة
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب بيانات المستخدم عند التحميل
  useEffect(() => {
    checkUser();
    
    // الاستماع لتغييرات حالة المصادقة
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        const currentUser = session?.user ?? null;
        setUser(currentUser);
        
        if (currentUser) {
          await fetchProfile(currentUser.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  // التحقق من المستخدم الحالي
  const checkUser = async () => {
    try {
      const { data: { user: currentUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError) throw authError;
      
      setUser(currentUser);
      
      if (currentUser) {
        await fetchProfile(currentUser.id);
      }
    } catch (err) {
      console.error('خطأ في التحقق من المستخدم:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // جلب الملف الشخصي
  const fetchProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error('خطأ في جلب الملف الشخصي:', err);
    }
  };

  // تسجيل الدخول
  const signIn = async (email, password) => {
    try {
      setError(null);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      return { data, error: null };
    } catch (err) {
      console.error('خطأ في تسجيل الدخول:', err);
      setError(err.message);
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // التسجيل
  const signUp = async (email, password, userData) => {
    try {
      setError(null);
      setLoading(true);

      // إنشاء حساب المصادقة
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // إنشاء ملف المستخدم
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert([
            {
              id: authData.user.id,
              email,
              name: userData.name,
              age: userData.age,
              gender: userData.gender,
              bio: userData.bio || '',
              interests: userData.interests || [],
              location: userData.location || '',
            },
          ]);

        if (profileError) throw profileError;
      }

      return { data: authData, error: null };
    } catch (err) {
      console.error('خطأ في التسجيل:', err);
      setError(err.message);
      return { data: null, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الخروج
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
    } catch (err) {
      console.error('خطأ في تسجيل الخروج:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // تحديث الملف الشخصي
  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // تحديث الحالة المحلية
      setProfile({ ...profile, ...updates });
      
      return { error: null };
    } catch (err) {
      console.error('خطأ في تحديث الملف:', err);
      setError(err.message);
      return { error: err.message };
    } finally {
      setLoading(false);
    }
  };

  // رفع صورة الملف الشخصي
  const uploadAvatar = async (file) => {
    try {
      setLoading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // رفع الصورة
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // الحصول على URL العام
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      // تحديث الملف الشخصي
      await updateProfile({ avatar_url: publicUrl });

      return { url: publicUrl, error: null };
    } catch (err) {
      console.error('خطأ في رفع الصورة:', err);
      setError(err.message);
      return { url: null, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    profile,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile,
    uploadAvatar,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};