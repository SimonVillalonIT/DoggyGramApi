import { v2 as cloudinary } from "cloudinary";
import { cloudinaryVariables } from "../config/envVariables";

cloudinary.config({
  cloud_name: cloudinaryVariables.cloud_name,
  api_key: cloudinaryVariables.api_key,
  api_secret: cloudinaryVariables.api_secret,
  secure: true,
});

export async function uploadImage(filePath: string, folder: string) {
  return await cloudinary.uploader.upload(filePath, {
    folder: folder,
  });
}

export async function deleteImage(publicId: string) {
  return await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
