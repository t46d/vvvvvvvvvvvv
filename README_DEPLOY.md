# نشر المشروع على Vercel

## إعدادات سريعة
- Root Directory: اتركها فارغة إن التطبيق في جذر المستودع، أو ضع اسم المجلد الفرعي مثل `vexa-chat-pagezip-1`.
- Install Command: `npm ci`
- Build Command: `npm run build`
- Output Directory: `dist` عادةً لـ Vite

## متغيرات بيئة مقترحة
- SUPABASE_URL
- SUPABASE_ANON_KEY
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- AGORA_APP_ID
- AGORA_APP_CERTIFICATE

## استخدام السكربت المحلي
- اجعل السكربت قابلًا للتنفيذ: `chmod +x scripts/build-and-deploy.sh`
- شغّله محليًا: `./scripts/build-and-deploy.sh`
- للنشر عبر Vercel محليًا: `VERCEL_TOKEN=xxx ./scripts/build-and-deploy.sh`
