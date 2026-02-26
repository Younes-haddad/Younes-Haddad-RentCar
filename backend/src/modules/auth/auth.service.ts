import bcrypt from "bcrypt";
import { prisma } from "../../db/prisma";
import type { RegisterInput } from "./auth.validator";

export async function register(input: RegisterInput) {
  // email unique
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existing) {
    throw new Error("EMAIL_ALREADY_USED");
  }

  // hash password
  const passwordHash = await bcrypt.hash(input.password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      email: input.email,
      passwordHash,
      firstName: input.firstName,
      lastName: input.lastName,
      role: "USER",
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      role: true,
      createdAt: true,
    },
  });

  return user;
}