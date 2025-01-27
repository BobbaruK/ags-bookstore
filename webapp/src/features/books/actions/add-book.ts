"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { BookSchema } from "../schemas/book-schema";
import { prismaError } from "@/lib/prisma-error";

export const addBook = async (values: z.infer<typeof BookSchema>) => {
  const user = await currentUser();

  const validatedFields = BookSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { title, slug, author, price, stock } = validatedFields.data;

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  try {
    await db.books.create({
      data: {
        title,
        slug,
        price: parseFloat(`${price}`),
        stock: parseInt(`${stock}`),
        authorId: author,
        createdUserId: dbUser.id,
        updateUserId: dbUser.id,
      },
    });

    return {
      success: ACTION_MESSAGES("Book").SUCCESS_ADD,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Title and/or Slug") };

    throw error;
  }
};
