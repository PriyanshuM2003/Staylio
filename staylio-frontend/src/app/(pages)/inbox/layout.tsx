import InboxSidebar from "@/components/pages/InboxLayout/InboxSidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <div className="flex h-[80vh]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <InboxSidebar />
      </HydrationBoundary>
      <div className="flex-1 w-full h-full">{children}</div>
    </div>
  );
}
export const dynamic = "force-dynamic";
