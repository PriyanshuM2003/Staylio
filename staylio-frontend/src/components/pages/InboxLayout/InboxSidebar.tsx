"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useConversations } from "@/hooks/api-hooks";
import type { TConveration } from "@/types/types";
import { cn } from "@/lib/utils";
import InboxSkeleton from "@/components/common/skeletons/InboxSkeleton";

const InboxSidebar = ({ userId }: { userId: string }) => {
  const params = useParams();
  const activeConversationId = params.id as string;

  const { data, isLoading, isError } = useConversations();

  let content;
  if (isLoading) {
    content = (
      <div>
        {Array.from({ length: 6 }).map((_, index) => (
          <InboxSkeleton key={index} />
        ))}
      </div>
    );
  } else if (isError) {
    content = (
      <div className="p-4 text-center text-destructive">
        Failed to load conversations
      </div>
    );
  } else {
    content = (
      <div>
        {data?.map((inbox: TConveration) => {
          const otherUser = inbox.users.find((user) => user.id != userId);
          const isActive = activeConversationId === inbox.id;

          return (
            <Link
              href={`/inbox/conversation/${inbox.id}`}
              key={inbox.id}
              className={cn(
                "flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 transition-colors",
                isActive
                  ? "bg-white border-l-4 border-l-destructive shadow-sm"
                  : "hover:bg-white"
              )}
            >
              <div className="flex w-full items-center gap-2">
                <span
                  className={cn("font-medium", isActive && "text-destructive")}
                >
                  {otherUser?.username}
                </span>
                {/* <span className="ml-auto text-xs">{inbox.date}</span> */}
              </div>

              {/* <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                {inbox.teaser}
              </span> */}
            </Link>
          );
        })}
      </div>
    );
  }

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

      <div>{content}</div>
    </div>
  );
};

export default InboxSidebar;
