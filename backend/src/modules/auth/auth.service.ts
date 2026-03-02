import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../db/prisma";
import type { RegisterInput, LoginInput } from "./auth.validator";

// REGISTER
export async function register(input: RegisterInput) {
  // Vérifier si l'email existe déjà
  const existing = await prisma.user.findUnique({
    where: { email: input.email },
  });

  if (existing) {
    throw new Error("EMAIL_ALREADY_USED");
  }

  // Hasher le mot de passe
  const passwordHash = await bcrypt.hash(input.password, 10);

  // Créer l'utilisateur
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

// LOGIN
export async function login(input: LoginInput) {
  const { email, password } = input;

  // 1) Vérifier si l'utilisateur existe
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("EMAIL_NOT_FOUND");
  }

  // 2) Vérifier le mot de passe
  const isValid = await bcrypt.compare(password, user.passwordHash);

  if (!isValid) {
    throw new Error("WRONG_PASSWORD");
  }

  // 3) Générer le token JWT
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    { expiresIn: "7d" }
  );

  // 4) Retourner token + infos user
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    },
  };
}
