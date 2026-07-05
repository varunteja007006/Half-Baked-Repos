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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SearchableCombobox } from "@/components/atom";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { withErrorHandling } from "@/lib/error-handler";

const COMPANY_TYPES = [
  "Private Limited",
  "Public Limited",
  "LLP",
  "Partnership",
  "Sole Proprietorship",
  "Other",
] as const;

// Convert company types to combobox options
const COMPANY_TYPE_OPTIONS = COMPANY_TYPES.map((type) => ({
  value: type,
  label: type,
}));

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(200, "Name must be less than 200 characters"),
  companyType: z.enum(COMPANY_TYPES).optional(),
  contactPersonName: z.string().optional().or(z.literal("")),
  contactPersonEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  contactPersonPhone: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  state: z.string().optional().or(z.literal("")),
  gstNumber: z
    .string()
    .regex(/^[0-9A-Z]{15}$/i, "GST number should be 15 characters")
    .optional()
    .or(z.literal("")),
});

export interface CompanyFormProps {
  onSuccess?: () => void;
}

export default function CompanyForm({ onSuccess }: Readonly<CompanyFormProps>) {
  const [isLoading, setIsLoading] = React.useState(false);

  const createCompany = useMutation(api.company.createCompany);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyType: undefined,
      contactPersonName: "",
      contactPersonEmail: "",
      contactPersonPhone: "",
      city: "",
      state: "",
      gstNumber: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await withErrorHandling(
      async () => {
        const id = await createCompany({
          name: values.name,
          companyType: values.companyType,
          contactPersonName: values.contactPersonName || undefined,
          contactPersonEmail: values.contactPersonEmail || undefined,
          contactPersonPhone: values.contactPersonPhone || undefined,
          city: values.city || undefined,
          state: values.state || undefined,
          gstNumber: values.gstNumber || undefined,
        });
        return id;
      },
      {
        loadingMessage: "Creating company...",
        successMessage: "Company created successfully",
        errorMessage: "Failed to create company",
      },
    );

    if (result) {
      form.reset();
      onSuccess?.();
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name *</FormLabel>
              <FormControl>
                <Input placeholder="Enter company name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SearchableCombobox
          control={form.control}
          name="companyType"
          label="Company Type"
          placeholder="Select company type"
          searchPlaceholder="Search company types..."
          description="Optional"
          options={COMPANY_TYPE_OPTIONS}
          emptyMessage="No company type found."
          onSelectionChange={(value) => {
            console.log("Selected company type:", value);
          }}
        />

        <FormField
          control={form.control}
          name="gstNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GST Number</FormLabel>
              <FormControl>
                <Input placeholder="27ABCDE1234F1Z5" {...field} />
              </FormControl>
              <FormDescription>Optional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPersonName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Person</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPersonEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="contact@company.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactPersonPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Phone</FormLabel>
              <FormControl>
                <Input placeholder="+91 9876543210" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isLoading}>
            Reset
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Company"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
