# 🔧 دليل حل المشاكل - VeXa

## 🎯 نظرة عامة
هذا الدليل يساعدك في حل أي مشكلة قد تواجهها أثناء إعداد أو تشغيل المشروع.

---

## ❌ مشاكل التثبيت

### 1. خطأ: "Module not found"

```
Error: Cannot find module '@supabase/supabase-js'
```

**السبب**: المكتبات لم يتم تثبيتها بشكل صحيح

**الحل**:
```bash
# احذف node_modules و package-lock.json
rm -rf node_modules package-lock.json

# أعد التثبيت
npm install

# تأكد من تثبيت المكتبات المطلوبة
npm install @supabase/supabase-js lucide-react date-fns
```

---

### 2. خطأ: "Invalid hook call"

```
Error: Invalid hook call. Hooks can only be called inside the body of a function component.
```

**السبب**: استخدام Hooks خارج Client Component

**الحل**: تأكد من وجود `'use client'` في أعلى الملف:

```javascript
'use client';

import { useAuth } from '@/hooks/useAuth';
// ... بقية الكود
```

---

## 🗄️ مشاكل Supabase

### 3. خطأ: "Missing Supabase environment variables"

**السبب**: ملف `.env.local` غير موجود أو المفاتيح خاطئة

**الحل**:
1. أنشئ ملف `.env.local` في جذر المشروع
2. تأكد من المحتوى:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

3. أعد تشغيل المشروع:
```bash
npm run dev
```

---

### 4. خطأ: "relation 'users' does not exist"

```
Error: relation "public.users" does not exist
```

**السبب**: جداول قاعدة البيانات لم يتم إنشاؤها

**الحل**:
1. افتح Supabase Dashboard
2. انتقل إلى **SQL Editor**
3. انسخ والصق SQL Schema الكامل من `README.md`
4. اضغط **Run**

---

### 5. خطأ: "new row violates row-level security policy"

```
Error: new row violates row-level security policy for table "users"
```

**السبب**: سياسات RLS غير مضبوطة بشكل صحيح

**الحل**: نفذ في SQL Editor:

```sql
-- للمستخدمين
CREATE POLICY "Enable insert for authenticated users"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);

-- للرسائل
CREATE POLICY "Enable insert for message sender"
ON messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);
```

---

### 6. الرسائل لا تظهر فورياً (Realtime لا يعمل)

**السبب**: Realtime غير مفعل للجدول

**الحل**:
```sql
-- في SQL Editor
ALTER PUBLICATION supabase_realtime ADD TABLE messages;
```

**أو عبر Dashboard**:
1. انتقل إلى **Database** → **Replication**
2. فعّل `messages` table

---

## 🔐 مشاكل المصادقة

### 7. لا يمكن التسجيل: "Email not confirmed"

**السبب**: تأكيد البريد الإلكتروني مفعّل

**الحل**:
1. في Supabase: **Authentication** → **Settings**
2. تحت **Email Auth**، عطّل "Enable email confirmations"
3. أو استخدم بريد حقيقي وتحقق من Inbox

---

### 8. خطأ: "Invalid login credentials"

**السبب**: كلمة المرور أو البريد خاطئ، أو الحساب غير موجود

**الحل**:
1. تأكد من التسجيل أولاً
2. تحقق من الـ Supabase Dashboard:
   - **Authentication** → **Users**
   - تأكد من وجود المستخدم

---

### 9. تسجيل الخروج لا يعمل

**الحل**: تأكد من استخدام `signOut` بشكل صحيح:

```javascript
const handleLogout = async () => {
  await signOut();
  router.push('/');
};
```

---

## 🎨 مشاكل التصميم

### 10. Tailwind CSS لا يعمل

**السبب**: تكوين Tailwind غير صحيح

**الحل**: تأكد من `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  // ...
}
```

---

### 11. الخطوط العربية لا تظهر بشكل صحيح

**الحل**: تأكد من `globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700&display=swap');

* {
  font-family: 'Cairo', sans-serif;
}
```

---

## 💬 مشاكل الدردشة

### 12. الرسائل لا ترسل

**الأسباب المحتملة وحلولها**:

**أ) خطأ في Permissions:**
```sql
-- تأكد من Policy للإرسال
CREATE POLICY "Users can send messages"
ON messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);
```

**ب) receiverId غير صحيح:**
```javascript
// تحقق من أن receiverId موجود
console.log('Receiver ID:', receiverId);
```

---

### 13. الرسائل القديمة لا تظهر

**الحل**: تأكد من `useChat` Hook:

```javascript
const { messages, loading } = useChat(receiverId);

// تأكد من receiverId صحيح
useEffect(() => {
  console.log('Chat with:', receiverId);
}, [receiverId]);
```

