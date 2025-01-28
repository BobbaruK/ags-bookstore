"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/prisma-error";
import { Prisma, UserRole } from "@prisma/client";

export const deleteAuthor = async (id: string) => {
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  const existingAuthor = await db.authors.findUnique({
    where: {
      id,
    },
  });

  if (!existingAuthor)
    return {
      error: ACTION_MESSAGES("Author").DOES_NOT_EXISTS,
    };

  try {
    await db.authors.delete({
      where: { id },
    });

    return {
      success: ACTION_MESSAGES("Author").SUCCESS_DELETE,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Slug") };

    throw error;
  }
};
