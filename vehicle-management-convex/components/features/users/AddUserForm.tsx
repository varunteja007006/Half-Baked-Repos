"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import { toast } from "sonner";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { isEmail } from "validator";
import { useForm } from "react-hook-form";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { RequiredTag } from "@/components/atom";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .optional()
    .refine((val) => !val || isEmail(val), {
      message: "Invalid email",
    }),
  phoneNumber: z.string().optional(),
  whatsappNumber: z.string().optional(),
  aadhar: z.string().optional(),
  pan: z.string().optional(),
  bloodGroup: z.string().optional(),
  isDriver: z.boolean().optional(),
  isAdmin: z.boolean().optional(),
  isSuper: z.boolean().optional(),
});

export type AddUserFormProps = {
  onSuccess?: () => void;
};

type FormValues = z.infer<typeof formSchema>;

export function AddUserForm({ onSuccess }: Readonly<AddUserFormProps>) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      whatsappNumber: "",
      aadhar: "",
      pan: "",
      bloodGroup: "",
      isDriver: false,
      isAdmin: false,
      isSuper: false,
    },
  });

  const createUser = useMutation(api.appUser.createAppUser);

  async function onSubmit(values: FormValues) {
    const roles = [
      values.isDriver ? "driver" : null,
      values.isAdmin ? "admin" : null,
      values.isSuper ? "super" : null,
    ].filter(Boolean) as ("driver" | "admin" | "super")[];

    try {
      await createUser({
        name: values.name || undefined,
        email: values.email || undefined,
        phoneNumber: values.phoneNumber || undefined,
        whatsappNumber: values.whatsappNumber || undefined,
        aadhar: values.aadhar || undefined,
        pan: values.pan || undefined,
        bloodGroup: values.bloodGroup || undefined,
        roles: roles.length > 0 ? roles : undefined,
      });
      toast.success("User created successfully");
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast.error("Failed to create user");
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name
                <RequiredTag />
              </FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="whatsappNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter WhatsApp number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="aadhar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhaar</FormLabel>
              <FormControl>
                <Input placeholder="Enter Aadhaar number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAN</FormLabel>
              <FormControl>
                <Input placeholder="Enter PAN" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bloodGroup"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Blood Group</FormLabel>
              <FormControl>
                <Input placeholder="Enter blood group (e.g., A+)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="space-y-2">
          <FormLabel>Roles</FormLabel>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="isDriver"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-normal">Driver</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-normal">Admin</FormLabel>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isSuper"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormLabel className="font-normal">Super</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit" className="w-full">
          Create User
        </Button>
      </form>
    </Form>
  );
}
