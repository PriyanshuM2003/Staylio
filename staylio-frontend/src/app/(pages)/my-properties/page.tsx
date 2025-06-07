import MyProperties from "@/components/pages/MyProperties";
import { getUserId } from "@/services/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyProperties />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
