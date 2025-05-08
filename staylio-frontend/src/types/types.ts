export type TUser = {
  id: string;
  name: string;
  email: string;
  avatar_url: string;
};

export type TWhere = {
  id: number;
  name: string;
  description?: string;
};

export type TPropertyImage = {
  id: string | number;
  property: string;
  image: string;
  created_at: string;
};

export type TProperty = {
  id: string; // UUID
  title: string;
  description: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  country: string;
  state: string;
  category: string;
  landlord: TUser;
  created_at: string;
  images: TPropertyImage[];
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
