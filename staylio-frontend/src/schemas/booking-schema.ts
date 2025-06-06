import { z } from "zod"

export const bookingSchema = z
  .object({
    checkIn: z.date({
      required_error: "Check-in date is required",
    }),
    checkOut: z.date({
      required_error: "Check-out date is required",
    }),
    guests: z.object({
      adults: z.number().min(1, "At least 1 adult is required"),
      children: z.number().min(0),
      infants: z.number().min(0),
      pets: z.number().min(0),
    }),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  })

export type BookingFormData = z.infer<typeof bookingSchema>
