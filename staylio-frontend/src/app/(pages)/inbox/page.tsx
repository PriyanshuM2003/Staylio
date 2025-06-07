import InboxPage from "@/components/pages/InboxLayout/InboxPage";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-md:hidden">
        <InboxPage />
      </div>
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
