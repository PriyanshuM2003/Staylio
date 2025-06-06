import type { TReservation } from "@/types/types"

export const calculateNights = (checkIn: Date | null, checkOut: Date | null): number => {
  if (!checkIn || !checkOut) return 0
  return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
}

export const calculateBasePrice = (pricePerNight: number, nights: number): number => {
  return pricePerNight * nights
}

export const calculateServiceFee = (basePrice: number): number => {
  return Math.round(basePrice * 0.05)
}

export const calculateTotalPrice = (pricePerNight: number, nights: number): number => {
  if (nights === 0) return 0
  const basePrice = calculateBasePrice(pricePerNight, nights)
  const serviceFee = calculateServiceFee(basePrice)
  return basePrice + serviceFee
}

export const formatGuestDisplay = (guests: {
  adults: number
  children: number
  infants: number
  pets: number
}): string => {
  const totalGuests = guests.adults + guests.children
  let display = totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}` : "Add guests"

  if (guests.infants > 0) {
    display += `, ${guests.infants} infant${guests.infants > 1 ? "s" : ""}`
  }

  if (guests.pets > 0) {
    display += `, ${guests.pets} pet${guests.pets > 1 ? "s" : ""}`
  }

  return display
}

export const formatDateDisplay = (date: Date | null): string => {
  return date ? date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Add date"
}

export const isDateReserved = (date: Date, reservations: TReservation[] | undefined): boolean => {
  if (!reservations || reservations.length === 0) return false

  const checkDate = new Date(date)
  checkDate.setHours(0, 0, 0, 0)
  const checkTime = checkDate.getTime()

  for (const reservation of reservations) {
    const startDate = new Date(reservation.start_date)
    const endDate = new Date(reservation.end_date)

    startDate.setHours(0, 0, 0, 0)
    endDate.setHours(0, 0, 0, 0)

    const startTime = startDate.getTime()
    const endTime = endDate.getTime()

    if (checkTime >= startTime && checkTime < endTime) {
      return true
    }
  }

  return false
}
