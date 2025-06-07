import Converstation from "@/components/pages/Converstation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Converstation />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
