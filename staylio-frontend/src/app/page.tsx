import React from "react";
import Properties from "@/components/pages/Properties";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function Home() {
  const queryClient = new QueryClient();

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Properties />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
