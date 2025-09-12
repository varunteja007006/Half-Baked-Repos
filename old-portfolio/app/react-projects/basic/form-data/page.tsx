/*
 * This code is used to extract the form info using the form data api
 */

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import React from "react";

export default function Page() {
  const { toast } = useToast();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData);
    // The below line gives array of arrays
    // console.log([...formData.entries()]);

    //The below line gives the json object data

    toast({
      variant: "success",
      title: "Data Submitted",
      description: JSON.stringify(user),
    });

    // clear the input fields
    e.currentTarget.reset();
  }

  return (
    <div>
      <p className="mb-3">Form Data</p>
      <form onSubmit={onSubmit} className="flex flex-wrap gap-4 max-w-lg">
        <Input type="text" name="firstname" placeholder="First Name" />
        <Input type="text" name="lastname" placeholder="Last Name" />
        <Input type="text" name="city" placeholder="City" />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
