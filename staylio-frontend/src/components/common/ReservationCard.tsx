"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { TReservation } from "@/types/types";
import { format } from "date-fns";

const ReservationCard = ({ data }: { data: TReservation }) => {
  const {
    property,
    start_date,
    end_date,
    number_of_nights,
    guests,
    total_price,
  } = data;

  return (
    <Card className="p-0">
      <CardContent className="sm:flex p-4 gap-4 max-sm:space-y-4">
        <div className="relative aspect-square sm:w-52 rounded-xl overflow-hidden">
          <Image
            src={property.images[0].image}
            alt={`Image of ${property.title}`}
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-between gap-4 w-full">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{property.title}</h2>
            <div className="text-sm text-muted-foreground font-medium space-y-1">
              <p>
                Check-in:&nbsp;
                <span className="text-black">
                  {format(new Date(start_date), "dd MMMM yyyy")}
                </span>
              </p>
              <p>
                Check-out:&nbsp;
                <span className="text-black">
                  {format(new Date(end_date), "dd MMMM yyyy")}
                </span>
              </p>
              <p>
                Nights:&nbsp;
                <span className="text-black">{number_of_nights}</span>
              </p>
              <p>
                Guests:&nbsp;
                <span className="text-black">{guests}</span>
              </p>
              <p>
                Total Price:&nbsp;
                <span className="text-black">₹{total_price}</span>
              </p>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              asChild
              variant="destructive"
              className="max-sm:w-full max-sm:mt-2"
            >
              <Link href={`/property/${property.id}`}>
                Go to Property
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
