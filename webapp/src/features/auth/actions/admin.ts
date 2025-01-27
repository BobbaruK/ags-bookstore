"use server";

import { UserRole } from "@prisma/client";
import { currentRole } from "../lib/auth";

// TODO: better centralized messages in constants folder and in ALL actions

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allow server action!" };
  }

  return { error: "Forbidden server action!" };
};
