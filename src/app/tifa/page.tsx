import type {Metadata} from 'next';
import {Fraunces, Inter, Noto_Sans_Thai} from 'next/font/google';
import {TifaStory} from './TifaStory';
import './tifa.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '900'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// Thai-capable webfont so the closing line (ขอบคุณครับ) renders reliably
// regardless of the presenter machine's installed system fonts.
const notoThai = Noto_Sans_Thai({
  subsets: ['thai'],
  weight: ['400', '600', '700'],
  variable: '--font-thai',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'JASUTIM × TIFA — From Trash to Treasure',
  description: 'A 10-minute story about waste, circular economy, and community in Indonesia.',
  robots: {index: false, follow: false},
};

export default function TifaPage() {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${notoThai.variable}`} suppressHydrationWarning>
      <body className="tifa-body">
        <TifaStory />
      </body>
    </html>
  );
}
