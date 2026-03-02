import { Router } from "express";
import { registerController, loginController } from "./auth.controller";
import { requireAuth } from "../../middlewares/requireAuth.js";

export const authRoutes = Router();

authRoutes.post("/register", registerController);
authRoutes.post("/login", loginController);

authRoutes.get("/me", requireAuth, (req, res) => {
  return res.json({
    user: req.user,
  });
});

