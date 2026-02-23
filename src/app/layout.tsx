import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://roadtripalberta.ca'),
  title: {
    default: 'Road Trip Alberta | Premium Private Tours & Transfers',
    template: '%s | Road Trip Alberta',
  },
  description:
    'Premium private tours, airport transfers, and chartered transportation across Alberta. Banff private transfers, Jasper sightseeing, Calgary to Icefields Parkway.',
  keywords: [
    'Road Trip Alberta',
    'Banff Private Transfers',
    'Jasper Sightseeing',
    'Alberta Private Tours',
    'Icefields Parkway Tour',
    'Calgary Airport Shuttle',
    'Drumheller Day Trip',
    'Alberta Chartered Transportation',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: 'https://roadtripalberta.ca',
    siteName: 'Road Trip Alberta',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Road Trip Alberta — Icefields Parkway',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Road Trip Alberta | Premium Private Tours',
    description:
      'Banff private transfers, Jasper sightseeing, and chartered events across Alberta.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  alternates: {
    canonical: 'https://roadtripalberta.ca',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en-CA"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
