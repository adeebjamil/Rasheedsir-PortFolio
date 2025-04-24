import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MagneticCursor from './components/MagneticCursor'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Lovosis Technology Private Limited',
  description: 'Professional Technology Solutions',
  icons: {
    icon: [
      { url: '/logo1.png', type: 'image/png' },
    ],
    apple: [
      { url: '/logo1.png' },
    ],
    shortcut: ['/logo1.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`} suppressHydrationWarning={true}>
        <MagneticCursor />
        <Navbar />
        <main className="min-h-screen relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
