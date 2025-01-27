"use client";

import { CustomButton } from "@/components/custom-button";
import { SortingArrows } from "@/components/sorting-arrows";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-currency";
import { dateFormatter } from "@/lib/format-date";
import { cn, columnId } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type DB_Book = Prisma.booksGetPayload<{
  include: {
    author: {
      select: {
        firstName: true;
        lastName: true;
        slug: true;
      };
    };
  };
}>;

export const columns: ColumnDef<DB_Book>[] = [
  // Name
  {
    ...columnId({ id: "name" }),
    accessorFn: (originalRow) => originalRow.title.toLowerCase(),
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          Title
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },

    cell: ({ row }) => {
      const slug = row.original.slug;
      const title = row.original.title;

      return <Link href={`/books/${slug}`}>{title}</Link>;
    },
  },
  // Author
  {
    ...columnId({ id: "author" }),
    accessorFn: (originalRow) => originalRow.author.slug,
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          Author
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },

    cell: ({ row }) => {
      const slug = row.original.slug;
      const authorName = `${row.original.author.firstName} ${row.original.author.lastName}`;

      return <Link href={`/authors/${slug}`}>{authorName}</Link>;
    },
  },
  // Price
  {
    ...columnId({ id: "price" }),
    accessorFn: (originalRow) => originalRow.price,
    enableHiding: false,
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          Price
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },

    cell: ({ row }) => {
      return formatCurrency(row.original.price);
    },
  },
  // Stock
  {
    ...columnId({ id: "stock" }),
    accessorFn: (originalRow) => originalRow.stock,
    enableHiding: false,
    enableSorting: false,
    header: () => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          // onClick={() => column.toggleSorting()}
        >
          Stock
          {/* <SortingArrows sort={column.getIsSorted()} /> */}
        </Button>
      );
    },

    cell: ({ row }) => {
      const stock = row.original.stock;

      if (stock > 10)
        return <div className="size-6 rounded-full bg-success"></div>;

      if (stock > 5)
        return <div className="size-6 rounded-full bg-warning"></div>;

      return <div className="size-6 rounded-full bg-danger"></div>;
    },
  },
  // Created At
  {
    ...columnId({ id: "createdAt" }),
    accessorFn: (originalRow) => originalRow.createdAt,
    sortingFn: "datetime",
    sortDescFirst: false,
    header: ({ column }) => {
      return (
        <Button
          variant="link"
          className={cn(
            "flex cursor-pointer items-center justify-start gap-2 p-0 text-inherit",
          )}
          onClick={() => column.toggleSorting()}
        >
          Created At
          <SortingArrows sort={column.getIsSorted()} />
        </Button>
      );
    },
    cell: ({ getValue }) => {
      const date = getValue() as Date | null;
      return date ? dateFormatter({ date }) : "-";
    },
  },
  // Actions
  {
    ...columnId({ id: "actions" }),
    enableHiding: false,
    header: () => {
      return "Actions";
    },
    cell: () => {
      return (
        <div className="flex items-center justify-start">
          <CustomButton
            buttonLabel="Add to cart"
            size={"sm"}
            variant={"outline"}
          />
        </div>
      );
    },
  },
];
