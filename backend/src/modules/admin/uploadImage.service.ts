import cloudinary from "../../lib/cloudinary.js";

export async function uploadImageService(file: Express.Multer.File): Promise<string> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "rentcar/vehicles" },
      (error, result) => {
        if (error) reject(error);
        else if (!result) reject(new Error("No result from Cloudinary"));
        else resolve(result.secure_url);
      }
    );

    stream.end(file.buffer);
  });
}
