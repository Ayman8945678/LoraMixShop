
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: number;
  stock: number;
  isNew?: boolean;
  created_at?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  isAdmin: boolean;
}

export enum Page {
  HOME = 'home',
  SHOP = 'shop',
  CART = 'cart',
  CHECKOUT = 'checkout',
  PRODUCT_DETAIL = 'product_detail',
  ORDERS = 'orders',
  SETTINGS = 'settings',
  LOGIN = 'login',
  PROFILE = 'profile'
}
