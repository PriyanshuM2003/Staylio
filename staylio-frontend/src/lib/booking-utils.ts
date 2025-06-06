export const calculateNights = (checkIn: Date | null, checkOut: Date | null): number => {
  if (!checkIn || !checkOut) return 1
  return Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
}

export const calculateBasePrice = (pricePerNight: number, nights: number): number => {
  return pricePerNight * nights
}

export const calculateServiceFee = (basePrice: number): number => {
  return Math.round(basePrice * 0.05)
}

export const calculateTotalPrice = (pricePerNight: number, nights: number): number => {
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
  let guestLabel = "guest"
  if (totalGuests > 1) {
    guestLabel = "guests"
  }
  let display = totalGuests > 0 ? `${totalGuests} ${guestLabel}` : "Add guests"

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
