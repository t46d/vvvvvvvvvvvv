import { createClient } from '@supabase/supabase-js';

// التحقق من وجود متغيرات البيئة
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// إنشاء عميل Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

// دوال مساعدة للتعامل مع قاعدة البيانات

// جلب جميع المستخدمين
export const getUsers = async (filters = {}) => {
  try {
    let query = supabase.from('users').select('*');

    // تطبيق الفلاتر
    if (filters.gender) {
      query = query.eq('gender', filters.gender);
    }
    if (filters.minAge) {
      query = query.gte('age', filters.minAge);
    }
    if (filters.maxAge) {
      query = query.lte('age', filters.maxAge);
    }
    if (filters.location) {
      query = query.ilike('location', `%${filters.location}%`);
    }

    const { data, error } = await query.order('created_at', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('خطأ في جلب المستخدمين:', err);
    return { data: null, error: err.message };
  }
};

// جلب مستخدم محدد
export const getUserById = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('خطأ في جلب المستخدم:', err);
    return { data: null, error: err.message };
  }
};

// إرسال رسالة
export const sendMessage = async (senderId, receiverId, content) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .insert([
        {
          sender_id: senderId,
          receiver_id: receiverId,
          content,
          read: false,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('خطأ في إرسال الرسالة:', err);
    return { data: null, error: err.message };
  }
};

// جلب الرسائل بين مستخدمين
export const getMessages = async (userId1, userId2) => {
  try {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .or(
        `and(sender_id.eq.${userId1},receiver_id.eq.${userId2}),and(sender_id.eq.${userId2},receiver_id.eq.${userId1})`
      )
      .order('created_at', { ascending: true });

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('خطأ في جلب الرسائل:', err);
    return { data: null, error: err.message };
  }
};

// تحديد الرسائل كمقروءة
export const markMessagesAsRead = async (senderId, receiverId) => {
  try {
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('sender_id', senderId)
      .eq('receiver_id', receiverId)
      .eq('read', false);

    if (error) throw error;
    return { error: null };
  } catch (err) {
    console.error('خطأ في تحديث الرسائل:', err);
    return { error: err.message };
  }
};

// إضافة إعجاب
export const addLike = async (likerId, likedId) => {
  try {
    const { data, error } = await supabase
      .from('likes')
      .insert([
        {
          liker_id: likerId,
          liked_id: likedId,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // التحقق من وجود تطابق (إذا أعجب الطرف الآخر أيضاً)
    const { data: reverseLike } = await supabase
      .from('likes')
      .select('*')
      .eq('liker_id', likedId)
      .eq('liked_id', likerId)
      .single();

    // إذا كان هناك إعجاب متبادل، أنشئ تطابق
    if (reverseLike) {
      await createMatch(likerId, likedId);
    }

    return { data, error: null };
  } catch (err) {
    console.error('خطأ في إضافة الإعجاب:', err);
    return { data: null, error: err.message };
  }
};

// إنشاء تطابق
export const createMatch = async (user1Id, user2Id) => {
  try {
    const { data, error } = await supabase
      .from('matches')
      .insert([
        {
          user1_id: user1Id,
          user2_id: user2Id,
          status: 'active',
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (err) {
    console.error('خطأ في إنشاء التطابق:', err);
    return { data: null, error: err.message };
  }
};

// جلب التطابقات
export const getMatches = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        user1:users!matches_user1_id_fkey(*),
        user2:users!matches_user2_id_fkey(*)
      `)
      .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // تنسيق البيانات لإرجاع المستخدم الآخر فقط
    const formattedData = data.map((match) => ({
      ...match,
      otherUser: match.user1_id === userId ? match.user2 : match.user1,
    }));

    return { data: formattedData, error: null };
  } catch (err) {
    console.error('خطأ في جلب التطابقات:', err);
    return { data: null, error: err.message };
  }
};

// جلب عدد الرسائل غير المقروءة
export const getUnreadCount = async (userId) => {
  try {
    const { count, error } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('receiver_id', userId)
      .eq('read', false);

    if (error) throw error;
    return { count, error: null };
  } catch (err) {
    console.error('خطأ في جلب عدد الرسائل:', err);
    return { count: 0, error: err.message };
  }
};

// الاشتراك في الرسائل الجديدة (Realtime)
export const subscribeToMessages = (userId, callback) => {
  const channel = supabase
    .channel('messages')
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `receiver_id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return channel;
};

// إلغاء الاشتراك
export const unsubscribeFromMessages = (channel) => {
  if (channel) {
    supabase.removeChannel(channel);
  }
};