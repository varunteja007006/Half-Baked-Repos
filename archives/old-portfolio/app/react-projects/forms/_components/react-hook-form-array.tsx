"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
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
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { localAPI } from "@/constants/api.constants";

const FormSchema = z.object({
  Company: z.string().min(2, {
    message: "Company must be at least 2 characters.",
  }),
  users: z.array(
    z.object({
      name: z.string().min(2, {
        message: "Company must be at least 2 characters.",
      }),
      email: z.string().email({ message: "Invalid email" }),
    })
  ),
});

const initialValues = {
  Company: "",
  users: [
    {
      name: "",
      email: "",
    },
  ],
};

export default function ReactHookFormArray({
  id,
}: Readonly<{ id: string | null }>) {
  const { toast } = useToast();

  const [edit, setEdit] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "users",
  });

  async function getData() {
    const res = await fetch(`${localAPI}/company/${id}`);
    const data = await res.json();
    form.reset(data);
  }

  React.useEffect(() => {
    if (id) {
      getData();
      setEdit(true);
    }
  }, [id]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });

    const res = await fetch(`${localAPI}/company/${edit ? id : ""}`, {
      method: edit ? "PUT" : "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Something went wrong");
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">Submitted</code>
        </pre>
      ),
    });
    if (!edit) {
      form.reset(initialValues);
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Field Array {edit ? "Edit" : "Create"}</CardTitle>
          <CardDescription>
            Special functionality in react hook form
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="Company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {fields.map((field, index) => (
                <div key={field.id} className="p-2 space-y-4 rounded-md border">
                  <p>Record {index + 1}</p>
                  <FormField
                    control={form.control}
                    name={`users.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`users.${index}.email`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="email@test.com"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {index > 0 && (
                    <Button
                      type="button"
                      variant="destructive"
                      onClick={() => remove(index)}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              {fields.length < 3 && (
                <Button
                  type="button"
                  onClick={() => append({ name: "", email: "" })}
                >
                  Add More
                </Button>
              )}
              <div className="flex gap-5 justify-center items-center w-full">
                <Button variant={"success"} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
