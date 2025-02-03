"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/prisma-error";
import { Prisma, UserRole } from "@prisma/client";

export const addCartItem = async (userId: string, bookId: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  // const dbUser = await getUserById(user.id);

  // if (!dbUser || user.role === UserRole.USER)
  //   return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingCartItem = await db.cart_item.findFirst({
    where: {
      booksId: bookId,
    },
  });

  if (!existingCartItem)
    try {
      const book = await db.books.findUnique({
        where: {
          id: bookId,
        },
      });

      if (!book)
        return {
          error: ACTION_MESSAGES("Book").DOES_NOT_EXISTS,
        };

      if (book.stock === 0) {
        return {
          error: "This book is not in stock",
        };
      }

      await db.cart_item.create({
        data: {
          userId,
          booksId: bookId,
          quantity: 1,
        },
      });

      return {
        success: ACTION_MESSAGES("Cart Item").SUCCESS_ADD,
      };
    } catch (error) {
      console.error("Something went wrong: ", JSON.stringify(error));

      if (error instanceof Prisma.PrismaClientKnownRequestError)
        return { ...prismaError(error, "Title and/or Slug") };

      throw error;
    }

  try {
    const cartItem = await db.cart_item.findUnique({
      where: {
        id: existingCartItem.id,
      },
    });

    if (!cartItem)
      return {
        error: ACTION_MESSAGES("Cart Item").COULD_NOT_ADD,
      };

    const book = await db.books.findUnique({
      where: {
        id: cartItem.booksId,
      },
    });

    if (!book)
      return {
        error: ACTION_MESSAGES("Book").DOES_NOT_EXISTS,
      };

    if (cartItem.quantity >= book.stock)
      return {
        error: "Stock not enough",
      };

    const cartUpdate = await db.cart_item.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: existingCartItem.quantity + 1,
      },
    });

    console.log("-------------------------------------");
    console.log({ cartItem });
    console.log({ book });
    console.log({ cartUpdate });

    return {
      success: ACTION_MESSAGES("Cart Item").SUCCESS_ADD,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Title and/or Slug") };

    throw error;
  }
};
