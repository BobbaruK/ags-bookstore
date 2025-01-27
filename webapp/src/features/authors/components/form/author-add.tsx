"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomButton } from "@/components/custom-button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ACTION_MESSAGES } from "@/constants/messages";
import { FormError } from "@/features/auth/components/form-error";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { addAuthor } from "../../actions/add-author";
import { AuthorSchema } from "../../schemas/author-schema";

export const AuthorAddForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof AuthorSchema>>({
    resolver: zodResolver(AuthorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      slug: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AuthorSchema>) => {
    setError(undefined);

    startTransition(() => {
      addAuthor(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push("/authors");
          }
          revalidate();
        })
        .catch(() => setError(ACTION_MESSAGES().WENT_WRONG));
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl
                  onKeyUp={() => {
                    form.setValue(
                      "slug",
                      (
                        field.value
                          .toLowerCase()
                          .replaceAll(/[^A-Z0-9]/gi, "-") +
                        "-" +
                        form.getValues("lastName")
                      ).toLowerCase(),
                    );
                  }}
                >
                  <Input
                    {...field}
                    placeholder="Cassandra"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl
                  onKeyUp={() => {
                    form.setValue(
                      "slug",
                      (
                        form.getValues("firstName") +
                        "-" +
                        field.value.toLowerCase().replaceAll(/[^A-Z0-9]/gi, "-")
                      ).toLowerCase(),
                    );
                  }}
                >
                  <Input {...field} placeholder="Clare" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="brand" type="text" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormError message={error} />
        <CustomButton
          buttonLabel="Add Author"
          type="submit"
          disabled={isPending}
        />
      </form>
    </Form>
  );
};
