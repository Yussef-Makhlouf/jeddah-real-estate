import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "مشروع 24 - حي الزهراء | امتلك منزل العمر في جدة",
  description: "مشروع سكني متميز في حي الزهراء بجدة بأسعار استثنائية تبدأ من 775,000 ﷼ فقط",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#f59e0b" />
        <meta property="og:title" content="مشروع 24 - حي الزهراء | امتلك منزل العمر في جدة" />
        <meta
          property="og:description"
          content="مشروع سكني متميز في حي الزهراء بجدة بأسعار استثنائية تبدأ من 775,000 ﷼ فقط"
        />
        <meta property="og:image" content="/placeholder.svg?height=1200&width=1200&text=مشروع 24 - حي الزهراء" />
        <meta property="og:url" content="https://example.com/project24" />
        <meta property="og:type" content="website" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'