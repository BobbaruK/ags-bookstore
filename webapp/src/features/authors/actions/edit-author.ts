"use server";

import { ACTION_MESSAGES } from "@/constants/messages";
import { getUserById } from "@/features/auth/data/user";
import { currentUser } from "@/features/auth/lib/auth";
import db from "@/lib/db";
import { prismaError } from "@/lib/prisma-error";
import { Prisma, UserRole } from "@prisma/client";
import { z } from "zod";
import { AuthorSchema } from "../schemas/author-schema";

export const editAuthor = async (
  values: z.infer<typeof AuthorSchema>,
  id: string,
) => {
  const user = await currentUser();

  const validatedFields = AuthorSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { firstName, lastName, slug } = validatedFields.data;

  if (!user || !user.id) {
    return { error: ACTION_MESSAGES().UNAUTHORIZED };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser || user.role === UserRole.USER)
    return { error: ACTION_MESSAGES().UNAUTHORIZED };

  try {
    await db.authors.update({
      where: {
        id,
      },
      data: {
        firstName,
        lastName,
        slug,
        createdUserId: dbUser.id,
        updateUserId: dbUser.id,
      },
    });

    return {
      success: ACTION_MESSAGES("Author").SUCCESS_ADD,
    };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Slug") };

    throw error;
  }
};
