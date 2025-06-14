import AddProperty from "@/components/pages/AddProperty";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAccessToken } from "@/services/actions";
import { redirect } from "next/navigation";

export default async function page() {
  const queryClient = new QueryClient();
  const token = await getAccessToken();

  if (!token) {
    redirect("/");
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AddProperty />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
