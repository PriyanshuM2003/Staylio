"use client";
import React, { useRef, useState } from "react";
import { TProperty } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const BookingCard = ({ data }: { data: TProperty }) => {
  const [activePopover, setActivePopover] = useState<
    "guests" | "checkin" | "checkout" | null
  >(null);

  const checkOutRef = useRef<HTMLButtonElement>(null);
  const guestsRef = useRef<HTMLButtonElement>(null);
  const checkInRef = useRef<HTMLButtonElement>(null);

  const [selectedDates, setSelectedDates] = useState<{
    checkIn: Date | null;
    checkOut: Date | null;
  }>({
    checkIn: null,
    checkOut: null,
  });

  // Guest selection state
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    pets: 0,
  });

  const totalGuests = guests.adults + guests.children;

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

  const handleGuestChange = (type: keyof typeof guests, increment: boolean) => {
    setGuests((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
  };

  // Handle check-in date selection
  const handleCheckInSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDates((prev) => ({ ...prev, checkIn: date }));
      // Move to check-out after selecting check-in
      setActivePopover("checkout");
      checkOutRef.current?.click();
    }
  };

  // Handle check-out date selection
  const handleCheckOutSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDates((prev) => ({ ...prev, checkOut: date }));
      setActivePopover(null);
    }
  };

  return (
    <Card className="shadow-lg p-0">
      <CardContent className="p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6">
            ₹{data?.price_per_night}{" "}
            <span className="text-base font-normal">per night</span>
          </h2>

          <div className="space-y-4">
            {/* Guests Popover */}
            <Popover
              open={activePopover === "guests"}
              onOpenChange={(open) => handlePopoverChange("guests", open)}
            >
              <PopoverTrigger asChild>
                <Button
                  ref={guestsRef}
                  variant="outline"
                  className="w-full justify-between text-left h-auto py-3"
                >
                  <div>
                    <div className="font-medium text-sm">Guests</div>
                    <div className="text-sm text-muted-foreground">
                      {totalGuests > 0
                        ? `${totalGuests} guest${totalGuests > 1 ? "s" : ""}`
                        : "Add guests"}
                      {guests.infants > 0 &&
                        `, ${guests.infants} infant${
                          guests.infants > 1 ? "s" : ""
                        }`}
                      {guests.pets > 0 &&
                        `, ${guests.pets} pet${guests.pets > 1 ? "s" : ""}`}
                    </div>
                  </div>
                  {activePopover === "guests" && (
                    <ChevronRight className="h-4 w-4 rotate-90" />
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-[350px] p-4 rounded-xl"
                align="center"
              >
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
                        disabled={guests.adults === 1}
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
                      <Button
                        variant="link"
                        className="p-0 h-auto text-sm underline"
                      >
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

            <div className="grid grid-cols-2 gap-4">
              {/* Check-in Popover */}
              <Popover
                open={activePopover === "checkin"}
                onOpenChange={(open) => handlePopoverChange("checkin", open)}
              >
                <PopoverTrigger asChild>
                  <Button
                    ref={checkInRef}
                    variant="outline"
                    className="w-full justify-between text-left h-auto py-3"
                  >
                    <div>
                      <div className="font-medium text-sm">Check-in</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedDates.checkIn
                          ? selectedDates.checkIn.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "Add date"}
                      </div>
                    </div>
                    {activePopover === "checkin" && (
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-max p-0 rounded-xl" align="center">
                  <Calendar
                    mode="single"
                    selected={selectedDates.checkIn || undefined}
                    onSelect={handleCheckInSelect}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>

              {/* Check-out Popover */}
              <Popover
                open={activePopover === "checkout"}
                onOpenChange={(open) => handlePopoverChange("checkout", open)}
              >
                <PopoverTrigger asChild>
                  <Button
                    ref={checkOutRef}
                    variant="outline"
                    className="w-full justify-between text-left h-auto py-3"
                  >
                    <div>
                      <div className="font-medium text-sm">Check-out</div>
                      <div className="text-sm text-muted-foreground">
                        {selectedDates.checkOut
                          ? selectedDates.checkOut.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })
                          : "Add date"}
                      </div>
                    </div>
                    {activePopover === "checkout" && (
                      <ChevronRight className="h-4 w-4 rotate-90" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-max p-0 rounded-xl" align="center">
                  <Calendar
                    mode="single"
                    selected={selectedDates.checkOut || undefined}
                    onSelect={handleCheckOutSelect}
                    className="rounded-md border"
                    disabled={(date) =>
                      date < new Date() ||
                      (selectedDates.checkIn
                        ? date <= selectedDates.checkIn
                        : false)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-3">
          <div className="flex justify-between">
            <span>
              $200 ×{" "}
              {selectedDates.checkIn && selectedDates.checkOut
                ? Math.ceil(
                    (selectedDates.checkOut.getTime() -
                      selectedDates.checkIn.getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                : 4}{" "}
              nights
            </span>
            <span>
              $
              {selectedDates.checkIn && selectedDates.checkOut
                ? 200 *
                  Math.ceil(
                    (selectedDates.checkOut.getTime() -
                      selectedDates.checkIn.getTime()) /
                      (1000 * 60 * 60 * 24)
                  )
                : 800}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Staylio fee</span>
            <span>
              $
              {selectedDates.checkIn && selectedDates.checkOut
                ? Math.round(
                    200 *
                      Math.ceil(
                        (selectedDates.checkOut.getTime() -
                          selectedDates.checkIn.getTime()) /
                          (1000 * 60 * 60 * 24)
                      ) *
                      0.05
                  )
                : 40}
            </span>
          </div>
          <Separator className="my-4" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>
              $
              {selectedDates.checkIn && selectedDates.checkOut
                ? 200 *
                    Math.ceil(
                      (selectedDates.checkOut.getTime() -
                        selectedDates.checkIn.getTime()) /
                        (1000 * 60 * 60 * 24)
                    ) +
                  Math.round(
                    200 *
                      Math.ceil(
                        (selectedDates.checkOut.getTime() -
                          selectedDates.checkIn.getTime()) /
                          (1000 * 60 * 60 * 24)
                      ) *
                      0.05
                  )
                : 840}
            </span>
          </div>
        </div>
        <Separator className="my-4" />
        <Button variant={"destructive"} className="w-full">
          Book
        </Button>
      </CardContent>
    </Card>
  );
};

export default BookingCard;
