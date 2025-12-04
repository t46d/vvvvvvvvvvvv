'use client';

import { useState, useEffect, useCallback } from 'react';
import { getMatches, addLike, getUsers } from '@/lib/supabase';
import { useAuth } from './useAuth';

export const useMatches = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // جلب التطابقات
  const fetchMatches = useCallback(async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error: fetchError } = await getMatches(user.id);

      if (fetchError) throw new Error(fetchError);

      setMatches(data || []);
    } catch (err) {
      console.error('خطأ في جلب التطابقات:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // جلب اقتراحات المستخدمين
  const fetchSuggestions = useCallback(async (filters = {}) => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error: fetchError } = await getUsers(filters);

      if (fetchError) throw new Error(fetchError);

      // تصفية المستخدم الحالي
      const filtered = data?.filter((u) => u.id !== user.id) || [];
      setSuggestions(filtered);
    } catch (err) {
      console.error('خطأ في جلب الاقتراحات:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // إضافة إعجاب
  const likeUser = async (likedUserId) => {
    if (!user) return;

    try {
      const { error: likeError } = await addLike(user.id, likedUserId);

      if (likeError) throw new Error(likeError);

      // إزالة المستخدم من الاقتراحات
      setSuggestions((prev) => prev.filter((u) => u.id !== likedUserId));

      // تحديث التطابقات
      await fetchMatches();

      return { success: true };
    } catch (err) {
      console.error('خطأ في الإعجاب:', err);
      setError(err.message);
      return { success: false, error: err.message };
    }
  };

  // تخطي مستخدم
  const skipUser = (userId) => {
    setSuggestions((prev) => prev.filter((u) => u.id !== userId));
  };

  useEffect(() => {
    if (user) {
      fetchMatches();
      fetchSuggestions();
    }
  }, [user, fetchMatches, fetchSuggestions]);

  return {
    matches,
    suggestions,
    loading,
    error,
    likeUser,
    skipUser,
    refreshMatches: fetchMatches,
    refreshSuggestions: fetchSuggestions,
  };
};