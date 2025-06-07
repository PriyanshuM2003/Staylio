import Landlord from "@/components/pages/Landlord";
import { getUserId } from "@/services/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  const userId = await getUserId();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Landlord userId={userId!} />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
