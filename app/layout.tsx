import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "مشروع راف 24 - حي الزهراء | شقق للبيع في جدة",
  description: "امتلك شقتك في مشروع راف 24 السكني المتميز في حي الزهراء بجدة. شقق فاخرة بمساحات مختلفة وتشطيبات راقية تبدأ من 830,000 ريال. موقع استراتيجي، تصميم عصري، وضمانات حصرية",
  keywords: "شقق للبيع في جدة, حي الزهراء, مشروع راف 24, عقارات جدة, شقق تمليك, استثمار عقاري, راف العقارية",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  generator: 'RAF Real Estate',
  authors: [{ name: "RAF Real Estate" }],
  applicationName: "مشروع راف 24",
  robots: "index, follow",
  canonical: "https://raf24.sa",
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
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#34222e" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://raf24.sa" />
        <meta property="og:title" content="مشروع راف 24 - حي الزهراء | شقق للبيع في جدة" />
        <meta property="og:description" content="امتلك شقتك في مشروع راف 24 السكني المتميز في حي الزهراء بجدة. شقق فاخرة بمساحات مختلفة وتشطيبات راقية تبدأ من 830,000 ريال" />
        <meta property="og:image" content="https://raf24.sa/og-image.jpg" />
        <meta property="og:locale" content="ar_SA" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://raf24.sa" />
        <meta name="twitter:title" content="مشروع راف 24 - حي الزهراء | شقق للبيع في جدة" />
        <meta name="twitter:description" content="امتلك شقتك في مشروع راف 24 السكني المتميز في حي الزهراء بجدة. شقق فاخرة بمساحات مختلفة وتشطيبات راقية تبدأ من 830,000 ريال" />
        <meta name="twitter:image" content="https://raf24.sa/twitter-image.jpg" />

        {/* Additional SEO tags */}
        <meta name="geo.region" content="SA-02" />
        <meta name="geo.placename" content="Jeddah" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
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