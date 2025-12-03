"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { cn } from "@/lib/utils";
import { withErrorHandling } from "@/lib/error-handler";

const formSchema = z.object({
  account_number: z.string().min(4).max(64),
  account_holder_name: z.string().min(2).max(128),
  ifsc_code: z.string().min(4).max(16),
  branch_name: z.string().min(1).max(128),
  branch_address: z.string().min(1).max(256),
  branch_city: z.string().min(1).max(128),
  branch_pincode: z.string().min(3).max(20),
});

export default function UserBankDetails({ className }: Readonly<{ className?: string }>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account_number: "",
      account_holder_name: "",
      ifsc_code: "",
      branch_name: "",
      branch_address: "",
      branch_city: "",
      branch_pincode: "",
    },
  });

  const bankList = useQuery(api.bank.listUserBankDetails, {});
  const submitBank = useMutation(api.bank.submitUserBankDetails);
  const updateBank = useMutation(api.bank.updateUserBankDetails);

  React.useEffect(() => {
    if (bankList && bankList.length > 0) {
      // Prefill with the first record
      const b = bankList[0];
      form.reset({
        account_number: b.account_number || "",
        account_holder_name: b.account_holder_name || "",
        ifsc_code: b.ifsc_code || "",
        branch_name: b.branch_name || "",
        branch_address: b.branch_address || "",
        branch_city: b.branch_city || "",
        branch_pincode: b.branch_pincode || "",
      });
    }
  }, [bankList, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const isUpdating = bankList && bankList.length > 0;

    await withErrorHandling(
      async () => {
        if (isUpdating) {
          // Update existing
          await updateBank({
            id: bankList[0]._id,
            account_number: values.account_number,
            account_holder_name: values.account_holder_name,
            ifsc_code: values.ifsc_code,
            branch_name: values.branch_name,
            branch_address: values.branch_address,
            branch_city: values.branch_city,
            branch_pincode: values.branch_pincode,
          });
        } else {
          await submitBank(values);
        }
      },
      {
        loadingMessage: isUpdating ? "Updating bank details..." : "Saving bank details...",
        successMessage: isUpdating
          ? "Bank details updated successfully"
          : "Bank details saved successfully",
        errorMessage: "Failed to save bank details",
      },
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className={cn("space-y-6", className)}>
          <FormField
            control={form.control}
            name="account_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="account_holder_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account holder name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ifsc_code"
            render={({ field }) => (
              <FormItem>
                <FormLabel>IFSC</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch address</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch_city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch city</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="branch_pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Branch pincode</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-row w-full items-center justify-center">
          <Button className="cursor-pointer" type="submit">
            Save bank details
          </Button>
        </div>
      </form>
    </Form>
  );
}
