import React from "react";
import FilterBar from "./FilterBar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

const Navbar = () => {
  return (
    <div className="flex items-center z-50 sticky top-0 border-b p-6 justify-between">
      <h1 className="text-2xl font-bold text-red-500">Staylio</h1>
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
