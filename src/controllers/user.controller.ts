import { uploadImage } from "../utils/cloudinary";

async function userController(req, res) {
    if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath, "Hola")
        console.log(result);
    }
}

export default userController;