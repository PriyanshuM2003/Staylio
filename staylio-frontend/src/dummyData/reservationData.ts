import { TReservation } from "@/types/types";

export const reservationData: TReservation[] = [
  {
    id: "1",
    propertyName: "Property Name",
    imageUrl:
      "https://images.unsplash.com/photo-1589419896452-b460b8b390a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    checkInDate: "14/5/2025",
    checkOutDate: "20/5/2025",
    numberOfDays: 6,
    numberOfNights: 5,
    numberOfGuests: 2,
    totalPrice: 10000,
  },
  {
    id: "2",
    propertyName: "Another Property",
    imageUrl:
      "https://images.unsplash.com/photo-1589419896452-b460b8b390a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    checkInDate: "15/5/2025",
    checkOutDate: "21/5/2025",
    numberOfDays: 6,
    numberOfNights: 5,
    numberOfGuests: 2,
    totalPrice: 12000,
  },
];
