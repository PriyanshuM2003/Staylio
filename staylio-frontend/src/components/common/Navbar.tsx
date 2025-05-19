"use client";
import { useEffect, useState } from "react";
import FilterBar from "./FilterBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, User } from "lucide-react";
import Link from "next/link";
import AuthDialog from "./AuthDialog";
import { useAuthStore } from "@/stores/useAuthStore";
import { Button } from "../ui/button";

const Navbar = () => {
  const [openAuthDialog, setOpenAuthDialog] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const userId = useAuthStore((state) => state.userId);
  const refreshUserId = useAuthStore((state) => state.refreshUserId);
  const logout = useAuthStore((state) => state.logout);
  const bumpRefetchKey = useAuthStore((state) => state.bumpRefetchKey);

  useEffect(() => {
    refreshUserId();
  }, [refreshUserId]);

  const handleLoginAuth = () => {
    setAuthType("login");
    setOpenAuthDialog(true);
  };

  const handleSignUpAuth = () => {
    setAuthType("signup");
    setOpenAuthDialog(true);
  };

  const handleLogout = async () => {
    await logout();
    bumpRefetchKey();
  };

  return (
    <div className="z-50 gap-6 sticky top-0 border-b">
      <nav className="max-w-[96rem] w-full mx-auto flex items-center bg-white p-4 md:p-6 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Home className="stroke-red-500 shrink-0" />
          <h1 className="text-2xl font-bold text-red-500">Staylio</h1>
        </Link>
        <FilterBar />
        <div className="flex items-center gap-4">
          <Button asChild variant={"secondary"} className="rounded-full">
            <Link href={"/add-property"}>Staylio Your Home</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer hover:bg-accent rounded-full p-1">
              <User />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {userId ? (
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
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
        </div>
      </nav>

      <AuthDialog
        openAuthDialog={openAuthDialog}
        setOpenAuthDialog={setOpenAuthDialog}
        authType={authType}
        setAuthType={setAuthType}
      />
    </div>
  );
};

export default Navbar;
