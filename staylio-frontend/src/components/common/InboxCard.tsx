"use client";
import React from "react";
import {
  Card,
  //   CardContent,
  //   CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";

const InboxCard = () => {
  return (
    <Card className="p-4">
      <CardHeader className="p-0">
        <CardTitle>Jone Doe</CardTitle>
        {/* <CardDescription>Card Description</CardDescription> */}
      </CardHeader>
      {/* <CardContent>
        <p>Card Content</p>
      </CardContent> */}
      <CardFooter className="p-0">
        <Button variant={"destructive"}>Go to converstation</Button>
      </CardFooter>
    </Card>
  );
};

export default InboxCard;
