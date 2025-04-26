"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  PocketIcon as Pool,
  Castle,
  Trees,
  Mountain,
  Home,
  Filter,
} from "lucide-react";

export default function CategoryFilter() {
  const [activeCategory, setActiveCategory] = useState("amazing-pools");

  const categories = [
    {
      id: "amazing-pools",
      name: "Amazing pools",
      icon: <Pool className="h-6 w-6" />,
    },
    { id: "icons", name: "Icons", icon: <Castle className="h-6 w-6" /> },
    { id: "farms", name: "Farms", icon: <Home className="h-6 w-6" /> },
    { id: "cabins", name: "Cabins", icon: <Home className="h-6 w-6" /> },
    {
      id: "countryside",
      name: "Countryside",
      icon: <Trees className="h-6 w-6" />,
    },
    {
      id: "treehouses",
      name: "Treehouses",
      icon: <Trees className="h-6 w-6" />,
    },
    { id: "omg", name: "OMG!", icon: <Mountain className="h-6 w-6" /> },
  ];

  return (
    <div className="flex items-center gap-6 justify-center">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className={`flex flex-col items-center cursor-pointer gap-1 h-auto py-2 px-4 ${
            activeCategory === category.id
              ? "border-b-2 border-black text-black"
              : "text-muted-foreground"
          }`}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.icon}
          <span className="text-xs font-medium">{category.name}</span>
        </Button>
      ))}
      <div className="border-l pl-4">
        <Button
          variant="outline"
          className="rounded-full h-12 px-4 flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </Button>
      </div>
    </div>
  );
}
