import { v2 as cloudinary } from "cloudinary";
import { cloudinaryVariables } from "../config/envVariables";
import fs from "fs/promises";

cloudinary.config({
  cloud_name: cloudinaryVariables.cloud_name,
  api_key: cloudinaryVariables.api_key,
  api_secret: cloudinaryVariables.api_secret,
  secure: true,
});

export async function uploadImage(filePath: string, folder: string) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: folder,
  });
  await fs.unlink(filePath);
  return result;
}

export async function deleteImage(publicId: string) {
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
}

export default cloudinary;
