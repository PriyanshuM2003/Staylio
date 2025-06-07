import AddProperty from "@/components/pages/AddProperty";
import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function page() {
  const queryClient = new QueryClient();
  
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AddProperty />
    </HydrationBoundary>
  );
}

export const dynamic = "force-dynamic";
