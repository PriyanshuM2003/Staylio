export type TWhere = {
  id: number;
  name: string;
  description?: string;
};
export type Property = {
  location: string;
  distance: string;
  dates: string;
  price: string;
  nights: number;
  isFavorite: boolean;
  rating: number | null;
  images: string[];
};
