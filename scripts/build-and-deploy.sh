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
