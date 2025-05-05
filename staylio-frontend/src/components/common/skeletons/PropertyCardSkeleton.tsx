"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function PropertyCardSkeleton() {
  return (
    <Card className="border-0 p-0 shadow-none hover:shadow-2xl relative transition-all rounded-xl">
      <CardContent className="p-2 space-y-2">
        <Skeleton className="relative aspect-square rounded-xl overflow-hidden bg-gray-200" />

        <Skeleton className="space-y-1 pt-2">
          <Skeleton className="flex justify-between">
            <Skeleton className="h-4 w-2/3 bg-gray-300 rounded" />
            <Skeleton className="h-4 w-1/4 bg-gray-300 rounded" />
          </Skeleton>
          <Skeleton className="h-3 w-1/3 bg-gray-300 rounded" />
          <Skeleton className="h-4 w-1/2 bg-gray-400 rounded" />
        </Skeleton>
      </CardContent>
    </Card>
  );
}
