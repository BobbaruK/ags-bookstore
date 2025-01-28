"use client";

import { AddToCartBtn } from "@/components/add-to-cart-btn";
import { SortingArrows } from "@/components/sorting-arrows";
import { StockAlert } from "@/components/stock-alert";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format-currency";
import { dateFormatter } from "@/lib/format-date";
import { cn, columnId } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

type DB_Book = Prisma.booksGetPayload<{
  include: {
    createdBy: {
      select: {
        id: true;
      };
    };
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
    accessorFn: (originalRow) => originalRow.author?.slug || undefined,
    // enableHiding: false,
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
      const author = row.original.author;
      const slug = author?.slug;
      const authorName = `${author?.firstName} ${author?.lastName}`;

      if (author)
        return (
          <Link href={`/authors/${slug}`}>
            {row.original.author ? authorName : ""}
          </Link>
        );

      return "Unknown author";
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

      return <StockAlert stock={stock} />;
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
    cell: ({ row }) => {
      const bookId = row.original.id;
      const createdById =
        row.original.createdBy?.id || "cm6go3uhb0012nu1rua0viim5";

      return (
        <div className="flex items-center justify-start">
          <AddToCartBtn userId={createdById} bookId={bookId} />
        </div>
      );
    },
  },
];
