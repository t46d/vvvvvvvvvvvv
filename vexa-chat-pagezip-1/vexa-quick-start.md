# ⚡ VeXa - دليل البدء السريع

## 🎯 نظرة سريعة
مشروع كامل جاهز للتشغيل في **5 دقائق**!

---

## 📦 الخطوة 1: إنشاء المشروع (دقيقة واحدة)

```bash
# إنشاء مشروع Next.js
npx create-next-app@latest vexa --app --tailwind --no-src
cd vexa

# تثبيت المكتبات المطلوبة
npm install @supabase/supabase-js lucide-react date-fns
```

---

## 📁 الخطوة 2: نسخ الملفات (دقيقتان)

### أ) الملفات الأساسية

قم بنسخ المحتوى من الملفات التي أنشأتها في الأعلى:

1. **package.json** - استبدل المحتوى
2. **next.config.js** - أنشئ/استبدل
3. **tailwind.config.js** - استبدل
4. **postcss.config.js** - أنشئ

### ب) ملفات التطبيق

أنشئ هذه المجلدات والملفات في `src/`:

```
src/
├── app/
│   ├── layout.js              ✅ انسخ من الملف المقدم
│   ├── page.js                ✅ انسخ من الملف المقدم
│   ├── globals.css            ✅ انسخ من الملف المقدم
│   ├── auth/
│   │   ├── login/page.js      ✅
│   │   └── signup/page.js     ✅
│   ├── dashboard/page.js      ✅
│   └── chat/[id]/page.js      ✅
│
├── hooks/
│   ├── useAuth.js             ✅
│   ├── useChat.js             ✅
│   └── useMatches.js          ✅
│
└── lib/
    └── supabase.js            ✅
```

---

## 🗄️ الخطوة 3: إعداد Supabase (دقيقتان)

### 1. أنشئ حساب Supabase
- اذهب إلى [supabase.com](https://supabase.com)
- أنشئ مشروع جديد

### 2. نفذ SQL Schema
- افتح **SQL Editor**
- انسخ وألصق هذا الكود:

```sql
-- نسخة مختصرة - انسخ SQL الكامل من README.md
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  age INTEGER,
  gender TEXT,
  interests TEXT[],
  location TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user1_id UUID REFERENCES users(id) ON DELETE CASCADE,
  user2_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  liker_id UUID REFERENCES users(id) ON DELETE CASCADE,
  liked_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- افتح README.md للحصول على SQL الكامل مع الفهارس والسياسات
```

### 3. احصل على المفاتيح
- انتقل إلى **Settings** → **API**
- انسخ:
  - Project URL
  - anon/public key

---

## 🔐 الخطوة 4: إعداد البيئة (30 ثانية)

أنشئ ملف `.env.local` في الجذر:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## 🚀 الخطوة 5: التشغيل! (30 ثانية)

```bash
npm run dev
```

افتح [http://localhost:3000](http://localhost:3000)

---

## ✅ اختبار سريع

1. **التسجيل**: `/auth/signup`
   - أنشئ حساب جديد
   
2. **تسجيل الدخول**: `/auth/login`
   - سجل دخول

3. **Dashboard**: `/dashboard`
   - استكشف المستخدمين
   - اضغط "أعجبني"

4. **الدردشة**: `/chat/[user-id]`
   - أرسل رسائل فورية

---

## 🌐 النشر على Vercel

```bash
# الطريقة الأسرع
npx vercel

# أو عبر Dashboard
# 1. اذهب إلى vercel.com
# 2. استورد المشروع
# 3. أضف متغيرات البيئة
# 4. اضغط Deploy
```

⚠️ **لا تنسَ إضافة المتغيرات في Vercel:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

## 🎨 التخصيص السريع

### تغيير اللون الرئيسي
في `tailwind.config.js`:
```javascript
colors: {
  primary: {
    600: '#YOUR_COLOR',  // غيّر هنا
  }
}
```

### تغيير الشعار
في `src/app/page.js` و `layout.js`:
```javascript
<span className="text-2xl font-bold">YOUR_BRAND</span>
```

---

## 📋 Checklist للتأكد

- [ ] Node.js مثبت (v18+)
- [ ] تم إنشاء المشروع بـ `create-next-app`
- [ ] تم تثبيت جميع المكتبات
- [ ] تم نسخ جميع الملفات (12 ملف)
- [ ] تم إنشاء مشروع Supabase
- [ ] تم تنفيذ SQL Schema
- [ ] تم إنشاء `.env.local`
- [ ] المشروع يعمل على localhost
- [ ] يمكن التسجيل وتسجيل الدخول
- [ ] الدردشة تعمل بشكل فوري

---

## 🆘 مشاكل شائعة؟

### لا يعمل المشروع؟
```bash
# امسح node_modules وأعد التثبيت
rm -rf node_modules
npm install
npm run dev
```

### خطأ في Supabase؟
- تأكد من نسخ المفاتيح بشكل صحيح
- تأكد من تنفيذ SQL Schema

### الدردشة لا تعمل فورياً؟
```sql
-- نفذ هذا في SQL Editor
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

---

## 🎯 الخطوات التالية

1. ✅ المشروع يعمل؟ ممتاز!
2. 📖 اقرأ `README.md` الكامل لمزيد من التفاصيل
3. 🎨 خصص التصميم حسب ذوقك
4. 🚀 انشر على Vercel
5. 🌟 شارك مشروعك!

---

**وقت التنفيذ الكلي: 5-7 دقائق ⚡**

**هل واجهت مشكلة؟ تحقق من README.md للحصول على حلول مفصلة!**