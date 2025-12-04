# 🚀 VeXa - منصة الدردشة والتعارف

## 📋 نظرة عامة

VeXa هي منصة حديثة للدردشة والتعارف مبنية بـ Next.js 14 و Supabase. تتيح للمستخدمين:
- التسجيل وإنشاء الملفات الشخصية
- اكتشاف أشخاص جدد بناءً على الاهتمامات
- الدردشة الفورية (Real-time)
- نظام الإعجابات والتطابقات

---

## 🛠️ التقنيات المستخدمة

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Icons**: Lucide React
- **Date Formatting**: date-fns

---

## 📁 هيكل المشروع

```
vexa/
├── src/
│   ├── app/                    # صفحات Next.js
│   │   ├── layout.js          # Layout رئيسي
│   │   ├── page.js            # الصفحة الرئيسية
│   │   ├── globals.css        # الأنماط العامة
│   │   ├── auth/              # صفحات المصادقة
│   │   │   ├── login/page.js
│   │   │   └── signup/page.js
│   │   ├── dashboard/         # لوحة التحكم
│   │   │   └── page.js
│   │   └── chat/              # صفحات الدردشة
│   │       └── [id]/page.js
│   │
│   ├── hooks/                 # React Hooks
│   │   ├── useAuth.js        # إدارة المصادقة
│   │   ├── useChat.js        # إدارة الدردشة
│   │   └── useMatches.js     # إدارة التطابقات
│   │
│   ├── lib/                   # Utilities
│   │   └── supabase.js       # Supabase client & helpers
│   │
│   └── components/            # React Components (اختياري)
│       ├── Navbar.js
│       ├── UserCard.js
│       └── ChatBox.js
│
├── public/                    # ملفات عامة
├── package.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
└── .env.local                # متغيرات البيئة
```

---

## 🚀 خطوات التشغيل

### 1️⃣ تثبيت المشروع

```bash
# استنساخ المشروع
git clone https://github.com/yourusername/vexa.git
cd vexa

# تثبيت المكتبات
npm install
```

### 2️⃣ إعداد Supabase

#### أ) إنشاء مشروع Supabase

1. انتقل إلى [supabase.com](https://supabase.com)
2. أنشئ حساب جديد
3. أنشئ مشروع جديد

#### ب) تنفيذ SQL Schema

انتقل إلى **SQL Editor** في Supabase ونفذ الكود التالي:

```sql
-- جدول المستخدمين
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  age INTEGER CHECK (age >= 18 AND age <= 100),
  gender TEXT CHECK (gender IN ('male', 'female', 'other')),
  interests TEXT[],
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- جدول الرسائل
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- جدول التطابقات
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user1_id, user2_id)
);

-- جدول الإعجابات
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  liker_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  liked_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(liker_id, liked_id)
);

-- فهارس للأداء
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
CREATE INDEX idx_matches_users ON matches(user1_id, user2_id);
CREATE INDEX idx_likes_users ON likes(liker_id, liked_id);

-- تفعيل Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

-- سياسات الأمان للمستخدمين (الجميع يمكنه القراءة، التعديل للمالك فقط)
CREATE POLICY "Users are viewable by everyone" 
  ON users FOR SELECT 
  USING (true);

CREATE POLICY "Users can update own profile" 
  ON users FOR UPDATE 
  USING (auth.uid() = id);

-- سياسات الرسائل
CREATE POLICY "Users can view own messages" 
  ON messages FOR SELECT 
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" 
  ON messages FOR INSERT 
  WITH CHECK (auth.uid() = sender_id);

-- سياسات التطابقات
CREATE POLICY "Users can view own matches" 
  ON matches FOR SELECT 
  USING (auth.uid() = user1_id OR auth.uid() = user2_id);

-- سياسات الإعجابات
CREATE POLICY "Users can view all likes" 
  ON likes FOR SELECT 
  USING (true);

CREATE POLICY "Users can add likes" 
  ON likes FOR INSERT 
  WITH CHECK (auth.uid() = liker_id);

-- تفعيل Realtime للرسائل
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

#### ج) إعداد Storage (اختياري - للصور)

1. انتقل إلى **Storage** في Supabase
2. أنشئ bucket جديد اسمه `avatars`
3. اجعله Public
4. أضف Policy للسماح برفع الصور:

```sql
-- السماح برفع الصور للمستخدمين المصادقين
CREATE POLICY "Users can upload avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND 
    auth.role() = 'authenticated'
  );

