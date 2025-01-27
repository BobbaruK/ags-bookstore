import { ACTION_MESSAGES, PRISMA_MESSAGES } from "@/constants/messages";
import { Prisma } from "@prisma/client";

export const prismaError = (
  err: Prisma.PrismaClientKnownRequestError,
  resource?: string,
) => {
  switch (err.code) {
    case "P2002":
      return { error: PRISMA_MESSAGES(resource).P2002 };

    default:
      return { error: ACTION_MESSAGES().COULD_NOT_ADD };
  }
};
