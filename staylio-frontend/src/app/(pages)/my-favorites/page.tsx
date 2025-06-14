import MyFavorties from "@/components/pages/MyFavorites";
import { getAccessToken } from "@/services/actions";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

export default async function page() {
  const queryClient = new QueryClient();
  const token = await getAccessToken();

  if (!token) {
    redirect("/");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MyFavorties />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
