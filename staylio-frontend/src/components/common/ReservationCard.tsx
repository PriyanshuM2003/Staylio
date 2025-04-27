import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { TReservation } from "@/types/types";
import Link from "next/link";

const ReservationCard = ({ data }: { data: TReservation }) => {
  return (
    <Card className="p-0">
      <CardContent className="sm:flex p-4 max-sm:space-y-4 gap-4">
        <div className="relative aspect-square sm:w-52 rounded-xl overflow-hidden">
          <Image
            src={data.imageUrl}
            alt={`Image`}
            fill
            className="object-cover rounded-xl"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between gap-2 w-full">
          <div className="space-y-1">
            <h2 className="text-lg font-medium">{data.propertyName}</h2>
            <h3 className="font-medium text-muted-foreground">
              Check-in date:&nbsp;
              <span className="text-black">{data.checkInDate}</span>
            </h3>
            <h3 className="font-medium text-muted-foreground">
              Check-out date:&nbsp;
              <span className="text-black">{data.checkOutDate}</span>
            </h3>
            <h3 className="font-medium text-muted-foreground">
              No. of days:&nbsp;
              <span className="text-black">{data.numberOfDays}</span>
            </h3>
            <h3 className="font-medium text-muted-foreground">
              No. of nights:&nbsp;
              <span className="text-black">{data.numberOfNights}</span>
            </h3>
            <h3 className="font-medium text-muted-foreground">
              No. of Guests:&nbsp;
              <span className="text-black">{data.numberOfGuests}</span>
            </h3>
            <h3 className="font-medium text-muted-foreground">
              Total price:&nbsp;
              <span className="text-black">₹{data.totalPrice}</span>
            </h3>
          </div>
          <div className="flex w-full justify-end">
            <Button
              asChild
              variant={"destructive"}
              className="max-sm:w-full max-sm:mt-2"
            >
              <Link href={"/"} className="flex w-max justify-end">
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
