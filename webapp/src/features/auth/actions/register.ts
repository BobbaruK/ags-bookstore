"use server";

import db from "@/lib/db";
import bcrypt from "bcryptjs";
import z from "zod";
import { getUserByEmail } from "../data/user";
import { generateVerificationToken } from "../lib/tokens";
import { sendVerificationEmail } from "../lib/mail";
import { RegisterSchema } from "../schemas/register";
import { ACTION_MESSAGES } from "@/constants/messages";
import { Prisma } from "@prisma/client";
import { prismaError } from "@/lib/prisma-error";

/**
 * **{@linkcode register} server function**
 */
export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success)
    return { error: ACTION_MESSAGES().INVALID_FIELDS };

  const { email, firstName, lastName, userName, password } =
    validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: ACTION_MESSAGES().EMAIL_IN_USE };

  try {
    await db.user.create({
      data: { firstName, lastName, userName, email, password: hashedPassword },
    });

    let verificationToken;
    try {
      verificationToken = await generateVerificationToken(email);
    } catch (error) {
      console.error("Something went wrong: ", JSON.stringify(error));

      return { error: ACTION_MESSAGES().FAILED_VERIFICATION_TOKEN };
    }

    try {
      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token,
      );
    } catch (error) {
      console.error("Something went wrong: ", JSON.stringify(error));
      return { error: ACTION_MESSAGES().FAILED_VERIFICATION_EMAIL };
    }

    return { success: ACTION_MESSAGES().CONFIRMATION_SENT };
  } catch (error) {
    console.error("Something went wrong: ", JSON.stringify(error));

    if (error instanceof Prisma.PrismaClientKnownRequestError)
      return { ...prismaError(error, "Email") };

    throw error;
  }
};
