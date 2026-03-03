import { Router } from "express";
import { requireAuth } from "../../middlewares/requireAuth.js";
import { requireAdmin } from "../../middlewares/requireAdmin.js";
import { upload } from "../../middlewares/upload.js";
import { uploadImageController } from "./uploadImage.controller.js";

const adminRoutes = Router();

adminRoutes.post(
  "/vehicles/upload-image",
  requireAuth,
  requireAdmin,
  upload.single("image"),
  uploadImageController
);

export default adminRoutes;
