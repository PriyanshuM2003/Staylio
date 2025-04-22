import PropertyCard from "@/components/common/PropertyCard";
import React from "react";

const Properties = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <PropertyCard
          location="Jalandhar, India"
          distance="348 kilometres away"
          dates="1-6 May"
          price="₹148,353"
          nights={5}
          isFavorite={false}
          rating={null}
          images={["/placeholder.svg"]}
        />
        <PropertyCard
          location="Udaipur, India"
          distance="558 kilometres away"
          dates="1-6 May"
          price="₹79,800"
          nights={5}
          isFavorite={false}
          rating={5.0}
          images={["/placeholder.svg"]}
        />
        <PropertyCard
          location="Jaipur, India"
          distance="211 kilometres away"
          dates="17-22 May"
          price="₹125,000"
          nights={5}
          isFavorite={false}
          rating={null}
          images={["/placeholder.svg"]}
        />
      </div>
    </div>
  );
};

export default Properties;
