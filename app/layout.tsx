import type { Metadata } from 'next'
import { DM_Sans, Space_Mono, Oswald } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-sans'
});
const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-mono'
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-serif'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'KAMPER | Outdoor Cooking System',
  description: 'The compact outdoor cooking system for car campers. Transform from portable box to full prep-and-cook station in seconds. Buy, rent, or rent-to-own.',
  generator: 'v0.app',
  openGraph: {
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'KAMPER' }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${dmSans.variable} ${spaceMono.variable} ${oswald.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
