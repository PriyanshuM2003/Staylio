import React from "react";
import FilterBar from "./FilterBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Home, User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center bg-white z-50 gap-6 sticky top-0 border-b p-6 justify-between">
      <div className="flex items-center gap-2">
        <Home className="stroke-red-500 shrink-0" />
        <h1 className="text-2xl font-bold text-red-500">Staylio</h1>
      </div>
      <FilterBar />
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer hover:bg-accent rounded-full p-1">
          <User />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem className="cursor-pointer">
            Sign up
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Login</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="cursor-pointer">Host</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
