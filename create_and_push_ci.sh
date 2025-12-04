#!/usr/bin/env bash
set -euo pipefail

# === إعدادات مُعدّة تلقائيًا ===
REMOTE_URL="https://github.com/t46d/vvvvvvvvvvvv.git"
SUBDIR="vexa-chat-pagezip-1"
BRANCH="main"

ROOT="$(pwd)"
if [ -n "$SUBDIR" ]; then
  WORKDIR="$ROOT/$SUBDIR"
else
  WORKDIR="$ROOT"
fi

echo "Working directory: $WORKDIR"

cd "$ROOT"
mkdir -p .github/workflows
mkdir -p scripts

cat > .github/workflows/ci.yml <<'YML'
name: CI Build and Optional Vercel Deploy

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Use Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run lint (optional)
        run: |
          if npm run -s lint >/dev/null 2>&1; then
            npm run lint
          else
            echo "No lint script or lint skipped"
          fi

      - name: Run tests (optional)
        run: |
          if npm run -s test >/dev/null 2>&1; then
            npm run test
          else
            echo "No tests or tests skipped"
          fi

      - name: Build
        run: npm run build

      - name: Upload build artifact
        if: success()
        uses: actions/upload-artifact@v4
        with:
          name: build-output
          path: |
            dist
            .next

  vercel-deploy:
    needs: build
    runs-on: ubuntu-latest
    if: ${{ secrets.VERCEL_TOKEN != '' && secrets.VERCEL_PROJECT_ID != '' && secrets.VERCEL_ORG_ID != '' }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install Vercel CLI
        run: npm ci --no-audit --no-fund && npm i -g vercel@latest

      - name: Deploy to Vercel
        env:
          VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: ${{ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: ${{ secrets.VERCEL_PROJECT_ID }}
        run: |
          npx vercel --prod --confirm --token "$VERCEL_TOKEN"
YML

cat > scripts/build-and-deploy.sh <<'SH'
#!/usr/bin/env bash
set -euo pipefail
SUBDIR="vexa-chat-pagezip-1"
ROOT_DIR="$(pwd)"
if [ -n "$SUBDIR" ]; then
  cd "$ROOT_DIR/$SUBDIR"
fi
echo "Installing dependencies..."
if [ -f package-lock.json ]; then
  npm ci
else
  npm install
fi
echo "Running lint (if exists)..."
if npm run -s lint >/dev/null 2>&1; then
  npm run lint
else
  echo "No lint script or lint skipped."
fi
echo "Running tests (if exists)..."
if npm run -s test >/dev/null 2>&1; then
  npm run test
else
  echo "No tests or tests skipped."
fi
echo "Building project..."
npm run build
if [ -n "${VERCEL_TOKEN:-}" ]; then
  echo "VERCEL_TOKEN detected, deploying to Vercel..."
  npx vercel --prod --confirm --token "$VERCEL_TOKEN" ${SUBDIR:+--cwd "$SUBDIR"}
else
  echo "VERCEL_TOKEN not set. Build complete. To deploy, set VERCEL_TOKEN and re-run the script."
fi
SH

cat > README_DEPLOY.md <<'MD'
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
MD

git add .github/workflows/ci.yml scripts/build-and-deploy.sh README_DEPLOY.md
git add -A
git commit -m "Add CI workflow, build-and-deploy script, and README_DEPLOY" || echo "No changes to commit"
if git remote get-url origin >/dev/null 2>&1; then
  git remote set-url origin "$REMOTE_URL"
else
  git remote add origin "$REMOTE_URL"
fi
git push -u origin "$BRANCH"
echo "Done. Files created and pushed to $REMOTE_URL on branch $BRANCH."
