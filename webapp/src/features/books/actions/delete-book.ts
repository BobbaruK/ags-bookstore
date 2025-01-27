"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/prisma-error";
import { Prisma, UserRole } from "@prisma/client";

export const deleteBook = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingBook = await db.books.findUnique({
    where: {
      id,
    },
  });

  if (!existingBook)
    return {
      error: ACTION_MESSAGES("Book").DOES_NOT_EXISTS,
    };

  try {
    await db.books.delete({
      where: { id },
    });

    return {
      success: ACTION_MESSAGES("Book").SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Title and/or Slug") };

    throw error;
  }
};
