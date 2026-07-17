import type { MetadataRoute } from 'next';
import { products } from '@/data/products';

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000');

const routes = ['', '/tienda', '/colecciones', '/colecciones/cocinas', '/colecciones/parrillas', '/colecciones/campanas', '/colecciones/soluciones-personalizadas', '/diseno-a-medida', '/profesionales', '/nosotros', '/contacto', '/despachos', '/privacidad', '/terminos'];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified })),
    ...products.map((product) => ({ url: `${baseUrl}/producto/${product.slug}`, lastModified })),
  ];
}
