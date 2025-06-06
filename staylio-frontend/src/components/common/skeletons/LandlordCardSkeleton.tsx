import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

const LandlordCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center space-y-3">
        {/* Avatar skeleton */}
        <Skeleton className="w-24 h-24 rounded-full" />

        {/* Username skeleton */}
        <div className="space-y-1 text-center">
          <Skeleton className="h-6 w-32" />

          {/* Star rating skeleton */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="w-4 h-4 rounded-sm" />
              ))}
            </div>
            <Skeleton className="h-5 w-8" />
          </div>
        </div>

        {/* Hosting since skeleton */}
        <div className="space-y-1 flex flex-col items-center text-center">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-5 w-12" />
          </div>
        </div>

        {/* Button skeleton */}
        <Skeleton className="h-10 w-32 rounded-md" />
      </CardContent>
    </Card>
  )
}

export default LandlordCardSkeleton
