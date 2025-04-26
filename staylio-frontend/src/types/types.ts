export type TWhere = {
  id: number;
  name: string;
  description?: string;
};
export type Property = {
  id: string;
  location: string;
  dates: string;
  price: string;
  nights: number;
  isFavorite: boolean;
  rating: number | null;
  images: string[];
};
