import InboxSidebar from "@/components/pages/InboxLayout/InboxSidebar";
import { getAccessToken, getUserId } from "@/services/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const userId = await getUserId();
  const token = await getAccessToken();

  if (!token) {
    redirect("/");
  }

  return (
    <div className="flex h-[80vh]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <InboxSidebar userId={userId!} />
      </HydrationBoundary>
      <div className="flex-1 w-full h-full">{children}</div>
    </div>
  );
}
export const dynamic = "force-dynamic";
