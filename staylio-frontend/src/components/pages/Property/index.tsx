"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Bed, ChevronRight, DoorOpen, Heart, MapPin, Star } from "lucide-react";

import Link from "next/link";
import DescriptionDialog from "./DescriptionDialog";
import PlaceOffersDialog from "./PlaceOffersDialog";
import { usePropertyDetails } from "@/hooks/api-hooks";
import BookingCard from "./BookingCard";

const Property = ({ id, userId }: { id: string; userId: string }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [openDescriptionDialog, setOpenDescriptionDialog] = useState(false);
  const [openPlaceOffersDialog, setOpenPlaceOffersDialog] = useState(false);

  const { data, isLoading, isError } = usePropertyDetails(id);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  if (isLoading) return <></>;
  if (isError) return <p>Error loading Property!</p>;

  return (
    <div className="px-6 mx-auto">
      <div className="mx-auto grid gap-1 grid-cols-5">
        <div className="relative w-lg col-span-2 aspect-square rounded-xl overflow-hidden">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {data?.images?.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="relative aspect-square">
                    <Image
                      src={image.image}
                      alt={`Image ${data.title + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 z-20 cursor-pointer" />
            <CarouselNext className="z-20 absolute right-2 cursor-pointer" />
          </Carousel>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-30">
            {data?.images?.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full",
                  current === index + 1 ? "bg-white" : "bg-white/50"
                )}
              />
            ))}
          </div>
          <Heart
            className={cn(
              "h-8 w-8 cursor-pointer absolute top-2 right-2 z-30 transition-all fill-red-500 stroke-white"
            )}
          />
        </div>
        <div className="w-full col-span-3 space-y-4">
          <Link
            href={`/landlord/${data?.landlord.id}`}
            className="flex items-center gap-2 w-max"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src={data?.landlord.avatar_url} alt="Host" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="text-base title-font font-medium">
              {data?.landlord.username}
            </h2>
          </Link>
          <div className="space-y-1">
            <h1 className="text-3xl title-font font-medium">{data?.title}</h1>
            <div className="flex items-center gap-4">
              <h3 className="text-muted-foreground">
                {data?.guests} guests | {data?.bedrooms} bedroom |{" "}
                {data?.bathrooms} private bathroom
              </h3>
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
                <h4>
                  44 <span className="underline">Reviews</span>
                </h4>
              </div>
            </div>
          </div>

          <p className="leading-relaxed line-clamp-4">
            {data?.description}
            <span className="flex items-center gap-4">
              <button
                className="underline flex font-medium cursor-pointer items-center"
                onClick={() => setOpenDescriptionDialog(true)}
              >
                Show More <ChevronRight size={18} className="shrink-0" />
              </button>
              <button
                className="underline flex font-medium cursor-pointer items-center"
                onClick={() => setOpenPlaceOffersDialog(true)}
              >
                What this place offers
                <ChevronRight size={18} className="shrink-0" />
              </button>
            </span>
          </p>
          <Separator className="my-4" />
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <DoorOpen size={32} className="shrink-0" />
                <div className="space-y-1">
                  <h4>Self Check-in</h4>
                  <p className="text-muted-foreground">
                    Check yourself in with the lockbox.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bed size={32} className="shrink-0" />
                <div className="space-y-1">
                  <h4>Comfy bed for better sleep</h4>
                  <p className="text-muted-foreground">
                    The room-darkening blinds and extra bedding are loved by
                    guests.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={32} className="shrink-0" />
                <div className="space-y-1">
                  <h4>Beautiful area</h4>
                  <p className="text-muted-foreground">
                    Guests love this home&apos;s scenic location.
                  </p>
                </div>
              </div>
            </div>
            <BookingCard data={data!} userId={userId} />
          </div>
        </div>
      </div>
      {openDescriptionDialog && (
        <DescriptionDialog
          description={data?.description ?? ""}
          openDescriptionDialog={openDescriptionDialog}
          setOpenDescriptionDialog={setOpenDescriptionDialog}
        />
      )}
      {openPlaceOffersDialog && (
        <PlaceOffersDialog
          openPlaceOffersDialog={openPlaceOffersDialog}
          setOpenPlaceOffersDialog={setOpenPlaceOffersDialog}
        />
      )}
    </div>
  );
};

export default Property;
