-- =============================================================================
-- VeXa Database Schema
-- نسخ هذا الملف بالكامل وتنفيذه في Supabase SQL Editor
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. إنشاء الجداول (Tables)
-- -----------------------------------------------------------------------------

-- جدول المستخدمين
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  age INTEGER CHECK (age >= 18 AND age <= 100),
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  interests TEXT[],
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول الرسائل
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- جدول التطابقات
CREATE TABLE IF NOT EXISTS matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_match UNIQUE(user1_id, user2_id)
);

-- جدول الإعجابات
CREATE TABLE IF NOT EXISTS likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  liker_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  liked_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_like UNIQUE(liker_id, liked_id),
  CONSTRAINT no_self_like CHECK (liker_id != liked_id)
);

-- -----------------------------------------------------------------------------
-- 2. إنشاء الفهارس (Indexes) لتحسين الأداء
-- -----------------------------------------------------------------------------

-- فهارس للرسائل
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON messages(receiver_id, read) WHERE read = false;

-- فهارس للتطابقات
CREATE INDEX IF NOT EXISTS idx_matches_user1 ON matches(user1_id);
CREATE INDEX IF NOT EXISTS idx_matches_user2 ON matches(user2_id);
CREATE INDEX IF NOT EXISTS idx_matches_status ON matches(status);

-- فهارس للإعجابات
CREATE INDEX IF NOT EXISTS idx_likes_liker ON likes(liker_id);
CREATE INDEX IF NOT EXISTS idx_likes_liked ON likes(liked_id);

-- فهارس للمستخدمين
CREATE INDEX IF NOT EXISTS idx_users_gender ON users(gender);
CREATE INDEX IF NOT EXISTS idx_users_age ON users(age);
CREATE INDEX IF NOT EXISTS idx_users_created ON users(created_at DESC);

-- -----------------------------------------------------------------------------
-- 3. تفعيل Row Level Security (RLS)
-- -----------------------------------------------------------------------------

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 4. سياسات الأمان للمستخدمين (Users Policies)
-- -----------------------------------------------------------------------------

-- الجميع يمكنه رؤية الملفات الشخصية
CREATE POLICY "Users are viewable by everyone" 
  ON users FOR SELECT 
  USING (true);

-- المستخدمون يمكنهم إدراج ملفهم الشخصي عند التسجيل
CREATE POLICY "Users can insert own profile" 
  ON users FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- المستخدمون يمكنهم تحديث ملفهم الشخصي فقط
CREATE POLICY "Users can update own profile" 
  ON users FOR UPDATE 
  USING (auth.uid() = id);

-- المستخدمون لا يمكنهم حذف ملفاتهم (اختياري)
CREATE POLICY "Users cannot delete profiles" 
  ON users FOR DELETE 
  USING (false);

-- -----------------------------------------------------------------------------
-- 5. سياسات الأمان للرسائل (Messages Policies)
-- -----------------------------------------------------------------------------

-- المستخدمون يمكنهم رؤية الرسائل المرسلة إليهم أو المرسلة منهم
CREATE POLICY "Users can view own messages" 
  ON messages FOR SELECT 
  USING (
    auth.uid() = sender_id OR 
    auth.uid() = receiver_id
  );

-- المستخدمون يمكنهم إرسال رسائل
CREATE POLICY "Users can send messages" 
  ON messages FOR INSERT 
  WITH CHECK (auth.uid() = sender_id);

-- المستخدمون يمكنهم تحديث حالة قراءة الرسائل المرسلة إليهم
CREATE POLICY "Users can update message read status" 
  ON messages FOR UPDATE 
  USING (auth.uid() = receiver_id);

-- لا يمكن حذف الرسائل (اختياري)
CREATE POLICY "Messages cannot be deleted" 
  ON messages FOR DELETE 
  USING (false);

-- -----------------------------------------------------------------------------
-- 6. سياسات الأمان للتطابقات (Matches Policies)
-- -----------------------------------------------------------------------------

-- المستخدمون يمكنهم رؤية تطابقاتهم فقط
CREATE POLICY "Users can view own matches" 
  ON matches FOR SELECT 
  USING (
    auth.uid() = user1_id OR 
    auth.uid() = user2_id
  );

-- النظام فقط يمكنه إنشاء تطابقات (عبر الـ Backend)
CREATE POLICY "System can create matches" 
  ON matches FOR INSERT 
  WITH CHECK (true);

