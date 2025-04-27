"use client";

import type React from "react";

import { useState, useRef, useEffect, useCallback } from "react";
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

type PopoverType = "where" | "checkin" | "checkout" | "who" | null;

export default function FilterBar() {
  // Track which popover is currently open
  const [activePopover, setActivePopover] = useState<PopoverType>(null);

  // References to popover triggers for programmatic focus
  const whereRef = useRef<HTMLButtonElement>(null);
  const checkInRef = useRef<HTMLButtonElement>(null);
  const checkOutRef = useRef<HTMLButtonElement>(null);
  const whoRef = useRef<HTMLButtonElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Search state
  const [searchInput, setSearchInput] = useState("");

  // Memoize filtered results to prevent recalculation on every render
  const filteredResults = useCallback(() => {
    return whereData.filter((result) =>
      result.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }, [searchInput]);

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

  // Calculate total guests once
  const totalGuests = guests.adults + guests.children;

  // Handle popover state changes - memoized to prevent recreation on each render
  const handlePopoverChange = useCallback(
    (popover: PopoverType, isOpen: boolean) => {
      // Only allow manual opening or programmatic changes
      // Prevent automatic closing when interacting with popover content
      if (isOpen) {
        setActivePopover(popover);
      } else if (activePopover === popover) {
        // Don't close automatically - we'll control this programmatically
        // This prevents the popover from closing when selecting an item
        setActivePopover(null)
      }
    },
    [activePopover]
  );

  // Handle location selection - memoized
  const handleLocationSelect = useCallback((location: string) => {
    setSearchInput(location);
    // Move to check-in after selecting location
    setTimeout(() => {
      setActivePopover("checkin");
    }, 10);
  }, []);

  // Handle guest change - memoized
  const handleGuestChange = useCallback(
    (type: keyof typeof guests, increment: boolean) => {
      setGuests((prev) => ({
        ...prev,
        [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1),
      }));
    },
    []
  );

  // Handle date selection
  const handleDateSelect = useCallback(
    (newDate: Date | undefined) => {
      if (!newDate) return;

      setDate(newDate);

      if (!selectedDates.checkIn) {
        setSelectedDates((prev) => ({ ...prev, checkIn: newDate }));
        // Move to checkout after selecting check-in date
        setTimeout(() => {
          setActivePopover("checkout");
        }, 100);
      } else if (!selectedDates.checkOut) {
        // Only set checkout if it's after check-in
        if (selectedDates.checkIn && newDate > selectedDates.checkIn) {
          setSelectedDates((prev) => ({ ...prev, checkOut: newDate }));
          // Move to who after selecting check-out date
          setTimeout(() => {
            setActivePopover("who");
          }, 100);
        }
      }
    },
    [selectedDates]
  );

  // Effect to focus on the search input when the Where popover opens
  useEffect(() => {
    if (activePopover === "where" && searchInputRef.current) {
      const timeoutId = setTimeout(() => {
        searchInputRef.current?.focus();
      }, 10);
      return () => clearTimeout(timeoutId);
    }
  }, [activePopover]);

  // Clear search input
  const clearSearch = useCallback(() => setSearchInput(""), []);

  // Handle input click to prevent popover from closing
  const handleInputClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  // Format date for display
  const formatDate = useCallback((date: Date | null) => {
    if (!date) return "Add dates";
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  }, []);

  const closePopover = useCallback(() => {
    setActivePopover(null);
  }, []);

  const handleSearch = useCallback(() => {
    // Close all popovers
    closePopover();
    // Implement search functionality here
    console.log("Searching for:", {
      location: searchInput,
      checkIn: selectedDates.checkIn,
      checkOut: selectedDates.checkOut,
      guests,
    });
  }, [searchInput, selectedDates, guests, closePopover]);

  const results = filteredResults();

  return (
    <div className="flex items-center border gap-2 bg-gray-100 rounded-full shadow-sm divide-x hover:shadow-md transition-shadow duration-200">
      {/* Where Section */}
      <Popover
        open={activePopover === "where"}
        onOpenChange={(open) => handlePopoverChange("where", open)}
      >
        <PopoverTrigger
          asChild
          className="cursor-pointer hover:bg-white transition-colors duration-200"
        >
          <button
            ref={whereRef}
            className={cn(
              "px-6 py-2 text-left border-none rounded-full focus:outline-none transition-all duration-200",
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
              {searchInput && (
                <button
                  className="hover:bg-gray-300 cursor-pointer rounded-full p-0.5 transition-colors"
                  onClick={clearSearch}
                  aria-label="Clear search"
                >
                  <X size={16} className="z-50" />
                </button>
              )}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent
          className="w-96 max-h-96 overflow-auto scrollbar-none p-4 rounded-3xl"
          align="start"
        >
          <div className="space-y-4">
            {!searchInput && (
              <h3 className="font-medium">Suggested destinations</h3>
            )}
            <div className="grid gap-2">
              {results.length > 0 ? (
                results.map((result) => (
                  <Button
                    key={result.id}
                    variant="ghost"
                    className="justify-start h-auto py-2 hover:bg-gray-100 transition-colors"
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
        <PopoverTrigger
          asChild
          className="cursor-pointer hover:bg-white transition-colors duration-200"
        >
          <button
            ref={checkInRef}
            className={cn(
              "px-6 py-2 text-left rounded-full border-none focus:outline-none transition-all duration-200",
              activePopover === "checkin" ? "bg-white shadow" : "bg-gray-100"
            )}
          >
            <div className="text-sm font-medium">Check in</div>
            <div className="text-sm text-muted-foreground">
              {formatDate(selectedDates.checkIn)}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-max p-0 rounded-3xl" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0))
            }
          />
        </PopoverContent>
      </Popover>

      {/* Check Out Section */}
      <Popover
        open={activePopover === "checkout"}
        onOpenChange={(open) => handlePopoverChange("checkout", open)}
      >
        <PopoverTrigger
          asChild
          className="cursor-pointer hover:bg-white transition-colors duration-200"
        >
          <button
            ref={checkOutRef}
            className={cn(
              "px-6 py-2 rounded-full text-left focus:outline-none transition-all duration-200",
              activePopover === "checkout" ? "bg-white shadow" : "bg-gray-100"
            )}
          >
            <div className="text-sm font-medium">Check out</div>
            <div className="text-sm text-muted-foreground">
              {formatDate(selectedDates.checkOut)}
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-max p-0 rounded-3xl" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border"
            disabled={(date) =>
              date < new Date(new Date().setHours(0, 0, 0, 0)) ||
              (selectedDates.checkIn ? date <= selectedDates.checkIn : false)
            }
          />
        </PopoverContent>
      </Popover>

      {/* Who Section */}
      <Popover
        open={activePopover === "who"}
        onOpenChange={(open) => handlePopoverChange("who", open)}
      >
        <PopoverTrigger
          asChild
          className="cursor-pointer hover:bg-white transition-colors duration-200"
        >
          <div
            className={cn(
              "pl-6 pr-3 py-2 flex items-center gap-8 justify-between rounded-full text-left focus:outline-none transition-all duration-200",
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
              aria-label="Search"
              onClick={handleSearch}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[350px] p-4 rounded-3xl" align="start">
          <div className="space-y-6">
            {/* Guest Counter Component - extracted for each guest type */}
            <GuestCounter
              title="Adults"
              description="Ages 13 or above"
              count={guests.adults}
              onDecrement={() => handleGuestChange("adults", false)}
              onIncrement={() => handleGuestChange("adults", true)}
            />

            <GuestCounter
              title="Children"
              description="Ages 2–12"
              count={guests.children}
              onDecrement={() => handleGuestChange("children", false)}
              onIncrement={() => handleGuestChange("children", true)}
            />

            <GuestCounter
              title="Infants"
              description="Under 2"
              count={guests.infants}
              onDecrement={() => handleGuestChange("infants", false)}
              onIncrement={() => handleGuestChange("infants", true)}
            />

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
                  aria-label="Decrease pets"
                >
                  -
                </Button>
                <span className="w-5 text-center">{guests.pets}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => handleGuestChange("pets", true)}
                  aria-label="Increase pets"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Extracted reusable component for guest counters
interface GuestCounterProps {
  title: string;
  description: string;
  count: number;
  onDecrement: () => void;
  onIncrement: () => void;
}

function GuestCounter({
  title,
  description,
  count,
  onDecrement,
  onIncrement,
}: GuestCounterProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8"
          onClick={onDecrement}
          disabled={count === 0}
          aria-label={`Decrease ${title.toLowerCase()}`}
        >
          -
        </Button>
        <span className="w-5 text-center">{count}</span>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full h-8 w-8"
          onClick={onIncrement}
          aria-label={`Increase ${title.toLowerCase()}`}
        >
          +
        </Button>
      </div>
    </div>
  );
}
