import InboxSidebar from "@/components/pages/InboxLayout/InboxSidebar";
import React from "react";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[80vh]">
      <InboxSidebar />
      <div className="flex-1 w-full h-full">{children}</div>
    </div>
  );
}
