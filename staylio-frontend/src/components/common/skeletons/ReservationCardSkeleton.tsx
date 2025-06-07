import { Card, CardContent } from "@/components/ui/card"

const ReservationCardSkeleton = () => {
  return (
    <Card className="p-0">
      <CardContent className="sm:flex p-4 gap-4 max-sm:space-y-4">
        {/* Image skeleton */}
        <div className="relative aspect-square sm:w-52 rounded-xl overflow-hidden bg-gray-200 animate-pulse">
          <div className="w-full h-full bg-gray-300"></div>
        </div>

        {/* Content skeleton */}
        <div className="flex flex-col justify-between gap-4 w-full">
          <div className="space-y-1">
            {/* Title skeleton */}
            <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>

            {/* Details skeleton */}
            <div className="space-y-3 mt-4">
              {/* Check-in */}
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
              </div>

              {/* Check-out */}
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-32"></div>
              </div>

              {/* Nights */}
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-8"></div>
              </div>

              {/* Guests */}
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-14"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-6"></div>
              </div>

              {/* Total Price */}
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse w-24"></div>
              </div>
            </div>
          </div>

          {/* Button skeleton */}
          <div className="flex justify-end">
            <div className="h-10 bg-gray-200 rounded animate-pulse w-32 max-sm:w-full max-sm:mt-2"></div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ReservationCardSkeleton
