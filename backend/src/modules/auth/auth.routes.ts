import { Router } from "express";
import { registerController, loginController } from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);