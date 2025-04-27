"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Converstation = () => {
  const router = useRouter();
  return (
    <div className="rounded-r-2xl h-[80vh] p-4 border border-l-0 w-full">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => router.push("/inbox")}
          />
          <h3 className="text-lg font-medium">Jone Doe</h3>
          <h4 className="text-muted-foreground text-sm">Last seen: 2hrs ago</h4>
        </div>

        <div className="bg-accent p-2 w-full h-[60vh] overflow-auto scrollbar-none rounded-2xl">
          {/* Client message */}
          <div className="flex">
            <div className="bg-white p-3 rounded-2xl max-w-[70%]">
              <p className="text-sm">I need assistance with my order.</p>
            </div>
          </div>

          {/* User message */}
          <div className="flex justify-end">
            <div className="bg-destructive text-white p-3 rounded-2xl max-w-[70%]">
              <p className="text-sm">
                Sure! Could you please provide your order ID?
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 w-full">
          <Input className="w-full" placeholder="Type your message..." />
          <Button variant={"destructive"}>Send</Button>
        </div>
      </div>
    </div>
  );
};

export default Converstation;
