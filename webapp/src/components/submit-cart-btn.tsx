"use client";

import { revalidate } from "@/actions/reavalidate";
import { submitCart } from "@/actions/submit-cart";
import { ACTION_MESSAGES } from "@/constants/messages";
import { SubmitBooks } from "@/features/books/types/submit-book";
import { Prisma } from "@prisma/client";
import { toast } from "sonner";
import { CustomButton } from "./custom-button";

interface Props {
  items: Prisma.cart_itemGetPayload<{
    include: {
      product: {
        select: {
          title: true;
          slug: true;
          price: true;
          stock: true;
        };
      };
    };
  }>[];
}

export const SubmitCartBtn = ({ items }: Props) => {
  const books: SubmitBooks[] = items.map((item) => ({
    cartItemId: item.id,
    bookId: item.booksId,
    quantity: item.quantity,
  }));

  const submitCartItems = async () => {
    await submitCart(books)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }
        if (data.success) {
          toast.success(data.success);
        }
        revalidate();
      })
      .catch(() => toast.error(ACTION_MESSAGES().WENT_WRONG));
  };

  return <CustomButton buttonLabel="Submit" onClick={submitCartItems} />;
};
