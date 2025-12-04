'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  getMessages,
  sendMessage as sendMsg,
  markMessagesAsRead,
  subscribeToMessages,
  unsubscribeFromMessages,
} from '@/lib/supabase';
import { useAuth } from './useAuth';

export const useChat = (receiverId) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

  // جلب الرسائل
  const fetchMessages = useCallback(async () => {
    if (!user || !receiverId) return;

    try {
      setLoading(true);
      const { data, error: fetchError } = await getMessages(user.id, receiverId);

      if (fetchError) throw new Error(fetchError);

      setMessages(data || []);
      
      // تحديد الرسائل كمقروءة
      await markMessagesAsRead(receiverId, user.id);
    } catch (err) {
      console.error('خطأ في جلب الرسائل:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user, receiverId]);

  // إرسال رسالة
  const sendMessage = async (content) => {
    if (!user || !receiverId || !content.trim()) return;

    try {
      setSending(true);
      setError(null);

      const { data, error: sendError } = await sendMsg(user.id, receiverId, content.trim());

      if (sendError) throw new Error(sendError);

      // إضافة الرسالة إلى القائمة
      setMessages((prev) => [...prev, data]);

      return { success: true };
    } catch (err) {
      console.error('خطأ في إرسال الرسالة:', err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setSending(false);
    }
  };

  // الاستماع للرسائل الجديدة (Realtime)
  useEffect(() => {
    if (!user) return;

    let channel;

    const setupRealtimeSubscription = async () => {
      channel = subscribeToMessages(user.id, (newMessage) => {
        // إضافة الرسالة الجديدة فقط إذا كانت من المستلم الحالي
        if (newMessage.sender_id === receiverId) {
          setMessages((prev) => [...prev, newMessage]);
          
          // تحديد كمقروءة تلقائياً
          markMessagesAsRead(receiverId, user.id);
        }
      });
    };

    setupRealtimeSubscription();

    return () => {
      if (channel) {
        unsubscribeFromMessages(channel);
      }
    };
  }, [user, receiverId]);

  // جلب الرسائل عند التحميل
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  return {
    messages,
    loading,
    sending,
    error,
    sendMessage,
    refreshMessages: fetchMessages,
  };
};