import { Router } from "express";
import { registerController } from "./auth.controller";

export const authRoutes = Router();

authRoutes.post("/register", registerController);