-- المستخدمون يمكنهم تحديث حالة تطابقاتهم
CREATE POLICY "Users can update match status" 
  ON matches FOR UPDATE 
  USING (
    auth.uid() = user1_id OR 
    auth.uid() = user2_id
  );

-- -----------------------------------------------------------------------------
-- 7. سياسات الأمان للإعجابات (Likes Policies)
-- -----------------------------------------------------------------------------

-- الجميع يمكنه رؤية الإعجابات (للتحقق من التطابقات)
CREATE POLICY "Likes are viewable by everyone" 
  ON likes FOR SELECT 
  USING (true);

-- المستخدمون يمكنهم إضافة إعجابات فقط بأسمائهم
CREATE POLICY "Users can add likes" 
  ON likes FOR INSERT 
  WITH CHECK (auth.uid() = liker_id);

-- المستخدمون يمكنهم حذف إعجاباتهم
CREATE POLICY "Users can delete own likes" 
  ON likes FOR DELETE 
  USING (auth.uid() = liker_id);

-- -----------------------------------------------------------------------------
-- 8. Triggers للتحديث التلقائي
-- -----------------------------------------------------------------------------

-- تحديث updated_at تلقائياً عند تعديل المستخدم
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 9. تفعيل Realtime للدردشة الفورية
-- -----------------------------------------------------------------------------

-- إضافة جدول الرسائل إلى Realtime Publication
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- يمكنك أيضاً تفعيل Realtime لجداول أخرى إذا أردت
-- ALTER PUBLICATION supabase_realtime ADD TABLE matches;
-- ALTER PUBLICATION supabase_realtime ADD TABLE likes;

-- -----------------------------------------------------------------------------
-- 10. دوال مساعدة (Helper Functions)
-- -----------------------------------------------------------------------------

-- دالة للبحث عن المستخدمين حسب الاهتمامات
CREATE OR REPLACE FUNCTION search_users_by_interests(user_interests TEXT[])
RETURNS TABLE (
  id UUID,
  name TEXT,
  avatar_url TEXT,
  bio TEXT,
  age INTEGER,
  gender TEXT,
  interests TEXT[],
  location TEXT,
  match_score INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    u.id,
    u.name,
    u.avatar_url,
    u.bio,
    u.age,
    u.gender,
    u.interests,
    u.location,
    (
      SELECT COUNT(*)::INTEGER 
      FROM unnest(u.interests) interest
      WHERE interest = ANY(user_interests)
    ) as match_score
  FROM users u
  WHERE u.id != auth.uid()
  ORDER BY match_score DESC, u.created_at DESC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- دالة لجلب عدد الرسائل غير المقروءة
CREATE OR REPLACE FUNCTION get_unread_messages_count(user_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::INTEGER
    FROM messages
    WHERE receiver_id = user_id AND read = false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- 11. Storage Policies (للصور)
-- -----------------------------------------------------------------------------

-- ملاحظة: يجب إنشاء bucket اسمه 'avatars' أولاً من Storage UI

-- السماح للمستخدمين المصادقين برفع الصور
CREATE POLICY "Users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND 
  auth.role() = 'authenticated'
);

-- السماح للجميع برؤية الصور
CREATE POLICY "Avatars are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');

-- السماح للمستخدمين بحذف صورهم
CREATE POLICY "Users can delete own avatars"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- السماح للمستخدمين بتحديث صورهم
CREATE POLICY "Users can update own avatars"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'avatars' AND 
  auth.uid()::text = (storage.foldername(name))[1]
);

-- -----------------------------------------------------------------------------
-- 12. بيانات تجريبية (اختياري - للتطوير فقط)
-- -----------------------------------------------------------------------------

-- يمكنك إضافة بيانات تجريبية هنا للاختبار
-- مثال:
/*
INSERT INTO users (id, email, name, age, gender, bio, interests, location)
VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'user1@example.com', 'أحمد', 25, 'male', 'مهتم بالتقنية', ARRAY['💻 التقنية', '📚 القراءة'], 'الرياض'),
  ('660e8400-e29b-41d4-a716-446655440001', 'user2@example.com', 'سارة', 23, 'female', 'أحب السفر', ARRAY['✈️ السفر', '🎵 الموسيقى'], 'جدة');
*/

-- -----------------------------------------------------------------------------
-- ✅ تم! Schema جاهز للاستخدام
-- -----------------------------------------------------------------------------

-- للتحقق من نجاح التثبيت، نفذ:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- يجب أن ترى: users, messages, matches, likes