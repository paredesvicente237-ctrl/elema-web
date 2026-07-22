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

type QuoteProductSeed = Pick<Product, 'id' | 'slug' | 'name' | 'category' | 'shortDescription' | 'description' | 'materials' | 'dimensions' | 'finishes' | 'features'> & {
  image: string;
};

function createQuoteProduct(seed: QuoteProductSeed): Product {
  return {
    id: seed.id,
    slug: seed.slug,
    name: seed.name,
    category: seed.category,
    shortDescription: seed.shortDescription,
    description: seed.description,
    priceOnRequest: true,
    images: [seed.image],
    materials: seed.materials,
    dimensions: seed.dimensions,
    finishes: seed.finishes,
    features: seed.features,
    estimatedTime: 'A confirmar durante la cotización',
    featured: false,
    available: false,
    customizable: false,
    tag: 'A cotizar',
    shipping: 'Cotización de despacho según ubicación.',
    demo: true,
  };
}

const charcoalSeries = [
  {
    slug: 'parrilla-pro-inoxidable',
    name: 'Parrilla PRO Inoxidable',
    image: '/images/parrilla-lumen.png',
    materials: ['Acero inoxidable'],
    shortDescription: 'Parrilla a carbón de frente extendido en acero inoxidable.',
    description: 'Una configuración de mayor frente útil para proyectos exteriores que requieren presencia material y una superficie de cocción amplia.',
    sizes: [['S', '110 x 50 cm'], ['M', '120 x 50 cm'], ['L', '130 x 50 cm']],
  },
  {
    slug: 'parrilla-inoxidable',
    name: 'Parrilla Inoxidable',
    image: '/images/elema-generated/parrilla-montana-hero.webp',
    materials: ['Acero inoxidable'],
    shortDescription: 'Parrilla a carbón compacta en acero inoxidable.',
    description: 'Una pieza de proporción contenida para integrar cocción a carbón en quinchos y espacios exteriores de distintas escalas.',
    sizes: [['S', '80 x 50 cm'], ['M', '90 x 50 cm'], ['L', '100 x 50 cm']],
  },
  {
    slug: 'parrilla-clasica',
    name: 'Parrilla Clásica',
    image: '/images/parrilla-lumen.png',
    materials: ['Acero al carbono'],
    shortDescription: 'Parrilla a carbón de expresión directa en acero al carbono.',
    description: 'Una configuración esencial que concentra la experiencia de fuego en una estructura sobria y de lectura técnica.',
    sizes: [['S', '80 x 50 cm'], ['M', '90 x 50 cm'], ['L', '100 x 50 cm']],
  },
] as const;

const charcoalProducts: Product[] = charcoalSeries.flatMap((series) => series.sizes.map(([size, dimensions]) => createQuoteProduct({
  id: `concept-${series.slug}-${size.toLowerCase()}`,
  slug: `${series.slug}-${size.toLowerCase()}`,
  name: `${series.name} ${size}`,
  category: 'Parrillas',
  shortDescription: series.shortDescription,
  description: series.description,
  image: series.image,
  materials: [...series.materials],
  dimensions,
  finishes: ['Terminación a definir'],
  features: ['Cocción a carbón', 'Formato empotrable', 'Especificación técnica por confirmar'],
})));

charcoalProducts.push(
  createQuoteProduct({
    id: 'concept-parrilla-multiuso',
    slug: 'parrilla-multiuso-130x80',
    name: 'Parrilla Multiuso',
    category: 'Parrillas',
    shortDescription: 'Superficie amplia para distintas configuraciones de cocción a carbón.',
    description: 'Una parrilla de gran formato pensada para organizar distintas zonas de preparación dentro de una sola pieza.',
    image: '/images/elema-generated/parrilla-montana-hero.webp',
    materials: ['Materialidad a confirmar'],
    dimensions: '130 x 80 cm',
    finishes: ['Terminación a definir'],
    features: ['Cocción a carbón', 'Formato de gran superficie', 'Especificación técnica por confirmar'],
  }),
  createQuoteProduct({
    id: 'concept-parrilla-carbon-portatil',
    slug: 'parrilla-carbon-portatil',
    name: 'Parrilla a Carbón Portátil',
    category: 'Parrillas',
    shortDescription: 'Formato transportable para cocinar a carbón fuera del quincho.',
    description: 'Una solución compacta concebida para trasladar la experiencia de fuego sin depender de una instalación permanente.',
    image: '/images/elema-generated/parrilla-montana-hero.webp',
    materials: ['Materialidad a confirmar'],
    dimensions: 'Formato portátil · medidas a confirmar',
    finishes: ['Terminación a definir'],
    features: ['Cocción a carbón', 'Formato portátil', 'Especificación técnica por confirmar'],
  }),
  createQuoteProduct({
    id: 'concept-parrilla-montana',
    slug: 'parrilla-de-montana',
    name: 'Parrilla de Montaña',
    category: 'Parrillas',
    shortDescription: 'Parrilla compacta para cocinar directamente sobre el fuego.',
    description: 'Una pieza esencial de escala reducida, concebida para escenarios exteriores donde importan la movilidad y el contacto directo con el fuego.',
    image: '/images/elema-generated/parrilla-montana-hero.webp',
    materials: ['Materialidad a confirmar'],
    dimensions: 'Formato compacto · medidas a confirmar',
    finishes: ['Terminación a definir'],
    features: ['Cocción a carbón', 'Formato compacto', 'Especificación técnica por confirmar'],
  }),
);

const hoodSeries = [
  {
    slug: 'campana-conica',
    name: 'Campana Cónica',
    image: '/images/campana-noctis.png',
    shortDescription: 'Campana de geometría cónica para proyectos de quincho.',
    description: 'Una pieza suspendida de lectura escultórica que concentra la extracción sobre el área de fuego.',
  },
  {
    slug: 'campana-mediterranea',
    name: 'Campana Mediterránea',
    image: '/images/elema-generated/elema-concepto-campana-suspendida-v1.png',
    shortDescription: 'Campana de volumen longitudinal y presencia arquitectónica.',
    description: 'Una campana de desarrollo horizontal concebida para acompañar parrillas de distintos frentes dentro de una composición integrada.',
  },
] as const;

const hoodSizes = [['S', '110 x 70 x 80 cm'], ['M', '165 x 70 x 80 cm'], ['L', '220 x 70 x 80 cm'], ['XL', '275 x 70 x 80 cm']] as const;

const hoodProducts: Product[] = hoodSeries.flatMap((series) => hoodSizes.map(([size, dimensions]) => createQuoteProduct({
  id: `concept-${series.slug}-${size.toLowerCase()}`,
  slug: `${series.slug}-${size.toLowerCase()}`,
  name: `${series.name} ${size}`,
  category: 'Campanas',
  shortDescription: series.shortDescription,
  description: series.description,
  image: series.image,
  materials: ['Materialidad a confirmar'],
  dimensions,
  finishes: ['Terminación a definir'],
  features: ['Formato de extracción', 'Configuración según proyecto', 'Especificación técnica por confirmar'],
})));

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
    shortDescription: 'Arquitectura de fuego en acero inoxidable, piedra y cromo.',
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
  ...charcoalProducts,
  ...hoodProducts,
];

export const collectionSlugs = ['cocinas', 'parrillas', 'campanas', 'soluciones-personalizadas'];
export const featuredProducts = products.filter((product) => product.featured);
export const availableProducts = products.filter((product) => product.available && !product.demo && typeof product.price === 'number');
