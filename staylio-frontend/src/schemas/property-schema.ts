import { z } from "zod";

export const propertyFormSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }),
  description: z
    .string()
    .min(20, { message: "Description must be at least 20 characters." }),
  price_per_night: z.coerce
    .number()
    .positive({ message: "Price must be a positive number." }),
  bedrooms: z.coerce
    .number()
    .int()
    .positive({ message: "Bedrooms must be a positive number." }),
  bathrooms: z.coerce
    .number()
    .int()
    .positive({ message: "Bathrooms must be a positive number." }),
  guests: z.coerce
    .number()
    .int()
    .positive({ message: "Guests must be a positive number." }),
  country: z.string().min(2, { message: "Country is required." }),
  state: z.string().min(1, { message: "State is required." }),
  category: z.string().min(1, { message: "Category is required." }),
});

export type PropertyFormValues = z.infer<typeof propertyFormSchema>;
