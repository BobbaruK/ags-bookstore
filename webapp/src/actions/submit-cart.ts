"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import { SubmitBooks } from "@/features/books/types/submit-book";
import db from "@/lib/db";
import { prismaError } from "@/lib/prisma-error";
import { Prisma, UserRole } from "@prisma/client";

export const submitCart = async (items: SubmitBooks[]) => {
  if (!items.length) return { error: "Cart is empty!" };

  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  try {
    for (let i = 0; i < items.length; i++) {
      const element = items[i];

      console.log({ element });

      const book = await db.books.findUnique({
        where: {
          id: element.bookId,
        },
      });

      console.log({ book });

      if (!book)
        return {
          error: ACTION_MESSAGES().WENT_WRONG,
        };

      await db.books.update({
        where: {
          id: book.id,
        },
        data: {
          stock: book.stock - element.quantity,
        },
      });

      await db.cart_item.delete({
        where: {
          id: element.cartItemId,
        },
      });
    }

    return {
      success: "Succesfully bought",
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Title and/or Slug") };

    throw error;
  }
};
