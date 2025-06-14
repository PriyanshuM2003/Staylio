"use client";
import React from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useConversations } from "@/hooks/api-hooks";
import { TConveration } from "@/types/types";
const InboxSidebar = ({ userId }: { userId: string }) => {
  const {
    data,
    // isLoading, isError
  } = useConversations();

  return (
    <div className="bg-gray-100 max-md:rounded-2xl md:rounded-l-2xl overflow-y-auto scrollbar-none w-full md:w-[22rem] border">
      <div className="gap-3.5 space-y-4 border-b p-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-base font-medium text-foreground">Inbox</div>
          <Label className="flex items-center gap-2 text-sm">
            <span>Unreads</span>
            <Switch className="shadow-none" />
          </Label>
        </div>
        <Input className="bg-white" placeholder="Type to search..." />
      </div>
      <div>
        <div>
          {data?.map((inbox: TConveration) => {
            const otherUser = inbox.users.find((user) => user.id != userId);
            return (
              <Link
                href={`/inbox/conversation/${inbox.id}`}
                key={inbox.id}
                className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-white"
              >
                <div className="flex w-full items-center gap-2">
                  <span>{otherUser?.username}</span>{" "}
                  {/* <span className="ml-auto text-xs">{inbox.date}</span> */}
                </div>

                {/* <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                  {inbox.teaser}
                </span> */}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InboxSidebar;
