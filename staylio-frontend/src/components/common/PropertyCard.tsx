"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "@/types/types";

export default function PropertyCard({
  location,
  distance,
  dates,
  price,
  nights,
  isFavorite,
  rating,
  images,
}: Property) {
  const [favorite, setFavorite] = useState(isFavorite);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  return (
    <Card className="border-0 shadow-none">
      <CardContent className="p-0 space-y-2">
        <div className="relative aspect-square rounded-xl overflow-hidden">
          <Image
            src={images[currentImageIndex] || "/placeholder.svg"}
            alt={location}
            fill
            className="object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 text-white hover:text-white z-10"
            onClick={() => setFavorite(!favorite)}
          >
            <Heart
              className={`h-6 w-6 ${
                favorite ? "fill-red-500 stroke-red-500" : "stroke-white"
              }`}
            />
          </Button>
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-white text-black"
          >
            Guest favourite
          </Badge>
        </div>
        <div className="space-y-1 pt-2">
          <div className="flex justify-between">
            <h3 className="font-medium">{location}</h3>
            {rating && (
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
                <span>{rating}</span>
              </div>
            )}
          </div>
          <p className="text-muted-foreground text-sm">{distance}</p>
          <p className="text-muted-foreground text-sm">{dates}</p>
          <p className="font-semibold">
            {price} <span className="font-normal">for {nights} nights</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
