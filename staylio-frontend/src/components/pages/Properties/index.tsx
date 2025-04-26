import CategoryFilter from "@/components/common/CategoryFilter";
import PropertyCard from "@/components/common/PropertyCard";
import { propertyData } from "@/dummyData/propertyData";
import React from "react";

const Properties = () => {
  return (
    <div className="space-y-6">
      <CategoryFilter />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {propertyData.map((property) => (
          <PropertyCard key={property.id} data={property} />
        ))}
      </div>
    </div>
  );
};

export default Properties;
