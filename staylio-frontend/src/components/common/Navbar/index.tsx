import FilterBar from "../FilterBar";

import { Home } from "lucide-react";
import Link from "next/link";
import { Button } from "../../ui/button";
import UserDropDown from "./UserDropDown";
import { getUserId } from "@/services/actions";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = async () => {
  const userId = await getUserId();

  return (
    <div className="z-50 gap-6 sticky top-0 border-b">
      <nav className="max-w-[96rem] w-full mx-auto flex items-center bg-background p-4 md:p-6 justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Home className="stroke-red-500 shrink-0" />
          <h1 className="text-2xl font-bold text-red-500">Staylio</h1>
        </Link>
        <FilterBar />
        <div className="flex items-center gap-4">
          {userId && (
            <Button asChild variant={"secondary"} className="rounded-full">
              <Link href={"/add-property"}>Staylio Your Home</Link>
            </Button>
          )}
          <UserDropDown userId={userId!} />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
