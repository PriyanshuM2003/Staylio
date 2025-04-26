"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { Bed, ChevronRight, DoorOpen, Heart, MapPin, Star } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1589419896452-b460b8b390a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1553444836-bc6c8d340ba7?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1686090448422-de8536066f64?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const Property = () => {
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
    <div className="px-6 mx-auto">
      <div className="mx-auto grid gap-1 grid-cols-5">
        <div className="relative w-lg col-span-2 aspect-square rounded-xl overflow-hidden">
          <Carousel setApi={setApi}>
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square">
                    <Image
                      src={src}
                      alt={`Image ${index + 1}`}
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
            {images.map((_, index) => (
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
          <div className="flex items-center gap-2">
            <Avatar className="h-10 w-10">
              <AvatarImage src="https://github.com/shadcn.png" alt="Host" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="text-base title-font font-medium">
              Hosted by Kanupriya
            </h2>
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl title-font font-medium">
              Sunset Wooded Attic Suite in Chalet style Cottage
            </h1>
            <div className="flex items-center gap-4">
              <h3 className="text-muted-foreground">
                4 guests | 1 bedroom | 1 bed | 1 private bathroom
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

          <p className="leading-relaxed">
            Fam locavore kickstarter distillery. Mixtape chillwave tumeric
            sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
            juiceramps cornhole raw denim forage brooklyn. Everyday carry +1
            seitan poutine tumeric. Gastropub blue bottle austin listicle
            pour-over, neutra jean shorts keytar banjo tattooed umami cardigan{" "}
            <span className="underline font-medium flex cursor-pointer items-center">
              Show More <ChevronRight size={18} className="shrink-0" />
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
                    Guests love this home’s scenic location.
                  </p>
                </div>
              </div>
            </div>
            <Card className="shadow-lg p-0">
              <CardContent className="p-4">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-6">
                    $200{" "}
                    <span className="text-base font-normal">per night</span>
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="guests" className="block text-sm mb-2">
                        Guests
                      </label>
                      <Select defaultValue="1">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select number of guests" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4">4</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>$200 × 4 nights</span>
                    <span>$800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Djangobnb fee</span>
                    <span>$40</span>
                  </div>
                  <Separator className="my-4" />
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>$840</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <Button variant={"destructive"} className="w-full">
                  Book
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Property;
