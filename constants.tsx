
import { Product } from './types';

export const COLORS = {
  primary: '#0F172A', // Slate 900
  accent: '#D4AF37',  // Soft Gold
  background: '#FAFAFA',
  surface: '#FFFFFF',
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Luminal Pro Headphones',
    price: 349.99,
    description: 'Noise-canceling studio-grade wireless headphones with titanium drivers.',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    stock: 12,
    isNew: true
  },
  {
    id: '2',
    name: 'Vortex Sapphire Watch',
    price: 899.00,
    description: 'A masterpiece of Swiss engineering with a scratch-resistant sapphire crystal.',
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    stock: 5
  },
  {
    id: '3',
    name: 'Nebula Curved Display',
    price: 1299.99,
    description: '38-inch ultrawide OLED display with 240Hz refresh rate and true-black technology.',
    category: 'Monitors',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    stock: 8
  },
  {
    id: '4',
    name: 'Ghost Mechanical Keyboard',
    price: 249.00,
    description: 'Seamless magnesium alloy chassis with custom hotswappable optical switches.',
    category: 'Peripherals',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    stock: 20,
    isNew: true
  },
  {
    id: '5',
    name: 'Aero Minimal Laptop',
    price: 1599.00,
    description: 'The thinnest laptop in the world with zero compromises on performance.',
    category: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    rating: 4.9,
    stock: 3
  },
  {
    id: '6',
    name: 'Eos Smart Speaker',
    price: 199.00,
    description: 'Omnidirectional high-fidelity audio with integrated AI voice control.',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=800&q=80',
    rating: 4.5,
    stock: 15
  },
  {
    id: '7',
    name: 'Titanium VR Goggles',
    price: 1499.00,
    description: 'Next-gen mixed reality headset with dual 4K micro-OLED panels.',
    category: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=800&q=80',
    rating: 4.8,
    stock: 4,
    isNew: true
  },
  {
    id: '8',
    name: 'Onyx Pro Camera',
    price: 2899.00,
    description: 'Medium format mirrorless system with unmatched color depth.',
    category: 'Photography',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    stock: 2
  },
  {
    id: '9',
    name: 'Zenith Desk Lamp',
    price: 450.00,
    description: 'Biometric lighting that adapts to your circadian rhythm.',
    category: 'Home Office',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&w=800&q=80',
    rating: 4.7,
    stock: 25,
    isNew: true
  },
  {
    id: '10',
    name: 'Prism Soundbar',
    price: 799.00,
    description: 'Spatial audio system with 11.1.4 Dolby Atmos support.',
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    rating: 4.6,
    stock: 9
  }
];
