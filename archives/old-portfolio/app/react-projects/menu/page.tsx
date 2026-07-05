"use client";
import * as React from "react";
import { menuData } from "./menu-data";
import MenuCard from "./MenuCard";
import { Button } from "@/components/ui/button";

const allCategories = [
  "all",
  ...Array.from(new Set(menuData.map((item) => item.category))),
];

export default function Page() {
  const [menuItems, setMenuItems] = React.useState(menuData);
  const [categories, setCategories] = React.useState(allCategories);

  const filterItems = (category: string) => {
    if (category === "all") {
      setMenuItems(menuData);
      return;
    }
    const newMenuItems = menuData.filter((item) => category === item.category);
    setMenuItems(newMenuItems);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap mt-4">
        {categories.map((item) => {
          return (
            <Button
              key={item}
              onClick={() => filterItems(item)}
              className="bg-purple-400 dark:bg-purple-600 btn hover:bg-purple-500 me-2"
            >
              {item}
            </Button>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-5 justify-start items-stretch mt-5">
        {menuItems.map((item) => {
          return <MenuCard key={item.id} item={item} />;
        })}
      </div>
    </div>
  );
}
