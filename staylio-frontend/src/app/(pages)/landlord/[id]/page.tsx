import Landlord from "@/components/pages/Landlord";
import { getUserId } from "@/services/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const userId = await getUserId();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Landlord id={params.id} userId={userId!} />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
