import Conversation from "@/components/pages/Conversation";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Conversation />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
