"use client";
import ReservationCard from "@/components/common/ReservationCard";
import { reservationData } from "@/dummyData/reservationData";
import React from "react";

const MyReservations = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">My Reservations</h1>
      <div className="grid lg:grid-cols-2 gap-6 w-full">
        {reservationData.map((reservation) => (
          <ReservationCard key={reservation.id} data={reservation} />
        ))}
      </div>
    </div>
  );
};

export default MyReservations;
