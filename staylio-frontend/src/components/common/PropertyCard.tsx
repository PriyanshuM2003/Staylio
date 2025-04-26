"use client";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "@/types/types";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function PropertyCard({ data }: { data: Property }) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  
  return (
    <Card className="border-0 shadow-none hover:shadow-2xl cursor-pointer transition-all rounded-xl">
      <CardContent className="p-2 space-y-2">
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {data.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square">
                    <Image
                      src={image}
                      alt={data.location}
                      fill
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-2 z-10 cursor-pointer" />
            <CarouselNext className="z-10 absolute right-2 cursor-pointer" />
          </Carousel>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {data.images.map((_, index) => (
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
              "h-5 w-5 cursor-pointer absolute top-2 right-2 z-10",
              data.isFavorite ? "fill-red-500 stroke-white" : "stroke-white"
            )}
          />
        </div>

        <div className="space-y-1 pt-2">
          <div className="flex justify-between">
            <h3 className="font-medium">{data.location}</h3>
            {data.rating && (
              <div className="flex items-center gap-1">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                    fill="currentColor"
                  />
                </svg>
                <span>{data.rating}</span>
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-sm">{data.dates}</p>
          <p className="font-semibold">
            {data.price}{" "}
            <span className="font-normal">for {data.nights} nights</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
