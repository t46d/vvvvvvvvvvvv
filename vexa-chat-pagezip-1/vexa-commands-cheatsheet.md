# ⚡ VeXa - دليل الأوامر السريع

## 📦 التثبيت والإعداد

```bash
# إنشاء مشروع جديد
npx create-next-app@latest vexa --app --tailwind --no-src

# الانتقال للمشروع
cd vexa

# تثبيت المكتبات
npm install @supabase/supabase-js lucide-react date-fns

# تثبيت مكتبة إضافية (اختياري)
npm install clsx
```

---

## 🚀 التشغيل والبناء

```bash
# تشغيل وضع التطوير
npm run dev

# بناء للإنتاج
npm run build

# تشغيل الإنتاج محلياً
npm start

# تشغيل ESLint
npm run lint
```

---

## 🗄️ Supabase CLI (اختياري)

```bash
# تثبيت Supabase CLI
npm install -g supabase

# تسجيل الدخول
supabase login

# ربط المشروع
supabase link --project-ref your-project-ref

# تطبيق Migrations
supabase db push

# جلب البيانات
supabase db pull
```

---

## 🌐 النشر على Vercel

```bash
# تثبيت Vercel CLI
npm install -g vercel

# تسجيل الدخول
vercel login

# نشر للمعاينة
vercel

# نشر للإنتاج
vercel --prod

# عرض معلومات المشروع
vercel inspect
```

---

## 🔧 أوامر التشخيص

```bash
# مسح Cache
rm -rf .next

# مسح node_modules وإعادة التثبيت
rm -rf node_modules package-lock.json
npm install

# التحقق من إصدار Node
node -v

# التحقق من إصدار npm
npm -v

# عرض المكتبات المثبتة
npm list --depth=0
```

---

## 📁 هيكل الملفات الأساسي

```
vexa/
├── src/
│   ├── app/
│   │   ├── layout.js              # Layout رئيسي
│   │   ├── page.js                # الصفحة الرئيسية
│   │   ├── globals.css            # الأنماط
│   │   ├── auth/
│   │   │   ├── login/page.js     # تسجيل الدخول
│   │   │   └── signup/page.js    # التسجيل
│   │   ├── dashboard/page.js      # لوحة التحكم
│   │   └── chat/[id]/page.js      # الدردشة
│   ├── hooks/
│   │   ├── useAuth.js            # المصادقة
│   │   ├── useChat.js            # الدردشة
│   │   └── useMatches.js         # التطابقات
│   └── lib/
│       └── supabase.js           # Supabase client
├── public/
├── .env.local                     # البيئة
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 🗄️ أوامر SQL مهمة

### في Supabase SQL Editor:

```sql
-- عرض جميع الجداول
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- عرض جميع المستخدمين
SELECT * FROM users;

-- عرض الرسائل الأخيرة
SELECT * FROM messages ORDER BY created_at DESC LIMIT 10;

-- عرض التطابقات النشطة
SELECT * FROM matches WHERE status = 'active';

-- حذف جميع البيانات (حذر!)
TRUNCATE users, messages, matches, likes CASCADE;

-- إعادة تعيين كلمة المرور لمستخدم
-- استخدم Dashboard: Authentication → Users → Reset Password

-- تفعيل Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE messages;

-- التحقق من RLS Policies
SELECT tablename, policyname FROM pg_policies 
WHERE schemaname = 'public';
```

---

## 🔐 متغيرات البيئة

### .env.local

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### للحصول على المفاتيح:
1. Supabase Dashboard → Settings → API
2. انسخ Project URL و anon/public key

---

## 🎨 Tailwind Classes المفيدة

```jsx
// Buttons
<button className="btn-primary">زر أساسي</button>
<button className="btn-secondary">زر ثانوي</button>

// Inputs
<input className="input-field" />

// Cards
<div className="card">محتوى البطاقة</div>
<div className="card-hover">بطاقة مع hover</div>

// Messages
<div className="message-bubble message-sent">رسالة مرسلة</div>
<div className="message-bubble message-received">رسالة مستلمة</div>

// Loading
<div className="loading-spinner"></div>

// Badge
<div className="notification-badge">5</div>

// Gradients
<div className="gradient-primary">تدرج أساسي</div>
```

---

## 🔍 Debugging

### Console Logs مفيدة:

```javascript
// في useAuth
console.log('User:', user);
console.log('Profile:', profile);
console.log('Is Authenticated:', isAuthenticated);

// في useChat
console.log('Messages:', messages);
console.log('Sending:', sending);
console.log('Receiver ID:', receiverId);

// في Supabase
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
```

### في المتصفح:
- F12 → Console (للأخطاء)
- F12 → Network → Filter: supabase (للطلبات)
- F12 → Application → Local Storage (للتخزين)

---

## 🛠️ Git Commands

```bash
# تهيئة Git
git init

# إضافة جميع الملفات
git add .

# Commit
git commit -m "Initial commit"

# ربط بـ GitHub
git remote add origin https://github.com/username/vexa.git

# رفع الكود
git push -u origin main

# إنشاء branch جديد
git checkout -b feature/new-feature

# دمج branch
git merge feature/new-feature
```

---

## 📝 .gitignore المهم

```
# dependencies
node_modules/
.pnp/

# testing
coverage/

# next.js
.next/
out/

# production
build/

# env files
.env
.env.local
.env.production

# debug
npm-debug.log*
yarn-debug.log*

# IDE
.idea/
.vscode/
*.swp
*.swo

# OS
.DS_Store
Thumbs.db
```

---

## 🔄 تحديث المشروع

```bash
# تحديث Next.js
npm install next@latest react@latest react-dom@latest

# تحديث Supabase
npm install @supabase/supabase-js@latest

# تحديث جميع المكتبات
npm update

# التحقق من المكتبات القديمة
npm outdated
```

---

## 🚨 أوامر الطوارئ

```bash
# مسح كل شيء وإعادة البناء
rm -rf node_modules .next package-lock.json
npm install
npm run dev

# إصلاح مشاكل npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# التحقق من Port مشغول
# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📚 روابط مفيدة

- **Next.js Docs**: https://nextjs.org/docs
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev
- **date-fns**: https://date-fns.org

---

## ⚡ اختصارات VS Code مفيدة

```
Ctrl/Cmd + P         # البحث عن ملف
Ctrl/Cmd + Shift + P # Command Palette
Ctrl/Cmd + B         # إخفاء/إظهار Sidebar
Ctrl/Cmd + `         # فتح Terminal
Ctrl/Cmd + /         # تعليق السطر
Alt + Up/Down        # نقل السطر
Ctrl/Cmd + D         # تحديد الكلمة التالية
```

---

## 📱 اختبار Responsive

```bash
# في المتصفح، افتح DevTools (F12):
# Device Toolbar: Ctrl/Cmd + Shift + M

# أحجام شائعة:
# Mobile: 375x667 (iPhone SE)
# Tablet: 768x1024 (iPad)
# Desktop: 1920x1080
```

---

**💾 احفظ هذا الملف للرجوع إليه سريعاً!**