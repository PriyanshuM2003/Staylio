"use client";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { TProperty } from "@/types/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuthStore } from "@/stores/useAuthStore";
import AuthDialog from "@/components/common/AuthDialog";
import {
  calculateNights,
  calculateBasePrice,
  calculateServiceFee,
  calculateTotalPrice,
  formatGuestDisplay,
} from "@/lib/booking-utils";
import { toast } from "sonner";
import { useBookProperty } from "@/hooks/api-hooks";
import { BookingFormData, bookingSchema } from "@/schemas/booking-schema";
import GuestSelector from "./guest-selector";
import DateSelector from "./date-selector";

type PopoverType = "guests" | "checkin" | "checkout" | null;

const BookingCard = ({ data }: { data: TProperty }) => {
  const userId = useAuthStore((state) => state.userId);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [activePopover, setActivePopover] = useState<PopoverType>(null);

  const checkOutRef = useRef<HTMLButtonElement>(null);
  const checkInRef = useRef<HTMLButtonElement>(null);

  const bookPropertyMutation = useBookProperty(data.id);

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      guests: {
        adults: 1,
        children: 0,
        infants: 0,
        pets: 0,
      },
    },
  });

  const { watch, setValue, handleSubmit } = form;
  const watchedValues = watch();

  const nights = calculateNights(watchedValues.checkIn, watchedValues.checkOut);
  const basePrice = calculateBasePrice(data.price_per_night, nights);
  const serviceFee = calculateServiceFee(basePrice);
  const totalPrice = calculateTotalPrice(data.price_per_night, nights);
  const totalGuests =
    watchedValues.guests.adults + watchedValues.guests.children;

  const handlePopoverChange = (popover: PopoverType, isOpen: boolean) => {
    setActivePopover(isOpen ? popover : null);
  };

  const handleGuestChange = (
    type: keyof BookingFormData["guests"],
    increment: boolean
  ) => {
    const currentValue = watchedValues.guests[type];
    const newValue = increment
      ? currentValue + 1
      : Math.max(0, currentValue - 1);

    if (type === "adults" && newValue < 1) return;

    setValue(`guests.${type}`, newValue);
  };

  const handleDateSelect = (
    field: "checkIn" | "checkOut",
    date: Date | undefined
  ) => {
    if (!date) return;

    setValue(field, date);

    if (field === "checkIn") {
      setActivePopover("checkout");
      checkOutRef.current?.click();
    } else {
      setActivePopover(null);
    }
  };

  const getDateDisabled = (field: "checkIn" | "checkOut") => (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today) return true;

    if (field === "checkOut" && watchedValues.checkIn) {
      return date <= watchedValues.checkIn;
    }

    return false;
  };

  const onSubmit = async (formData: BookingFormData) => {
    try {
      const result = await bookPropertyMutation.mutateAsync({
        start_date: formData.checkIn,
        end_date: formData.checkOut,
        number_of_nights: nights,
        total_price: totalPrice,
        guests: totalGuests,
      });

      if (result.success) {
        toast.success("Booking successful!");
        form.reset();
      } else {
        toast.error("Booking failed. Please try again.");
        form.reset();
      }
    } catch {
      toast.error("Booking failed. Please try again.");
      form.reset();
    }
  };

  const guestConfig = [
    {
      key: "adults" as const,
      label: "Adults",
      desc: "Ages 13 or above",
      min: 1,
    },
    { key: "children" as const, label: "Children", desc: "Ages 2–12", min: 0 },
    { key: "infants" as const, label: "Infants", desc: "Under 2", min: 0 },
    {
      key: "pets" as const,
      label: "Pets",
      desc: null,
      min: 0,
      showServiceAnimalLink: true,
    },
  ];

  return (
    <>
      <Card className="shadow-lg p-0">
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-6">
                  ₹{data.price_per_night}{" "}
                  <span className="text-base font-normal">per night</span>
                </h2>

                <div className="space-y-4">
                  {/* Guests Popover */}
                  <FormField
                    control={form.control}
                    name="guests"
                    render={() => (
                      <FormItem>
                        <Popover
                          open={activePopover === "guests"}
                          onOpenChange={(open) =>
                            handlePopoverChange("guests", open)
                          }
                        >
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className="w-full justify-between text-left h-auto py-3"
                                type="button"
                              >
                                <div>
                                  <div className="font-medium text-sm">
                                    Guests
                                  </div>
                                  <div className="text-sm text-muted-foreground">
                                    {formatGuestDisplay(watchedValues.guests)}
                                  </div>
                                </div>
                                {activePopover === "guests" && (
                                  <ChevronRight className="h-4 w-4 rotate-90" />
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-[350px] p-4 rounded-xl"
                            align="center"
                          >
                            <div className="space-y-6">
                              {guestConfig.map(
                                ({
                                  key,
                                  label,
                                  desc,
                                  min,
                                  showServiceAnimalLink,
                                }) => (
                                  <GuestSelector
                                    key={key}
                                    type={key}
                                    label={label}
                                    description={desc || undefined}
                                    value={watchedValues.guests[key]}
                                    onChange={(increment) =>
                                      handleGuestChange(key, increment)
                                    }
                                    min={min}
                                    showServiceAnimalLink={
                                      showServiceAnimalLink
                                    }
                                  />
                                )
                              )}
                            </div>
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    {/* Check-in */}
                    <FormField
                      control={form.control}
                      name="checkIn"
                      render={({ field }) => (
                        <FormItem>
                          <DateSelector
                            ref={checkInRef}
                            label="Check-in"
                            value={field.value}
                            onSelect={(date) =>
                              handleDateSelect("checkIn", date)
                            }
                            isOpen={activePopover === "checkin"}
                            onOpenChange={(open) =>
                              handlePopoverChange("checkin", open)
                            }
                            disabled={getDateDisabled("checkIn")}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Check-out */}
                    <FormField
                      control={form.control}
                      name="checkOut"
                      render={({ field }) => (
                        <FormItem>
                          <DateSelector
                            ref={checkOutRef}
                            label="Check-out"
                            value={field.value}
                            onSelect={(date) =>
                              handleDateSelect("checkOut", date)
                            }
                            isOpen={activePopover === "checkout"}
                            onOpenChange={(open) =>
                              handlePopoverChange("checkout", open)
                            }
                            disabled={getDateDisabled("checkOut")}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>
                    ${data.price_per_night} × {nights} nights
                  </span>
                  <span>${basePrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Staylio fee</span>
                  <span>${serviceFee}</span>
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${totalPrice}</span>
                </div>
              </div>

              <Separator className="my-4" />

              {!userId ? (
                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={() => {
                    setAuthType("login");
                    setOpenAuthDialog(true);
                  }}
                  type="button"
                >
                  Login to book
                </Button>
              ) : (
                <Button
                  variant="destructive"
                  className="w-full"
                  type="submit"
                  disabled={bookPropertyMutation.isPending}
                >
                  {bookPropertyMutation.isPending ? "Booking..." : "Book"}
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <AuthDialog
        openAuthDialog={openAuthDialog}
        setOpenAuthDialog={setOpenAuthDialog}
        authType={authType}
        setAuthType={setAuthType}
      />
    </>
  );
};

export default BookingCard;
