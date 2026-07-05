"use client";
import React from "react";
import { useUnsplashGlobalContext } from "../context/unsplash-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SearchForm() {
  const { setSearchTerm } = useUnsplashGlobalContext();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const searchValue = (form.elements.namedItem("search") as HTMLInputElement)
      .value;
    if (!searchValue) {
      return;
    }
    setSearchTerm(searchValue);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <Input
        className="p-2 dark:text-black"
        type="text"
        name="search"
        id="search"
        placeholder="cat"
      />
      <Button type="submit" className="min-w-24 w-fit" variant={"outline"}>
        Search
      </Button>
    </form>
  );
}

export default SearchForm;
