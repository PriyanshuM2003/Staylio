"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { whereData } from "@/dummyData/whereData";
import { Calendar } from "@/components/ui/calendar";

export default function FilterBar() {
  // Track which popover is currently open
  const [activePopover, setActivePopover] = useState<
    "where" | "checkin" | "checkout" | "who" | null
  >(null);

  // References to popover triggers for programmatic focus
  const whereRef = useRef<HTMLButtonElement>(null);
  const checkInRef = useRef<HTMLButtonElement>(null);
  const checkOutRef = useRef<HTMLButtonElement>(null);
  const whoRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  // Search state
  const [searchInput, setSearchInput] = useState("");

  const filteredResults = whereData.filter((result) =>
    result.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Date selection state
  const [selectedDates, setSelectedDates] = useState<{
    checkIn: Date | null;
    checkOut: Date | null;
  }>({
    checkIn: null,
    checkOut: null,
  });

  const [date, setDate] = useState<Date | undefined>(new Date());

  // Guest selection state
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // Effect to focus on the search input when the Where popover opens
  useEffect(() => {
    if (activePopover === "where" && searchInputRef.current) {
      // Small delay to ensure the popover is fully open
      const timeoutId = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [activePopover]);

  const handleGuestChange = (type: keyof typeof guests, increment: boolean) => {
    setGuests((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  const totalGuests = guests.adults + guests.children;

  // Handle popover state changes
  const handlePopoverChange = (
    popover: typeof activePopover,
    isOpen: boolean
  ) => {
    if (isOpen) {
      setActivePopover(popover);
    } else if (activePopover === popover) {
      setActivePopover(null);
    }
  };

  // Handle location selection
  const handleLocationSelect = (location: string) => {
    setSearchInput(location);
    // Move to check-in after selecting location
    setActivePopover("checkin");
    checkInRef.current?.click();
  };

  return (
    <div className="flex items-center border gap-2 bg-gray-100 rounded-full shadow-sm divide-x hover:shadow-md">
      {/* Where Section */}
      <Popover
        open={activePopover === "where"}
        onOpenChange={(open) => handlePopoverChange("where", open)}
      >
        <PopoverTrigger asChild className="cursor-pointer hover:bg-white">
          <button
            ref={whereRef}
            className={cn(
              "px-6 py-2 text-left border-none rounded-full focus:outline-none",
              activePopover === "where" ? "bg-white shadow" : "bg-gray-100"
            )}
          >
            <div className="text-sm font-medium">Where</div>
            <div className="flex items-center gap-2">
              <Input
                ref={searchInputRef}
                type="text"
                placeholder="Search destinations"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border-0 p-0 h-auto text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                onClick={handleInputClick}
                onFocus={() => {
                  if (activePopover !== "where") {
                    setActivePopover("where");
                  }
                }}
              />
              <button
                className={cn(
                  "hover:bg-gray-300 cursor-pointer rounded-full p-0.5",
                  !searchInput && "hidden"
                )}
                onClick={() => setSearchInput("")}
              >
                <X size={16} className="z-50" />
              </button>
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-96 max-h-96 overflow-auto scrollbar-none p-4 rounded-3xl"
          align="start"
        >
          <div className="space-y-4">
            <h3 className={cn("font-medium", searchInput && "hidden")}>
              Suggested destinations
            </h3>
            <div className="grid gap-2">
              {filteredResults.length > 0 ? (
                filteredResults.map((result) => (
                  <Button
                    key={result.id}
                    variant="ghost"
                    className="justify-start h-auto py-2"
                    onClick={() => handleLocationSelect(result.name)}
                  >
                    <div className="text-left">
                      <div className="font-medium">{result.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {result.description}
                      </div>
                    </div>
                  </Button>
                ))
              ) : (
                <div className="text-sm text-muted-foreground px-2 py-4">
                  No matching destinations found.
                </div>
              )}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Check In Section */}
      <Popover
        open={activePopover === "checkin"}
        onOpenChange={(open) => handlePopoverChange("checkin", open)}
      >
        <PopoverTrigger asChild className="cursor-pointer hover:bg-white">
          <button
            ref={checkInRef}
            className={cn(
              "px-6 py-2 text-left rounded-full border-none focus:outline-none",
              activePopover === "checkin" ? "bg-white shadow" : "bg-gray-100"
            )}
          >
            <div className="text-sm font-medium">Check in</div>
            <div className="text-sm text-muted-foreground">
              {selectedDates.checkIn
                ? selectedDates.checkIn.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Add dates"}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-max p-0 rounded-3xl" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>

      {/* Check Out Section */}
      <Popover
        open={activePopover === "checkout"}
        onOpenChange={(open) => handlePopoverChange("checkout", open)}
      >
        <PopoverTrigger asChild className="cursor-pointer hover:bg-white">
          <button
            ref={checkOutRef}
            className={cn(
              "px-6 py-2 rounded-full text-left focus:outline-none",
              activePopover === "checkout" ? "bg-white shadow" : "bg-gray-100"
            )}
          >
            <div className="text-sm font-medium">Check out</div>
            <div className="text-sm text-muted-foreground">
              {selectedDates.checkOut
                ? selectedDates.checkOut.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                : "Add dates"}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-max p-0 rounded-3xl" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>

      {/* Who Section */}
      <Popover
        open={activePopover === "who"}
        onOpenChange={(open) => handlePopoverChange("who", open)}
      >
        <PopoverTrigger asChild className="cursor-pointer hover:bg-white">
          <div
            className={cn(
              "pl-6 pr-3 py-2 flex items-center gap-8 justify-between rounded-full text-left focus:outline-none",
              activePopover === "who" ? "bg-white shadow" : "bg-gray-100"
            )}
          >
            <button ref={whoRef} className="text-left">
              <div className="text-sm font-medium">Who</div>
              <div className="text-sm text-muted-foreground">
                {totalGuests > 0
                  ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                  : "Add guests"}
              </div>
            </button>
            <Button
              size="icon"
              variant="destructive"
              className="rounded-full z-50 cursor-pointer"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-4 rounded-3xl" align="start">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Adults</h3>
                <p className="text-sm text-muted-foreground">
                  Ages 13 or above
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => handleGuestChange("adults", false)}
                  disabled={guests.adults === 0}
                >
                  -
                </Button>
                <span className="w-5 text-center">{guests.adults}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => handleGuestChange("adults", true)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Children</h3>
                <p className="text-sm text-muted-foreground">Ages 2–12</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => handleGuestChange("children", false)}
                  disabled={guests.children === 0}
                >
                  -
                </Button>
                <span className="w-5 text-center">{guests.children}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => handleGuestChange("children", true)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Infants</h3>
                <p className="text-sm text-muted-foreground">Under 2</p>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => handleGuestChange("infants", false)}
                  disabled={guests.infants === 0}
                >
                  -
                </Button>
                <span className="w-5 text-center">{guests.infants}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => handleGuestChange("infants", true)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Pets</h3>
                <Button variant="link" className="p-0 h-auto text-sm underline">
                  Bringing a service animal?
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => handleGuestChange("pets", false)}
                  disabled={guests.pets === 0}
                >
                  -
                </Button>
                <span className="w-5 text-center">{guests.pets}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => handleGuestChange("pets", true)}
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Search Button */}
    </div>
  );
}
