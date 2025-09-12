/*
 * This code is used to help understand few shadcn components and their integration with react-hook-form
 */

"use client";
import ComboBox from "@/components/custom/combo-box";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useQuery } from "@tanstack/react-query";
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

const FormSchema = z.object({
  username: z.number().refine((v) => v > 0, {
    message: "Please select an option ",
  }),
});

export default function ComboBoxForm() {
  const userData = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      return fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      );
    },
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: 0,
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <ComboBox
                  options={userData.data}
                  form={form}
                  field={field}
                  label="username"
                  value="id"
                  loading={userData.isLoading}
                  defaultValue={0}
                />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
