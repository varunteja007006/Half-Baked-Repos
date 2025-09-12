"use client";
import React from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

let timer: NodeJS.Timeout;
let DELAY = 700;

let cache = new Map();

export default function GoogleSearch() {
  const { toast } = useToast();
  const [search, setSearch] = React.useState("");
  const [searchItems, setSearchItems] = React.useState(
    [] as { name: string; id: number }[]
  );
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null); // State to track the selected index

  const abortController = new AbortController();
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]); // To keep track of each item in the list

  const handleSearch = () => {
    if (search === "") {
      return;
    }

    if (cache.has(search)) {
      setSearchItems(cache.get(search) ?? []);
      return;
    }

    cache.set(search, []);
    fetch(`https://dummyjson.com/recipes/search?q=${search}`, {
      signal: abortController.signal,
    })
      .then((res) => res.json())
      .then((res) => {
        setSearchItems(res.recipes);
        cache.set(search, res.recipes);
      });
  };

  React.useEffect(() => {
    if (search === "") {
      setSelectedIndex(null);
      setSearchItems([]);
      return;
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      handleSearch();
    }, DELAY);

    return () => clearTimeout(timer);
  }, [search]);

  const arrowDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prevIndex) => {
        let newIndex =
          prevIndex === null
            ? 0
            : prevIndex === searchItems.length - 1
            ? 0
            : prevIndex + 1;
        itemRefs.current[newIndex]?.focus();
        return newIndex;
      });
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();

      setSelectedIndex((prevIndex) => {
        let newIndex =
          prevIndex === null || prevIndex === 0
            ? searchItems.length - 1
            : prevIndex - 1;
        itemRefs.current[newIndex]?.focus();
        return newIndex;
      });
    }

    if (e.key === "Enter") {
      e.preventDefault();
      console.log("hello");
      if (selectedIndex !== null) {
        let name = searchItems[selectedIndex].name;
        toast({
          title: "Item Selected",
          description: `You selected item ${name}`,
        });
      }
    }
  };

  React.useEffect(() => {
    document.addEventListener("keydown", arrowDown, {
      signal: abortController.signal,
    });

    return () => {
      abortController.abort();
    };
    // add search items here so that the listener will have the search items
  }, [searchItems, selectedIndex]);

  return (
    <div className="w-full max-w-[600px] mx-auto">
      <div className="flex flex-row items-stretch w-[400px]">
        <Input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-[300px] bg-white rounded rounded-r-none border-none text-black flex-1"
        />
        <Button
          onClick={handleSearch}
          className="rounded-l-none border-none dark:bg-white"
        >
          Search
        </Button>
      </div>
      {searchItems.length > 0 && (
        <div className="bg-white w-[400px] mt-1 rounded-md text-black p-1 max-h-[180px] overflow-y-auto z-50 shadow-md">
          {searchItems.map(
            (item: { id: number; name: string }, index: number) => (
              <div
                key={item.id}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }} // Assign ref for each item
                className={`py-1 px-2 cursor-default hover:bg-slate-100 ${
                  selectedIndex === index ? "bg-slate-200" : ""
                }`}
                tabIndex={-1}
                onMouseEnter={() => setSelectedIndex(index)}
                onMouseLeave={() => setSelectedIndex(null)}
              >
                {item.name}
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
