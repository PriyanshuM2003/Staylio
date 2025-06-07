export type TUser = {
  id: string;
  username: string;
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
  property: TProperty;
  start_date: Date;
  end_date: Date;
  number_of_nights: number;
  total_price: number;
  guests: number;
};

export type TInbox = {
  id: string;
  name: string;
  date: string;
  teaser: string;
  isRead?: boolean;
};
