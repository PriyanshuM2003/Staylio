"use client";
import React from "react";
import { useUserFavoriteProperties } from "@/hooks/api-hooks";
import PropertyCard from "@/components/common/PropertyCard";
import PropertyCardSkeleton from "@/components/common/skeletons/PropertyCardSkeleton";

const MyFavorties = () => {
  const { data, isLoading, isError } = useUserFavoriteProperties();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">My Favorites</h1>
      {(() => {
        if (isLoading) {
          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 10 }).map((_, index) => (
                <PropertyCardSkeleton key={index} />
              ))}
            </div>
          );
        }

        if (isError) {
          return <p>Error loading your favorite properties data</p>;
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data?.map((property) => (
              <PropertyCard key={property.id} data={property} />
            ))}
          </div>
        );
      })()}
    </div>
  );
};

export default MyFavorties;
