import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import Sidebar from '@/components/Sidebar'
import { cn } from '@/lib/utils'
import { Toaster } from 'sonner'
import { BackendProvider } from '@/lib/backendContext'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Xplora - NASA Space Apps',
  description: 'Exoplanet exploration and discovery platform',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(`${geistSans.variable} ${geistMono.variable} antialiased bg-secondary`)}>
          {/* NextThemesProvider must be inside <body> */}
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
          >
            <BackendProvider>
              <Navbar />
              <div className='hidden md:flex mt-16 w-20 flex-col fixed inset-y-0 z-40'>
                <Sidebar />
              </div>

              <main className="pt-16">
                {children}
                <Toaster />
              </main>
            </BackendProvider>
          </NextThemesProvider>
      </body>
    </html>
  )
}
