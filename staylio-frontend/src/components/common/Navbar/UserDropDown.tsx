"use client";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "../../ui/separator";
import { User } from "lucide-react";
import Link from "next/link";
import AuthDialog from "../AuthDialog";
import { resetAuthCookies } from "@/services/actions";
import { useQueryClient } from "@tanstack/react-query";

const UserDropDown = ({ userId }: { userId: string }) => {
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const queryClient = useQueryClient();

  const handleSignUpAuth = () => {
    setAuthType("signup");
    setOpenAuthDialog(true);
  };

  const handleLoginAuth = () => {
    setAuthType("login");
    setOpenAuthDialog(true);
  };

  const handleLogout = async () => {
    await resetAuthCookies();
    queryClient.clear();
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer hover:bg-accent rounded-full p-1">
          <User />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {userId ? (
            <>
              <DropdownMenuItem asChild>
                <Link href={"/my-properties"}>My Properties</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/my-reservations"}>My Reservations</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/my-favorites"}>My Favorties</Link>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem asChild>
                <Link href={"/inbox"}>Inbox</Link>
              </DropdownMenuItem>
              <Separator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={handleSignUpAuth}>
                Sign up
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLoginAuth}>
                Login
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {openAuthDialog && (
        <AuthDialog
          openAuthDialog={openAuthDialog}
          setOpenAuthDialog={setOpenAuthDialog}
          authType={authType}
          setAuthType={setAuthType}
        />
      )}
    </>
  );
};

export default UserDropDown;
