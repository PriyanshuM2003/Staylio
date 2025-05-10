export type TSignupPayload = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type TLoginPayload = {
  email: string;
  password: string;
};
export type TCreatePropertyPayload = {
  title: string;
  description: string;
  price_per_night: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  country: string;
  state: string;
  category: string;
};

export type TUploadPropertyImagePayload = {
  property: string;
  image: File;
};
