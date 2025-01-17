import '@/styles/globals.css'
import { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

import { siteConfig } from '@/config/site'
import { fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
// import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { ThemeProvider } from '@/components/theme-provider'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export const metadata: Metadata = {
  title: '兰兰女神生日快乐',
  description: '献给我们永远的女神——兰兰！',
  icons: {
    icon: '/古风女儿.JPG',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="zh" suppressHydrationWarning>
        <head suppressHydrationWarning>
          {/* 预加载关键资源 */}
          <link
            rel="preload"
            href="/background.jpg"
            as="image"
            type="image/jpeg"
          />
          <link
            rel="preload"
            href="/birthdaysong.MP4"
            as="video"
          />
        </head>
        <body
          suppressHydrationWarning
          className={cn(
            inter.className,
            'min-h-screen bg-background font-sans antialiased',
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              {/* SiteHeader Example, you can remove it.  */}
              {/* <SiteHeader /> */}
              <div className="flex-1">{children}</div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
