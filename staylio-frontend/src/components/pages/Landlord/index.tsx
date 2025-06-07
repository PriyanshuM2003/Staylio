"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import { useLandlord, usePropertiesListData } from "@/hooks/api-hooks";
import { Button } from "@/components/ui/button";
import AuthDialog from "@/components/common/AuthDialog";
import PropertyCard from "@/components/common/PropertyCard";
import PropertyCardSkeleton from "@/components/common/skeletons/PropertyCardSkeleton";
import LandlordCardSkeleton from "@/components/common/skeletons/LandlordCardSkeleton";
import { useParams } from "next/navigation";

const Landlord = ({ userId }: { userId: string }) => {
  const params = useParams();
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const { data, isLoading, isError } = useLandlord(params.id as string);
  const {
    data: propertyData,
    isLoading: loadingPropertyData,
    isError: errorPropertyData,
  } = usePropertiesListData(params.id as string);

  return (
    <div className="grid gap-6 grid-cols-4">
      <div className="col-span-1">
        {(() => {
          if (isLoading) {
            return <LandlordCardSkeleton />;
          }
          if (isError) {
            return <p>Error loading Landlord data.</p>;
          }
          return (
            <Card>
              <CardContent className="flex flex-col items-center justify-center space-y-3">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={data?.avatar_url} />
                  <AvatarFallback>{data?.username}</AvatarFallback>
                </Avatar>
                <div className="space-y-1 text-center">
                  <h3>{data?.username}</h3>
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
                </div>
                {!userId ? (
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setAuthType("login");
                      setOpenAuthDialog(true);
                    }}
                    type="button"
                  >
                    Login to contact
                  </Button>
                ) : (
                  <Button variant={"destructive"}>Contact</Button>
                )}
              </CardContent>
            </Card>
          );
        })()}
      </div>
      <div className="col-span-3">
        {(() => {
          if (loadingPropertyData) {
            return (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <PropertyCardSkeleton key={index} />
                ))}
              </div>
            );
          }

          if (errorPropertyData) {
            return <p>Error loading landlord property data.</p>;
          }

          return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {propertyData?.map((property) => (
                <PropertyCard key={property.id} data={property} />
              ))}
            </div>
          );
        })()}
      </div>
      <AuthDialog
        openAuthDialog={openAuthDialog}
        setOpenAuthDialog={setOpenAuthDialog}
        authType={authType}
        setAuthType={setAuthType}
      />
    </div>
  );
};

export default Landlord;
