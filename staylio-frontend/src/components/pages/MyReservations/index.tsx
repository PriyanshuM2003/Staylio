"use client";
import { useUserReservations } from "@/hooks/api-hooks";
import ReservationCard from "@/components/common/ReservationCard";
import React from "react";

const MyReservations = () => {
  const { data, isLoading, isError } = useUserReservations();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">My Reservations</h1>
      <div className="grid lg:grid-cols-2 gap-6 w-full">
        {data?.map((reservation) => (
          <ReservationCard key={reservation.id} data={reservation} />
        ))}
      </div>
    </div>
  );
};

export default MyReservations;
