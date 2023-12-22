export interface Item {
  id: string;
  title: string;
  brand: string;
  img: string;
  gallery: string[];
  price: number;
  priceId: string;
  quantity: number;
  gender: string;
  rating: number;
}

export interface Filters {
  gender: { [key: string]: boolean };
  brand: { [key: string]: boolean };
  price: { [key: string]: boolean };
}

export type Sorting = "sortDefault" | "sortPriceLtoH" | "sortPriceHtoL";
