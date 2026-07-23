import type { Metadata } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { AuthUrlHandler } from '@/components/auth-url-handler';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-cormorant',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000'),
  ),
  title: {
    default: 'ELEM | Cada elemento define el espacio',
    template: '%s | ELEM',
  },
  description: 'ELEM diseña los elementos de materia, fuego y aire que componen cocinas, parrillas, campanas y soluciones arquitectónicas.',
  keywords: ['cocinas a medida', 'parrillas premium', 'campanas de acero', 'mobiliario inoxidable', 'fabricación en acero', 'diseño a medida Chile'],
  openGraph: {
    title: 'ELEM | Cada elemento define el espacio',
    description: 'Elementos de materia, fuego y aire para cocinas, parrillas, campanas y soluciones arquitectónicas.',
    type: 'website',
    locale: 'es_CL',
    images: ['/images/elema-generated/cocina-costera-hero.webp'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${manrope.variable} ${cormorant.variable}`}>
      <body>
        <AuthUrlHandler />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
