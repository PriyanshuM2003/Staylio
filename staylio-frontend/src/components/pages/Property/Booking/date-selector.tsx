"use client"

import { forwardRef } from "react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronRight } from "lucide-react"
import { formatDateDisplay } from "@/lib/booking-utils"

interface DateSelectorProps {
  label: string
  value: Date | null
  onSelect: (date: Date | undefined) => void
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  disabled?: (date: Date) => boolean
}

const DateSelector = forwardRef<HTMLButtonElement, DateSelectorProps>(
  ({ label, value, onSelect, isOpen, onOpenChange, disabled }, ref) => {
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
          />
        </PopoverContent>
      </Popover>
    )
  },
)

DateSelector.displayName = "DateSelector"

export default DateSelector
