"use client"
import { forwardRef, memo } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronRight } from "lucide-react"
import { formatDateDisplay, isDateReserved } from "@/lib/booking-utils"
import { usePropertyReservations } from "@/hooks/api-hooks"

interface DateSelectorProps {
  label: string
  value: Date | null
  onSelect: (date: Date | undefined) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  disabled?: (date: Date) => boolean
  propertyId: string
}

const DateSelector = memo(
  forwardRef<HTMLButtonElement, DateSelectorProps>(
    ({ label, value, onSelect, isOpen, onOpenChange, disabled, propertyId }, ref) => {
      const { data: reservations } = usePropertyReservations(propertyId)

      const isDateInReservation = (date: Date): boolean => {
        return isDateReserved(date, reservations)
      }

      return (
        <Popover open={isOpen} onOpenChange={onOpenChange}>
          <PopoverTrigger asChild>
            <Button ref={ref} variant="outline" className="w-full justify-between text-left h-auto py-3" type="button">
              <div>
                <div className="font-medium text-sm">{label}</div>
                <div className="text-sm text-muted-foreground">{formatDateDisplay(value)}</div>
              </div>
              {isOpen && <ChevronRight className="h-4 w-4 rotate-90" />}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-max p-0 rounded-xl" align="center">
            <Calendar
              mode="single"
              selected={value || undefined}
              onSelect={onSelect}
              className="rounded-md border"
              disabled={disabled}
              modifiers={{
                reserved: (date) => isDateInReservation(date),
              }}
              modifiersStyles={{
                reserved: {
                  backgroundColor: "#fee2e2",
                  color: "#dc2626",
                  textDecoration: "line-through",
                },
              }}
            />
          </PopoverContent>
        </Popover>
      )
    },
  ),
)

DateSelector.displayName = "DateSelector"

export default DateSelector
