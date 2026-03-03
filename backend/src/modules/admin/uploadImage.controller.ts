import type { Request, Response } from "express";
import { uploadImageService } from "./uploadImage.service.js";

export async function uploadImageController(req: Request, res: Response) {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = await uploadImageService(file);

    return res.json({ imageUrl });
  } catch (error) {
    console.error("Upload error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
