import Conversation from "@/components/pages/Conversation";
import { getAccessToken, getUserId } from "@/services/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  const userId = await getUserId();
  const token = await getAccessToken();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Conversation userId={userId!} token={token!} />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
