import { AuthProvider } from '@/hooks/useAuth';
import { LanguageProvider } from '@/hooks/useLanguage';
import './globals.css';

export const metadata = {
  title: 'VeXa - Global Dating & Chat Platform | vexachat.world',
  description: 'Connect with amazing people worldwide. Modern dating and chat platform supporting multiple languages.',
  keywords: ['dating', 'chat', 'تعارف', 'دردشة', 'rencontre', 'citas', 'vexa', 'vexachat'],
  authors: [{ name: 'VeXa Team' }],
  metadataBase: new URL('https://vexachat.world'),
  alternates: {
    canonical: 'https://vexachat.world',
    languages: {
      'en': 'https://vexachat.world/en',
      'ar': 'https://vexachat.world/ar',
      'fr': 'https://vexachat.world/fr',
      'es': 'https://vexachat.world/es',
      'de': 'https://vexachat.world/de',
    },
  },
  openGraph: {
    title: 'VeXa - Connect with People Worldwide',
    description: 'Modern dating and chat platform supporting multiple languages',
    url: 'https://vexachat.world',
    siteName: 'VeXa',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'VeXa Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VeXa - Connect with People Worldwide',
    description: 'Modern dating and chat platform',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Additional SEO tags */}
        <link rel="canonical" href="https://vexachat.world" />
        <meta name="theme-color" content="#db2777" />
        
        {/* PWA tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="VeXa" />
        
        {/* Performance optimization */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        
        {/* Schema.org markup for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'VeXa',
              url: 'https://vexachat.world',
              description: 'Modern dating and chat platform supporting multiple languages',
              applicationCategory: 'SocialNetworkingApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
            }),
          }}
        />
      </head>
      <body className="bg-gray-50 min-h-screen antialiased">
        <LanguageProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}