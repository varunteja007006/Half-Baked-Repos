"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const items = [
  {
    id: "1",
    label: "Recents",
  },
  {
    id: "2",
    label: "Home",
  },
  {
    id: "3",
    label: "Applications",
  },
  {
    id: "4",
    label: "Desktop",
  },
  {
    id: "5",
    label: "Downloads",
  },
  {
    id: "6",
    label: "Documents",
  },
] as const;

const formSchema = z.object({
  username: z.string().min(2).max(50),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});
function MyForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      items: ["1", "2"],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  useEffect(() => {
    console.log(form.getValues("username"));
  }, [form.watch("username")]);

  return (
    <div>
      {" "}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={(obj) => {
              console.log(obj); // gets you the minimum things
              console.log(form.register("username")); // for more granular control
              // as per react hook form docs
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...obj.field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="items"
            render={() => (
              <FormItem>
                <div className="mb-4">
                  <FormLabel className="text-base">Sidebar</FormLabel>
                  <FormDescription>
                    Select the items you want to display in the sidebar.
                  </FormDescription>
                </div>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="items"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-y-0 space-x-3"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default MyForm;
