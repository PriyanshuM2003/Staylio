import MyFavorties from "@/components/pages/MyFavorites";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyFavorties />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
