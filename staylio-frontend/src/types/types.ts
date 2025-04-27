export type TWhere = {
  id: number;
  name: string;
  description?: string;
};
export type TProperty = {
  id: string;
  location: string;
  dates: string;
  price: number;
  nights: number;
  isFavorite: boolean;
  rating: number | null;
  images: string[];
};

export type TReservation = {
  id: string;
  propertyName: string;
  imageUrl: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfDays: number;
  numberOfNights: number;
  numberOfGuests: number;
  totalPrice: number;
};

export type TInbox = {
  id: string;
  name: string;
  date: string;
  teaser: string;
  isRead?: boolean;
};
