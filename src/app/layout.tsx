import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { ReactQueryProvider } from "@/components/react-query-provider"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import { Footer } from "@/components/footer"
import { InstallPWA } from "@/components/install-pwa"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "LearnAI - AI-Powered English Learning Platform",
  description: "Master English with personalized AI tutors, live instructors, and adaptive learning technology.",
  generator: 'LearnAI',
  manifest: '/manifest.json',
  keywords: ['english learning', 'AI tutor', 'language learning', 'online education', 'english practice'],
  authors: [{ name: 'LearnAI Team' }],
  creator: 'LearnAI',
  publisher: 'LearnAI',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://learnai.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/en-US',
      'es-ES': '/es-ES',
    },
  },
  openGraph: {
    title: 'LearnAI - AI-Powered English Learning',
    description: 'Master English with personalized AI tutors and adaptive learning technology.',
    url: 'https://learnai.com',
    siteName: 'LearnAI',
    images: [
      {
        url: '/web/icon-512.png',
        width: 512,
        height: 512,
        alt: 'LearnAI Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnAI - AI-Powered English Learning',
    description: 'Master English with personalized AI tutors and adaptive learning technology.',
    images: ['/web/icon-512.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/icon-192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/icon-512.png',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'LearnAI',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="LearnAI" />
        <meta name="application-name" content="LearnAI" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/web/icon-192.png" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('SW registered: ', registration);
                    })
                    .catch(function(registrationError) {
                      console.log('SW registration failed: ', registrationError);
                    });
                });
              }
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-background`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="learnmio-theme"
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages}>
          <ReactQueryProvider>
            <div className="min-h-screen bg-background text-foreground flex flex-col">
              <div className="flex-1">
                <AuthProvider>{children}</AuthProvider>
              </div>
              <Footer />
              <InstallPWA />
            </div>
          </ReactQueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
