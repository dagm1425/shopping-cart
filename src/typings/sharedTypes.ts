export interface Item {
  id: string;
  title: string;
  brand: string;
  img: string;
  gallery: string[];
  price: number;
  quantity: number;
  gender: string;
  rating: number;
}

export interface Filters {
  gender: { [key: string]: boolean };
  brand: { [key: string]: boolean };
  price: { [key: string]: boolean };
}
