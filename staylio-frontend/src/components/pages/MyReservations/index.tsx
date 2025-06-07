"use client";
import { useUserReservations } from "@/hooks/api-hooks";
import ReservationCard from "@/components/common/ReservationCard";
import React from "react";
import ReservationCardSkeleton from "@/components/common/skeletons/ReservationCardSkeleton";

const MyReservations = () => {
  const { data, isLoading, isError } = useUserReservations();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">My Reservations</h1>
      {(() => {
        if (isLoading) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 w-full">
              {Array.from({ length: 6 }).map((_, index) => (
                <ReservationCardSkeleton key={index} />
              ))}
            </div>
          );
        }

        if (isError) {
          return <p>Error loading your reservations property data.</p>;
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 w-full">
            {data?.map((reservation) => (
              <ReservationCard key={reservation.id} data={reservation} />
            ))}
          </div>
        );
      })()}
    </div>
  );
};

export default MyReservations;
