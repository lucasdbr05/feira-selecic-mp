export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  seller: string;
  fairName: string;
  location: string;
  distance: number;
  available: boolean;
  rating: number;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}