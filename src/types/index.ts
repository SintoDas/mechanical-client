export interface TProduct {
  _id:string,
  title: string;
  price: string | number; // Accept both string and number
  description: string;
  availableQuantity: string | number; // Accept both string and number
  rating: string | number; // Accept both string and number
  image: string;
  brand: string;
}