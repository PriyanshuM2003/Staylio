import MyReservations from "@/components/pages/MyReservations";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyReservations />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
