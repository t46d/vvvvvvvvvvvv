'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { useChat } from '@/hooks/useChat';
import { getUserById } from '@/lib/supabase';
import { Heart, ArrowRight, Send, User, MoreVertical } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

export default function ChatPage() {
  const router = useRouter();
  const params = useParams();
  const receiverId = params.id;
  
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { messages, loading, sending, sendMessage } = useChat(receiverId);
  
  const [otherUser, setOtherUser] = useState(null);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef(null);

  // جلب بيانات المستخدم الآخر
  useEffect(() => {
    const fetchOtherUser = async () => {
      if (receiverId) {
        const { data } = await getUserById(receiverId);
        setOtherUser(data);
      }
    };
    fetchOtherUser();
  }, [receiverId]);

  // التمرير للأسفل عند تحميل الرسائل أو إضافة رسالة جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // التحقق من تسجيل الدخول
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/auth/login');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!messageText.trim()) return;

    const { success } = await sendMessage(messageText);
    
    if (success) {
      setMessageText('');
    }
  };

  const formatMessageTime = (timestamp) => {
    try {
      return formatDistanceToNow(new Date(timestamp), {
        addSuffix: true,
        locale: ar,
      });
    } catch (error) {
      return 'الآن';
    }
  };

  if (authLoading || !isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Chat Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="text-gray-700 hover:text-gray-900"
              >
                <ArrowRight className="w-6 h-6" />
              </button>

              {otherUser ? (
                <Link
                  href={`/profile/${otherUser.id}`}
                  className="flex items-center gap-3"
                >
                  <div className="relative">
                    {otherUser.avatar_url ? (
                      <img
                        src={otherUser.avatar_url}
                        alt={otherUser.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                        <User className="w-6 h-6 text-primary-600" />
                      </div>
                    )}
                    <div className="online-indicator"></div>
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{otherUser.name}</h2>
                    <p className="text-sm text-green-600">متصل الآن</p>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Heart className="w-6 h-6 text-gray-700 hover:text-primary-600 transition-colors" />
              </Link>
              <button className="text-gray-700 hover:text-gray-900">
                <MoreVertical className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto chat-container bg-gray-50">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ابدأ المحادثة!
                </h3>
                <p className="text-gray-600">
                  أرسل أول رسالة وابدأ بالتعرف على {otherUser?.name}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const isOwn = message.sender_id === user?.id;
                return (
                  <div
                    key={message.id}
                    className={`flex ${isOwn ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
                      <div className={`message-bubble ${isOwn ? 'message-sent' : 'message-received'}`}>
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {message.content}
                        </p>
                      </div>
                      <span className="text-xs text-gray-500 mt-1 px-2">
                        {formatMessageTime(message.created_at)}
                      </span>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 sticky bottom-0">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <form onSubmit={handleSendMessage} className="flex items-end gap-3">
            <div className="flex-1">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(e);
                  }
                }}
                placeholder="اكتب رسالتك هنا..."
                rows="1"
                className="input-field resize-none min-h-[44px] max-h-32"
                disabled={sending}
              />
            </div>
            <button
              type="submit"
              disabled={sending || !messageText.trim()}
              className="btn-primary px-4 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Send className="w-6 h-6" />
              )}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            اضغط Enter للإرسال، Shift+Enter لسطر جديد
          </p>
        </div>
      </div>
    </div>
  );
}