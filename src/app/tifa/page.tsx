import type {Metadata} from 'next';
import {Fraunces, Inter} from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'JASUTIM × TIFA — From Trash to Treasure',
  description: 'A 10-minute story about waste, circular economy, and community in Indonesia.',
  robots: {index: false, follow: false},
};

export default function TifaPage() {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`} suppressHydrationWarning>
      <body className="tifa-body">
        <TifaStory />
      </body>
    </html>
  );
}
