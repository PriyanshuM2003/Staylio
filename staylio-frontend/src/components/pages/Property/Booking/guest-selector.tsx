"use client"

import { Button } from "@/components/ui/button"

type GuestType = "adults" | "children" | "infants" | "pets"

interface GuestSelectorProps {
  type: GuestType
  label: string
  description?: string
  value: number
  onChange: (increment: boolean) => void
  min?: number
  showServiceAnimalLink?: boolean
}

const GuestSelector = ({
  type,
  label,
  description,
  value,
  onChange,
  min = 0,
  showServiceAnimalLink = false,
}: GuestSelectorProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">{label}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
        {showServiceAnimalLink && (
          <Button variant="link" className="p-0 h-auto text-sm underline" type="button">
            Bringing a service animal?
          </Button>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8"
          onClick={() => onChange(false)}
          disabled={value === min}
          type="button"
        >
          -
        </Button>
        <span className="w-5 text-center">{value}</span>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8"
          onClick={() => onChange(true)}
          type="button"
        >
          +
        </Button>
      </div>
    </div>
  )
}

export default GuestSelector
