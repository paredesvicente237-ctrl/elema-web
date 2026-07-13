import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'http://localhost:3000', lastModified: new Date() },
    { url: 'http://localhost:3000/tienda', lastModified: new Date() },
    { url: 'http://localhost:3000/colecciones', lastModified: new Date() },
    { url: 'http://localhost:3000/contacto', lastModified: new Date() },
  ];
}
