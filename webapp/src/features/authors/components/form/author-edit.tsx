"use client";

import { revalidate } from "@/actions/reavalidate";
import { CustomButton } from "@/components/custom-button";
import { DeleteDialog } from "@/components/delete-dialog";
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
import { useCurrentRole } from "@/features/auth/hooks/use-current-role";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma, UserRole } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { deleteAuthor } from "../../actions/delete-author";
import { editAuthor } from "../../actions/edit-author";
import { AuthorSchema } from "../../schemas/author-schema";

interface Props {
  author: Prisma.authorsGetPayload<{
    include: {
      books: {
        include: {
          author: {
            select: {
              firstName: true;
              lastName: true;
              slug: true;
            };
          };
        };
      };
    };
  }>;
}

export const AuthorEditForm = ({ author }: Props) => {
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const userRole = useCurrentRole();

  const form = useForm<z.infer<typeof AuthorSchema>>({
    resolver: zodResolver(AuthorSchema),
    defaultValues: {
      firstName: author.firstName,
      lastName: author.lastName,
      slug: author.slug,
    },
  });

  const onSubmit = async (values: z.infer<typeof AuthorSchema>) => {
    setError(undefined);

    startTransition(() => {
      editAuthor(values, author.id)
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

  const onDelete = () => {
    startTransition(() => {
      deleteAuthor(author.id)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            router.push(`/authors`);
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
                        field.value.toLowerCase() +
                        "-" +
                        form.getValues("lastName")
                      )
                        .toLowerCase()
                        .replaceAll(/[^A-Z0-9]/gi, "-"),
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
                        field.value.toLowerCase()
                      )
                        .toLowerCase()
                        .replaceAll(/[^A-Z0-9]/gi, "-"),
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

        <div className="flex gap-4">
          <CustomButton
            buttonLabel="Add Author"
            type="submit"
            disabled={isPending}
          />
          {userRole !== UserRole.USER && (
            <DeleteDialog
              label={author.firstName + " " + author.lastName}
              asset={"Author"}
              onDelete={onDelete}
              hideLabelOnMobile={false}
              disabled={isPending}
            />
          )}
        </div>
      </form>
    </Form>
  );
};
