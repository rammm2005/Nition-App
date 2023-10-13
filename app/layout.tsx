import { ThemeProvider } from '@/components/providers/themes-provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Notion App',
  description: 'For Connected your workspace , more faster and Efisienly of Work',
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.svg",
        href: "/logo.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      }
    ]
  }


}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
            storageKey='RaNotion-Themes-2'
          >
            <Toaster position="bottom-center"/>
            {children}
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  )
}