---

## 📱 مشاكل الصور

### 14. لا يمكن رفع الصور

**السبب**: Storage bucket غير موجود أو Policies خاطئة

**الحل**:

**أ) إنشاء Bucket:**
1. في Supabase: **Storage**
2. أنشئ bucket اسمه `avatars`
3. اجعله **Public**

**ب) إضافة Policies:**
```sql
-- السماح برفع الصور
CREATE POLICY "Users can upload avatars"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'avatars' AND 
  auth.role() = 'authenticated'
);

-- السماح بالقراءة
CREATE POLICY "Avatars are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'avatars');
```

---

### 15. الصور لا تظهر

**الحل**: تحقق من URL:

```javascript
// في supabase.js
const { data: { publicUrl } } = supabase.storage
  .from('avatars')
  .getPublicUrl(filePath);

console.log('Public URL:', publicUrl);
```

---

## 🚀 مشاكل النشر (Vercel)

### 16. خطأ Build على Vercel

```
Error: Environment variables not found
```

**الحل**:
1. في Vercel Dashboard → **Settings** → **Environment Variables**
2. أضف:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. أعد Deploy

---

### 17. الموقع يعمل محلياً لكن لا يعمل على Vercel

**الأسباب المحتملة**:

**أ) متغيرات البيئة:**
- تأكد من إضافتها في Vercel
- أعد Deploy بعد الإضافة

**ب) مشاكل في الكود:**
```bash
# اختبر Build محلياً
npm run build
npm start
```

---

### 18. 404 على صفحات معينة بعد Deploy

**السبب**: Next.js routing غير مضبوط

**الحل**: تأكد من أن الملفات في المسارات الصحيحة:
```
src/app/chat/[id]/page.js  ✅
src/app/chat/id/page.js    ❌
```

---

## 🔄 مشاكل State Management

### 19. البيانات لا تتحدث تلقائياً

**الحل**: استخدم `refreshMatches` أو `refreshSuggestions`:

```javascript
const { refreshMatches } = useMatches();

// بعد إضافة Like
await likeUser(userId);
await refreshMatches();  // تحديث التطابقات
```

---

### 20. User Profile لا يتحدث بعد التعديل

**الحل**: تأكد من استدعاء `fetchProfile`:

```javascript
// في useAuth.js
const updateProfile = async (updates) => {
  await supabase.from('users').update(updates).eq('id', user.id);
  await fetchProfile(user.id);  // تحديث الملف
};
```

---

## 🐛 أدوات التشخيص

### طريقة 1: Console Logs

```javascript
// أضف في الكود للتشخيص
console.log('User:', user);
console.log('Messages:', messages);
console.log('Error:', error);
```

### طريقة 2: Supabase Logs

في Supabase Dashboard:
- **Logs** → **Database Logs**
- **Logs** → **API Logs**

### طريقة 3: Network Tab

في المتصفح:
1. F12 → **Network**
2. فلتر بـ `supabase`
3. تحقق من Requests/Responses

---

## 🆘 مشكلة غير موجودة هنا؟

### خطوات التشخيص العامة:

1. **تحقق من Console**:
   ```bash
   # في Terminal
   npm run dev
   
   # في Browser
   F12 → Console
   ```

2. **تحقق من Supabase Logs**:
   - Dashboard → Logs

3. **تحقق من SQL Schema**:
   - هل نفذت كل الجداول؟
   - هل أضفت Policies؟

4. **امسح Cache**:
   ```bash
   rm -rf .next
   npm run dev
   ```

5. **أعد تثبيت المكتبات**:
   ```bash
   rm -rf node_modules
   npm install
   ```

---

## 📞 الحصول على المساعدة

إذا لم تجد حلاً:

1. **GitHub Issues**: افتح issue مع:
   - وصف المشكلة
   - خطوات إعادة المشكلة
   - رسالة الخطأ
   - لقطة شاشة

2. **Supabase Discord**: [discord.supabase.com](https://discord.supabase.com)

3. **Next.js Discord**: [nextjs.org/discord](https://nextjs.org/discord)

---

## ✅ Checklist التشخيص السريع

قبل طلب المساعدة، تحقق من:

- [ ] `npm install` تم بنجاح
- [ ] `.env.local` موجود ويحتوي على المفاتيح الصحيحة
- [ ] SQL Schema تم تنفيذه بالكامل
- [ ] Supabase Realtime مفعّل للـ messages
- [ ] RLS Policies موجودة
- [ ] Storage bucket موجود (إذا كنت تستخدم الصور)
- [ ] لا توجد أخطاء في Console
- [ ] المشروع يعمل محلياً قبل Deploy

---

**💡 نصيحة**: احتفظ بهذا الملف مفتوحاً أثناء التطوير!