-- السماح بقراءة الصور للجميع
CREATE POLICY "Avatars are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');
```

### 3️⃣ إعداد متغيرات البيئة

أنشئ ملف `.env.local` في جذر المشروع:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**للحصول على المفاتيح:**
1. في Supabase، انتقل إلى **Settings** → **API**
2. انسخ **Project URL** و **anon/public key**

### 4️⃣ تشغيل المشروع

```bash
# وضع التطوير
npm run dev

# افتح المتصفح على
# http://localhost:3000
```

### 5️⃣ بناء للإنتاج

```bash
# بناء المشروع
npm run build

# تشغيل الإنتاج محلياً
npm start
```

---

## 🌐 النشر على Vercel

### الطريقة السريعة (Vercel CLI)

```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login

# نشر المشروع
vercel

# نشر للإنتاج
vercel --prod
```

### الطريقة عبر Dashboard

1. اذهب إلى [vercel.com](https://vercel.com)
2. اضغط **New Project**
3. استورد مشروعك من GitHub
4. أضف متغيرات البيئة:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. اضغط **Deploy**

---

## ✅ اختبار المشروع

### 1. اختبار التسجيل
- افتح `/auth/signup`
- سجل مستخدم جديد
- تحقق من إنشاء الملف في Supabase

### 2. اختبار تسجيل الدخول
- افتح `/auth/login`
- سجل دخول بالحساب الجديد
- يجب أن تنتقل إلى Dashboard

### 3. اختبار التطابقات
- في Dashboard، اضغط "أعجبني" على مستخدم
- سجل دخول بمستخدم آخر
- اضغط "أعجبني" على المستخدم الأول
- يجب أن يظهر تطابق

### 4. اختبار الدردشة
- من قائمة التطابقات، افتح دردشة
- أرسل رسالة
- افتح نفس الدردشة من المستخدم الآخر
- يجب أن ترى الرسالة فوراً (Realtime)

---

## 🔧 المشاكل الشائعة وحلولها

### ❌ خطأ: "Missing Supabase environment variables"

**الحل:** تأكد من إنشاء ملف `.env.local` ووضع المفاتيح الصحيحة

### ❌ خطأ: "relation does not exist"

**الحل:** تأكد من تنفيذ SQL Schema في Supabase

### ❌ الرسائل لا تظهر فورياً

**الحل:** 
1. تأكد من تفعيل Realtime في Supabase
2. نفذ: `ALTER PUBLICATION supabase_realtime ADD TABLE messages;`

### ❌ لا يمكن رفع الصور

**الحل:**
1. أنشئ bucket اسمه `avatars` في Storage
2. تأكد من إضافة Policies للسماح برفع الصور

### ❌ خطأ في تسجيل الدخول

**الحل:**
1. تحقق من تفعيل Email Auth في Supabase
2. انتقل إلى **Authentication** → **Providers**
3. فعّل **Email**

---

## 📚 الملفات المطلوبة

تأكد من وجود جميع هذه الملفات:

```
✅ package.json
✅ next.config.js
✅ tailwind.config.js
✅ postcss.config.js
✅ .env.local
✅ src/app/layout.js
✅ src/app/page.js
✅ src/app/globals.css
✅ src/app/auth/login/page.js
✅ src/app/auth/signup/page.js
✅ src/app/dashboard/page.js
✅ src/app/chat/[id]/page.js
✅ src/hooks/useAuth.js
✅ src/hooks/useChat.js
✅ src/hooks/useMatches.js
✅ src/lib/supabase.js
```

---

## 🎨 التخصيص

### تغيير الألوان

عدّل `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#fdf2f8',
        100: '#fce7f3',
        500: '#your-color',  // غيّر هنا
        600: '#your-color',
        700: '#your-color',
      },
    },
  },
}
```

### إضافة ميزات جديدة

- **الإشعارات**: أضف جدول `notifications` في Supabase
- **حظر المستخدمين**: أضف جدول `blocks`
- **الصور المتعددة**: عدّل جدول `users` لإضافة `photos JSONB`

---

## 📞 الدعم

إذا واجهت أي مشاكل:

1. تحقق من [Supabase Docs](https://supabase.com/docs)
2. تحقق من [Next.js Docs](https://nextjs.org/docs)
3. افتح issue في GitHub

---

## 📄 الترخيص

MIT License - استخدمه بحرية في مشاريعك!

---

## 🌟 المميزات القادمة

- [ ] إشعارات Push
- [ ] مكالمات الفيديو
- [ ] قصص (Stories)
- [ ] الوضع المظلم
- [ ] التطبيق المحمول (React Native)

---

**صُنع بـ ❤️ للتواصل والتعارف**