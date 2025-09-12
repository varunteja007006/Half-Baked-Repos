/*
 * This code is used to help understand few shadcn components and their integration with react-hook-form
 */

"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DateInput } from "@/components/custom/date-input";

const FormSchema = z.object({
  date: z.date({ required_error: "A date is required" }),
});

export default function DateInputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  const { toast } = useToast();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 w-full lg:w-96"
      >
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="w-fit">
              <FormLabel>Date Input</FormLabel>
              <FormControl>
                <DateInput value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormDescription>This is date input</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
