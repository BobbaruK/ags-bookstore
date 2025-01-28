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

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingCartItem = await db.cart_item.findFirst({
    where: {
      booksId: bookId,
    },
  });

  if (!existingCartItem)
    try {
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
    await db.cart_item.update({
      where: {
        id: existingCartItem.id,
      },
      data: {
        quantity: existingCartItem.quantity + 1,
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
};
