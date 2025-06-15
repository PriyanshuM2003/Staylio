import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const InboxSkeleton = () => {
  return (
    <div className="flex flex-col items-start gap-2 border-b p-4 last:border-b-0">
      <div className="flex w-full items-center gap-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="ml-auto h-3 w-12" />
      </div>
      <Skeleton className="h-3 w-[260px]" />
      <Skeleton className="h-3 w-[180px]" />
    </div>
  );
};

export default InboxSkeleton;
