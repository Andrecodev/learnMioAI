import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import { ReactQueryProvider } from "@/components/react-query-provider"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"

const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "LearnMioAI - AI-Powered English Learning Platform",
//   description: "Master English with personalized AI tutors, live instructors, and adaptive learning technology.",
//   generator: 'andrecodev'
// }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const messages = await getMessages()
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
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
            <div className="min-h-screen bg-background text-foreground">
              <AuthProvider>{children}</AuthProvider>
            </div>
          </ReactQueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
