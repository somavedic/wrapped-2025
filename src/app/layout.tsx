import type { Metadata } from "next";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleContext";
import { HtmlLangUpdater } from "@/components/HtmlLangUpdater";
import { getRegionBySlug } from "@/lib/locales";
import { getTranslations } from "@/lib/translations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type Props = {
  searchParams: Promise<{ lang?: string }>;
};

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const params = await searchParams;
  const lang = params?.lang || 'us-ca';
  const region = getRegionBySlug(lang);
  const t = getTranslations(region?.language || 'en');
  
  return {
    title: t.metaTitle,
    description: t.metaDescription,
    icons: {
      icon: [
        { url: '/favicon-32x32.png?v=2', sizes: '32x32', type: 'image/png' },
        { url: '/favicon-16x16.png?v=2', sizes: '16x16', type: 'image/png' },
      ],
      apple: '/apple-touch-icon.png?v=2',
      shortcut: '/favicon.ico?v=2',
    },
    openGraph: {
      title: t.metaTitle,
      description: t.metaDescription,
      images: [{ url: '/social-share.png', width: 1200, height: 630 }],
      locale: region?.language || 'en',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t.metaTitle,
      description: t.metaDescription,
      images: ['/social-share.png'],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-53BW2ML3" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          id="umami-analytics"
          src="https://cloud.umami.is/script.js"
          data-website-id="d7002f45-23e4-4a35-a2c3-42ecf39a6645"
          {...(process.env.NODE_ENV === 'production' && {
            'data-domains': 'somavedicworld.com,somavedic-2025-future.vercel.app'
          })}
          strategy="afterInteractive"
        />
        <LocaleProvider>
          <HtmlLangUpdater />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
