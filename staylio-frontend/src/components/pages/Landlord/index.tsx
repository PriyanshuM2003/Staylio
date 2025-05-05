"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
// import PropertyCard from "@/components/common/PropertyCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const Landlord = () => {
  return (
    <div className="grid gap-6 grid-cols-4">
      <div className="col-span-1">
        <Card>
          <CardContent className="flex flex-col items-center justify-center space-y-3">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="space-y-1 text-center">
              <h3>Landlord Name</h3>
              <div className="flex items-center gap-2">
                <span className="flex items-center">
                  <Star
                    size={16}
                    className="stroke-yellow-500 shrink-0 fill-yellow-500"
                  />
                  <Star
                    size={16}
                    className="stroke-yellow-500 shrink-0 fill-yellow-500"
                  />
                  <Star
                    size={16}
                    className="stroke-yellow-500 shrink-0 fill-yellow-500"
                  />
                  <Star
                    size={16}
                    className="stroke-yellow-500 shrink-0 fill-yellow-500"
                  />
                  <Star
                    size={16}
                    className="stroke-yellow-500 shrink-0 fill-yellow-500"
                  />
                </span>
                <h4>4.89</h4>
              </div>
            </div>
            <div className="space-y-1 flex flex-col items-center text-center">
              <div className="flex items-center gap-2">
                <h4 className="text-muted-foreground">Hosting Since</h4>
                <h3>3Years</h3>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-muted-foreground">Contact No.</h4>
                <h3>0123465789</h3>
              </div>
              <div className="flex items-center gap-2">
                <h4 className="text-muted-foreground">Email</h4>
                <h3>landlord@example.com</h3>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-3">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* {propertyData.map((property) => (
            <PropertyCard key={property.id} data={property} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Landlord;
