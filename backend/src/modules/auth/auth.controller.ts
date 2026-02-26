import type { Request, Response } from "express";
import { ZodError } from "zod";
import { registerSchema } from "./auth.validator";
import { register } from "./auth.service";

export async function registerController(req: Request, res: Response) {
  try {
    const input = registerSchema.parse(req.body);
    const user = await register(input);

    return res.status(201).json(user);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: err.flatten(),
      });
    }

    if (err instanceof Error && err.message === "EMAIL_ALREADY_USED") {
      return res.status(409).json({ message: "Email already used" });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}