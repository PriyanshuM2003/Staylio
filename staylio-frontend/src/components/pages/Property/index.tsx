"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Bed, ChevronRight, DoorOpen, Heart, MapPin, Star } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const images = [
  "https://images.unsplash.com/photo-1589419896452-b460b8b390a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1553444836-bc6c8d340ba7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1686090448422-de8536066f64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Property = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Track which popover is currently open
  const [activePopover, setActivePopover] = useState<
    "guests" | "checkin" | "checkout" | null
  >(null);

  // References to popover triggers for programmatic focus
  const guestsRef = useRef<HTMLButtonElement>(null);
  const checkInRef = useRef<HTMLButtonElement>(null);
  const checkOutRef = useRef<HTMLButtonElement>(null);

  // Date selection state
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

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="px-6 mx-auto">
      <div className="mx-auto grid gap-1 grid-cols-5">
        <div className="relative w-lg col-span-2 aspect-square rounded-xl overflow-hidden">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square">
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 z-20 cursor-pointer" />
            <CarouselNext className="z-20 absolute right-2 cursor-pointer" />
          </Carousel>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-30">
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full",
                  current === index + 1 ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
          <Heart
            className={cn(
              "h-8 w-8 cursor-pointer absolute top-2 right-2 z-30 transition-all fill-red-500 stroke-white"
            )}
          />
        </div>
        <div className="w-full col-span-3 space-y-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="Host" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="text-base title-font font-medium">
              Hosted by Kanupriya
            </h2>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl title-font font-medium">
              Sunset Wooded Attic Suite in Chalet style Cottage
            </h1>
            <div className="flex items-center gap-4">
              <h3 className="text-muted-foreground">
                4 guests | 1 bedroom | 1 bed | 1 private bathroom
              </h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center">
                  <Star
                    size={16}
                    className="stroke-yellow-500 shrink-0 fill-yellow-500"
                  />
                  <Star
                    size={16}
                    className="stroke-yellow-500 shrink-0 fill-yellow-500"
                  />
                  <Star
                    size={16}
                    className="stroke-yellow-500 shrink-0 fill-yellow-500"
                  />
                  <Star
                    size={16}
                    className="stroke-yellow-500 shrink-0 fill-yellow-500"
                  />
                  <Star
                    size={16}
                    className="stroke-yellow-500 shrink-0 fill-yellow-500"
                  />
                </span>
                <h4>
                  44 <span className="underline">Reviews</span>
                </h4>
              </div>
            </div>
          </div>

          <p className="leading-relaxed">
            Fam locavore kickstarter distillery. Mixtape chillwave tumeric
            sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
            juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
            seitan poutine tumeric. Gastropub blue bottle austin listicle
            pour-over, neutra jean shorts keytar banjo tattooed umami cardigan{" "}
            <span className="underline font-medium flex cursor-pointer items-center">
              Show More <ChevronRight size={18} className="shrink-0" />
            </span>
          </p>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <DoorOpen size={32} className="shrink-0" />
                <div className="space-y-1">
                  <h4>Self Check-in</h4>
                  <p className="text-muted-foreground">
                    Check yourself in with the lockbox.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bed size={32} className="shrink-0" />
                <div className="space-y-1">
                  <h4>Comfy bed for better sleep</h4>
                  <p className="text-muted-foreground">
                    The room-darkening blinds and extra bedding are loved by
                    guests.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={32} className="shrink-0" />
                <div className="space-y-1">
                  <h4>Beautiful area</h4>
                  <p className="text-muted-foreground">
                    Guests love this home&apos;s scenic location.
                  </p>
                </div>
              </div>
            </div>
            <Card className="shadow-lg p-0">
              <CardContent className="p-4">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-6">
                    $200{" "}
                    <span className="text-base font-normal">per night</span>
                  </h2>

                  <div className="space-y-4">
                    {/* Guests Popover */}
                    <Popover
                      open={activePopover === "guests"}
                      onOpenChange={(open) =>
                        handlePopoverChange("guests", open)
                      }
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
                                ? `${totalGuests} guest${
                                    totalGuests > 1 ? "s" : ""
                                  }`
                                : "Add guests"}
                              {guests.infants > 0 &&
                                `, ${guests.infants} infant${
                                  guests.infants > 1 ? "s" : ""
                                }`}
                              {guests.pets > 0 &&
                                `, ${guests.pets} pet${
                                  guests.pets > 1 ? "s" : ""
                                }`}
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
                                onClick={() =>
                                  handleGuestChange("adults", false)
                                }
                                disabled={guests.adults === 1}
                              >
                                -
                              </Button>
                              <span className="w-5 text-center">
                                {guests.adults}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-8 w-8"
                                onClick={() =>
                                  handleGuestChange("adults", true)
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Children</h3>
                              <p className="text-sm text-muted-foreground">
                                Ages 2–12
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-8 w-8"
                                onClick={() =>
                                  handleGuestChange("children", false)
                                }
                                disabled={guests.children === 0}
                              >
                                -
                              </Button>
                              <span className="w-5 text-center">
                                {guests.children}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-8 w-8"
                                onClick={() =>
                                  handleGuestChange("children", true)
                                }
                              >
                                +
                              </Button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-medium">Infants</h3>
                              <p className="text-sm text-muted-foreground">
                                Under 2
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-8 w-8"
                                onClick={() =>
                                  handleGuestChange("infants", false)
                                }
                                disabled={guests.infants === 0}
                              >
                                -
                              </Button>
                              <span className="w-5 text-center">
                                {guests.infants}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-8 w-8"
                                onClick={() =>
                                  handleGuestChange("infants", true)
                                }
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
                              <span className="w-5 text-center">
                                {guests.pets}
                              </span>
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
                        onOpenChange={(open) =>
                          handlePopoverChange("checkin", open)
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button
                            ref={checkInRef}
                            variant="outline"
                            className="w-full justify-between text-left h-auto py-3"
                          >
                            <div>
                              <div className="font-medium text-sm">
                                Check-in
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {selectedDates.checkIn
                                  ? selectedDates.checkIn.toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                      }
                                    )
                                  : "Add date"}
                              </div>
                            </div>
                            {activePopover === "checkin" && (
                              <ChevronRight className="h-4 w-4 rotate-90" />
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-max p-0 rounded-xl"
                          align="center"
                        >
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
                        onOpenChange={(open) =>
                          handlePopoverChange("checkout", open)
                        }
                      >
                        <PopoverTrigger asChild>
                          <Button
                            ref={checkOutRef}
                            variant="outline"
                            className="w-full justify-between text-left h-auto py-3"
                          >
                            <div>
                              <div className="font-medium text-sm">
                                Check-out
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {selectedDates.checkOut
                                  ? selectedDates.checkOut.toLocaleDateString(
                                      "en-US",
                                      {
                                        month: "short",
                                        day: "numeric",
                                      }
                                    )
                                  : "Add date"}
                              </div>
                            </div>
                            {activePopover === "checkout" && (
                              <ChevronRight className="h-4 w-4 rotate-90" />
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-max p-0 rounded-xl"
                          align="center"
                        >
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
