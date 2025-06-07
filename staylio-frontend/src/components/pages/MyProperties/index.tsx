"use client";
import { usePropertiesListData } from "@/hooks/api-hooks";
import PropertyCard from "@/components/common/PropertyCard";
import React from "react";

const MyProperties = ({ userId }: { userId: string }) => {
  const { data, isLoading, isError } = usePropertiesListData(userId);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-medium">My Properties</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data?.map((property) => (
          <PropertyCard key={property.id} data={property} />
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
