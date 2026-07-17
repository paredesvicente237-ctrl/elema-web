export type Product = {
  id: string;
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  price?: number;
  previousPrice?: number;
  priceOnRequest?: boolean;
  images: string[];
  materials: string[];
  dimensions: string;
  finishes: string[];
  features: string[];
  estimatedTime: string;
  featured: boolean;
  available: boolean;
  customizable: boolean;
  tag: string;
  shipping: string;
  demo?: boolean;
};

export const products: Product[] = [
  {
    id: 'demo-01',
    slug: 'cocina-architectural-aurora',
    name: 'Cocina Architectural Aurora',
    category: 'Cocinas',
    shortDescription: 'Diseño cinético con paneles de acero y piedra.',
    description: 'Configuración referencial de cocina de alta gama con una composición precisa en acero, piedra y mármol.',
    price: 4200000,
    previousPrice: 4600000,
    images: ['/images/cocina-aurora.png', '/images/cocina-aurora-detalle.png'],
    materials: ['Acero', 'Piedra', 'Mármol'],
    dimensions: '3.2 m x 4.6 m',
    finishes: ['Brillante', 'Mate', 'Piedra natural'],
    features: ['Diseño a medida', 'Muebles metálicos', 'Encendido integrado'],
    estimatedTime: '10 a 12 semanas',
    featured: true,
    available: true,
    customizable: false,
    tag: 'Disponible',
    shipping: 'Despacho coordinado para Santiago y regiones.',
    demo: true,
  },
  {
    id: 'parrilla-lumen',
    slug: 'parrilla-mediterranea-lumen',
    name: 'Parrilla Mediterránea Lumen',
    category: 'Parrillas',
    shortDescription: 'Parrilla premium para patios de alto nivel.',
    description: 'Una parrilla de presencia arquitectónica, concebida para transformar el fuego en el centro de la experiencia exterior.',
    price: 799990,
    images: ['/images/parrilla-lumen.png'],
    materials: ['Acero inoxidable', 'Piedra', 'Cromo'],
    dimensions: '2.4 m x 1.2 m',
    finishes: ['Brillo satinado', 'Textura natural'],
    features: ['Diseño personalizado', 'Altura ajustable', 'Integración de fuego'],
    estimatedTime: 'A confirmar al momento de la compra',
    featured: true,
    available: true,
    customizable: false,
    tag: 'Disponible',
    shipping: 'Cotización de despacho según ubicación.',
  },
  {
    id: 'demo-03',
    slug: 'campana-vertical-noctis',
    name: 'Campana Vertical Noctis',
    category: 'Campanas',
    shortDescription: 'Campana de presencia con acabado de precisión.',
    description: 'Configuración referencial de campana vertical con una expresión sobria, técnica y arquitectónica.',
    price: 1850000,
    images: ['/images/campana-noctis.png'],
    materials: ['Acero', 'Vidrio', 'Madera'],
    dimensions: '1.8 m x 0.6 m',
    finishes: ['Mate', 'Pulido'],
    features: ['Extracción silenciosa', 'Diseño vertical', 'Adaptable'],
    estimatedTime: '6 a 8 semanas',
    featured: false,
    available: true,
    customizable: false,
    tag: 'Disponible',
    shipping: 'Despacho disponible en Chile continental.',
    demo: true,
  },
];

export const collectionSlugs = ['cocinas', 'parrillas', 'campanas', 'soluciones-personalizadas'];
export const featuredProducts = products.filter((product) => product.featured);
export const availableProducts = products.filter((product) => product.available && !product.demo && typeof product.price === 'number');
