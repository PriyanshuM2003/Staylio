"use client";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TProperty } from "@/types/types";
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
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PropertyCardProps {
  data: TProperty;
  isMyProperties?: boolean;
}

export default function PropertyCard({ data }: PropertyCardProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const pathName = usePathname();
  const isMyProperties = pathName.includes("my-properties");

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
    <Card className="border-0 p-0 shadow-none hover:shadow-2xl relative transition-all rounded-xl">
      <Link
        href={`/property/${data.id}`}
        className="absolute z-10 w-full h-full"
      />
      <CardContent className="p-2 space-y-2">
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {data?.images?.map((image) => (
                <CarouselItem key={image.id}>
                  <div className="relative aspect-square">
                    <Image
                      src={image.image}
                      alt={data.title}
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
              "h-5 w-5 cursor-pointer absolute top-2 right-2 z-30 transition-all",
              // data.isFavorite ? "fill-red-500 stroke-white" : "stroke-white",
              "stroke-white",
              isMyProperties && "hidden"
            )}
          />
        </div>

        <div className="space-y-1 pt-2">
          <div className="flex justify-between">
            <h3 className="font-medium">{data.title}</h3>
            {/* {data.rating && (
              <div className="flex items-center gap-1">
                <Star
                  size={16}
                  className="stroke-yellow-500 shrink-0 fill-yellow-500"
                />
                <span>{data.rating}</span>
              </div>
            )} */}
          </div>
          {/* <p className="text-muted-foreground text-sm">{data.dates}</p> */}
          <p className="font-semibold">
            ₹{data.price_per_night}{" "}
            <span className="font-normal">per night</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
