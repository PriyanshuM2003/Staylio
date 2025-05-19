"use client";
import React from "react";
import CategoryFilter from "@/components/common/CategoryFilter";
import PropertyCard from "@/components/common/PropertyCard";
import PropertyCardSkeleton from "@/components/common/skeletons/PropertyCardSkeleton";
import { usePropertiesListData } from "@/services/apiHooks";

const Properties = () => {
  const {
    data: propertyData,
    isLoading,
    isRefetching,
  } = usePropertiesListData();

  return (
    <div className="space-y-6">
      <CategoryFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading || isRefetching
          ? Array.from({ length: 10 }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))
          : propertyData?.map((property) => (
              <PropertyCard key={property.id} data={property} />
            ))}
      </div>
    </div>
  );
};

export default Properties;
