export type TWhere = {
  id: number;
  name: string;
  description?: string;
};
// Property.ts

export type TPropertyImage = {
  id?: string;
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
  country_code: string;
  category: string;
  landlord: string; // You can expand to a `User` type if needed
  created_at: string; // ISO date string
  image_urls?: string[]; // If calling the `image_urls()` method in a serializer
  images?: TPropertyImage[]; // If including nested image data
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
