// next.config.js - التكوين الكامل لـ vexachat.world
/** @type {import('next').NextConfig} */
const nextConfig = {
  // معلومات الدومين
  env: {
    NEXT_PUBLIC_DOMAIN: 'vexachat.world',
    NEXT_PUBLIC_APP_URL: process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'https://vexachat.world',
    NEXT_PUBLIC_API_URL: 'https://api.vexachat.world',
  },

  // تحسين الصور
  images: {
    domains: [
      'vexachat.world',
      'www.vexachat.world',
      'api.vexachat.world',
      'cdn.vexachat.world',
      '*.supabase.co',
      'supabase.co',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.vexachat.world',
      },
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Headers للأمان
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(self), microphone=(self), geolocation=(self)'
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      // Redirect www to non-www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.vexachat.world',
          },
        ],
        destination: 'https://vexachat.world/:path*',
        permanent: true,
      },
      // Legacy redirects
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/auth/login',
        permanent: true,
      },
      {
        source: '/signup',
        destination: '/auth/signup',
        permanent: true,
      },
      {
        source: '/register',
        destination: '/auth/signup',
        permanent: true,
      },
    ];
  },

  // Rewrites للـ API
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.vexachat.world/:path*',
      },
    ];
  },

  // التحسينات
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,

  // i18n Support
  i18n: {
    locales: ['en', 'ar', 'fr', 'es', 'de'],
    defaultLocale: 'en',
    localeDetection: true,
  },

  // Experimental Features
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'date-fns'],
  },

  // Webpack Configuration
  webpack: (config, { isServer }) => {
    // تحسين Bundle Size
    config.optimization = {
      ...config.optimization,
      usedExports: true,
    };

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },

  // Output Configuration
  output: 'standalone',

  // TypeScript (إذا استخدمت لاحقاً)
  typescript: {
    ignoreBuildErrors: false,
  },

  // ESLint
  eslint: {
    ignoreDuringBuilds: false,
  },
};

module.exports = nextConfig;

// ============================================================================
// .env.production - متغيرات الإنتاج
// ============================================================================
/*
# Domain
NEXT_PUBLIC_DOMAIN=vexachat.world
NEXT_PUBLIC_APP_URL=https://vexachat.world
NEXT_PUBLIC_API_URL=https://api.vexachat.world

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Agora.io (للفيديو والصوت)
NEXT_PUBLIC_AGORA_APP_ID=your-agora-app-id
AGORA_APP_CERTIFICATE=your-agora-certificate

# Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_HOTJAR_ID=your-hotjar-id

# Feature Flags
NEXT_PUBLIC_ENABLE_VIDEO_CALLS=true
NEXT_PUBLIC_ENABLE_VOICE_CALLS=true
NEXT_PUBLIC_ENABLE_LIVE_STREAMING=true
NEXT_PUBLIC_ENABLE_STORIES=true

# Rate Limiting
RATE_LIMIT_MAX_REQUESTS=100
RATE_LIMIT_WINDOW_MS=900000

# Email (SendGrid)
SENDGRID_API_KEY=your-sendgrid-key
FROM_EMAIL=noreply@vexachat.world

# SMS (Twilio)
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_PHONE_NUMBER=+1234567890

# Payment (Stripe)
STRIPE_PUBLIC_KEY=pk_live_xxxxx
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx

# Redis (للـ Caching)
REDIS_URL=redis://localhost:6379

# Monitoring
SENTRY_DSN=your-sentry-dsn
SENTRY_AUTH_TOKEN=your-sentry-token

# CDN
CDN_URL=https://cdn.vexachat.world

# WebRTC
TURN_SERVER_URL=turn:turn.vexachat.world:3478
TURN_USERNAME=vexauser
TURN_CREDENTIAL=vexapass
*/

// ============================================================================
// vercel.json - Vercel Configuration
// ============================================================================
/*
{
  "version": 2,
  "name": "vexachat-world",
  "alias": ["vexachat.world", "www.vexachat.world"],
  "regions": ["iad1"],
  "build": {
    "env": {
      "NEXT_PUBLIC_DOMAIN": "vexachat.world",
      "NEXT_PUBLIC_APP_URL": "https://vexachat.world"
    }
  },
  "env": {
    "NEXT_PUBLIC_DOMAIN": "vexachat.world"
  },
  "functions": {
    "api/**/*.js": {
      "memory": 1024,
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/sw.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=0, must-revalidate"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.vexachat.world/:path*"
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ],
  "trailingSlash": false,
  "cleanUrls": true,
  "github": {
    "enabled": true,
    "autoAlias": true,
    "autoJobCancelation": true
  }
}
*/

// ============================================================================
// robots.txt - للـ SEO
// ============================================================================
/*
# https://vexachat.world/robots.txt

User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /dashboard/
Disallow: /settings/
Disallow: /chat/
Disallow: /video-call/

# Sitemaps
Sitemap: https://vexachat.world/sitemap.xml
Sitemap: https://vexachat.world/sitemap-0.xml

# Crawl-delay
Crawl-delay: 1

# Google Bot
User-agent: Googlebot
Allow: /
Disallow: /api/

# Bing Bot
User-agent: Bingbot
Allow: /
Disallow: /api/
*/

// ============================================================================
// sitemap.xml - للـ SEO
// ============================================================================
/*
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://vexachat.world/</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://vexachat.world/auth/login</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vexachat.world/auth/signup</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://vexachat.world/about</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://vexachat.world/privacy</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://vexachat.world/terms</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>
*/

// ============================================================================
// DNS Records للدومين vexachat.world
// ============================================================================
/*
# A Records (IPv4)
Type: A
Name: @
Value: 76.76.21.21
TTL: 3600

Type: A
Name: www
Value: 76.76.21.21
TTL: 3600

# CNAME Records
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600

Type: CNAME  
Name: api
Value: api-vexachat.vercel.app
TTL: 3600

Type: CNAME
Name: cdn
Value: cdn-vexachat.vercel.app
TTL: 3600

# MX Records (للبريد الإلكتروني)
Type: MX
Name: @
Priority: 10
Value: mx1.forwardemail.net
TTL: 3600

Type: MX
Name: @
Priority: 20
Value: mx2.forwardemail.net
TTL: 3600

# TXT Records (للتحقق)
Type: TXT
Name: @
Value: "v=spf1 include:_spf.mx.cloudflare.net ~all"
TTL: 3600

Type: TXT
Name: _dmarc
Value: "v=DMARC1; p=quarantine; rua=mailto:admin@vexachat.world"
TTL: 3600

# CAA Records (للأمان)
Type: CAA
Name: @
Value: 0 issue "letsencrypt.org"
TTL: 3600

Type: CAA
Name: @
Value: 0 issue "comodoca.com"
TTL: 3600
*/