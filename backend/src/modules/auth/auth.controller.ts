import type { Request, Response } from "express";
import { ZodError } from "zod";
import { registerSchema, loginSchema } from "./auth.validator";
import { register, login } from "./auth.service";

// REGISTER
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
      return res.status(409).json({ message: "Email déja utilisé" });
    }

    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// LOGIN
export async function loginController(req: Request, res: Response) {
  try {
    const input = loginSchema.parse(req.body);
    const result = await login(input);

    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: err.flatten(),
      });
    }

    if (err instanceof Error) {
        if (err.message === "EMAIL_NOT_FOUND") {
            return res.status(404).json({ message: "Cet email n'existe pas" });
        }

        if (err.message === "WRONG_PASSWORD") {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }
}


    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
