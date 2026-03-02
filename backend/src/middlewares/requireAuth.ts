import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Missing Authorization header" });
    }

    // Format attendu : "Bearer <token>"
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Invalid Authorization format" });
    }

    // Vérifier et décoder le token
    const payload = jwt.verify(token, process.env.JWT_SECRET as string);

    // Ajouter les infos du token dans req.user
    req.user = payload as { userId: string; role: string };

    next(); // On continue vers la route
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
