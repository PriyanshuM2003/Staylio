"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useConversationsDetail } from "@/hooks/api-hooks";
import { cn } from "@/lib/utils";
import { TMessage } from "@/types/types";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useWebSocket from "react-use-websocket";

const MessageBubble = React.memo(
  ({ message, isMyMessage }: { message: TMessage; isMyMessage: boolean }) => (
    <div className={cn("flex", isMyMessage ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "p-3 rounded-2xl max-w-[70%]",
          isMyMessage ? "bg-destructive text-white" : "bg-white text-black"
        )}
      >
        <p className="font-bold text-xs">
          {isMyMessage ? "You" : message.created_by?.username || message.name}
        </p>
        <p className="text-sm">{message.body}</p>
      </div>
    </div>
  )
);

MessageBubble.displayName = "MessageBubble";

const Conversation = ({ userId, token }: { userId: string; token: string }) => {
  const router = useRouter();
  const params = useParams();
  const messagesDiv = useRef<HTMLDivElement>(null);
  const [newMessage, setNewMessage] = useState("");
  const [realtimeMessages, setRealtimeMessages] = useState<TMessage[]>([]);

  const { data, isLoading, isError } = useConversationsDetail(
    params.id as string
  );

  const { conversation, messages, myUser, otherUser } = useMemo(() => {
    const conversation = data?.conversation;
    const messages = data?.messages || [];
    const myUser = conversation?.users?.find((user) => user.id === userId);
    const otherUser = conversation?.users?.find((user) => user.id !== userId);

    return { conversation, messages, myUser, otherUser };
  }, [data, userId]);

  const socketUrl = useMemo(
    () =>
      conversation?.id
        ? `${process.env.NEXT_PUBLIC_ASGI_URL}/${conversation.id}/?token=${token}`
        : null,
    [conversation?.id, token]
  );

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    socketUrl,
    {
      share: false,
      shouldReconnect: () => true,
    },
    !!socketUrl
  );

  const scrollToBottom = useCallback(() => {
    if (messagesDiv.current) {
      messagesDiv.current.scrollTop = messagesDiv.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (
      !lastJsonMessage ||
      typeof lastJsonMessage !== "object" ||
      !("name" in lastJsonMessage) ||
      !("body" in lastJsonMessage)
    ) {
      return;
    }

    const senderIsMe = lastJsonMessage.name === myUser?.username;

    const message: TMessage = {
      id: `realtime-${Date.now()}`,
      name: lastJsonMessage.name as string,
      body: lastJsonMessage.body as string,
      sent_to: senderIsMe ? otherUser! : myUser!,
      created_by: senderIsMe ? myUser! : otherUser!,
      conversationId: conversation?.id ?? "",
    };

    setRealtimeMessages((prev) => [...prev, message]);

    requestAnimationFrame(scrollToBottom);
  }, [lastJsonMessage, myUser, otherUser, conversation?.id, scrollToBottom]);

  const sendMessage = useCallback(() => {
    if (!newMessage.trim() || !conversation || !myUser || !otherUser) return;

    sendJsonMessage({
      event: "chat_message",
      data: {
        body: newMessage.trim(),
        name: myUser.username || "",
        sent_to_id: otherUser.id,
        conversation_id: conversation.id,
      },
    });

    setNewMessage("");
    requestAnimationFrame(scrollToBottom);
  }, [
    newMessage,
    conversation,
    myUser,
    otherUser,
    sendJsonMessage,
    scrollToBottom,
  ]);

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  const allMessages = useMemo(
    () => [
      ...messages.map((msg) => ({ ...msg, isRealtime: false })),
      ...realtimeMessages.map((msg) => ({ ...msg, isRealtime: true })),
    ],
    [messages, realtimeMessages]
  );

  if (isLoading) {
    return (
      <div className="rounded-r-2xl h-[80vh] p-4 border border-l-0 w-full flex items-center justify-center">
        <div className="text-muted-foreground">Loading conversation...</div>
      </div>
    );
  }

  if (isError || !conversation) {
    return (
      <div className="rounded-r-2xl h-[80vh] p-4 border border-l-0 w-full flex items-center justify-center">
        <div className="text-destructive">Failed to load conversation</div>
      </div>
    );
  }

  return (
    <div className="rounded-r-2xl h-[80vh] p-4 border border-l-0 w-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <ArrowLeft
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => router.push("/inbox")}
          />
          <h3 className="text-lg font-medium">
            {otherUser?.username || "Unknown User"}
          </h3>
          <div></div>
        </div>

        <div
          ref={messagesDiv}
          className="bg-accent p-4 w-full h-[60vh] overflow-auto scrollbar-none rounded-2xl space-y-3"
        >
          {allMessages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No messages yet. Start the conversation!
            </div>
          ) : (
            allMessages.map((message, index) => (
              <MessageBubble
                key={
                  message.isRealtime ? `realtime-${index}` : `msg-${message.id}`
                }
                message={message}
                isMyMessage={message.created_by?.id === userId}
              />
            ))
          )}
        </div>

        <div className="flex items-center gap-4 w-full">
          <Input
            className="w-full"
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={readyState !== 1}
          />
          <Button
            variant="destructive"
            onClick={sendMessage}
            disabled={!newMessage.trim() || readyState !== 1}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
