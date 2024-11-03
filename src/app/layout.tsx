import { Toaster } from '@/components/ui/toaster';
import { ensureStartsWith } from '@/lib/utils';
import localFont from 'next/font/local';
import './globals.css';

const { SITE_NAME, GITHUB_CREATOR, PORFOLIO_SITE } = process.env;
const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';
const githubCreator = GITHUB_CREATOR!;
const portfolioSite = PORFOLIO_SITE
  ? ensureStartsWith(PORFOLIO_SITE, 'https://')
  : undefined;

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  ...(githubCreator &&
  portfolioSite && {
    github: {
      card: 'summary_large_image',
      creator: githubCreator,
      site: portfolioSite,
    },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
