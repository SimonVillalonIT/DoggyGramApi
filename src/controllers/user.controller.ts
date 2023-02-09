import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { userRegister } from "../models/user.model";
import { uploadImage } from "../utils/cloudinary";

export async function register(req: Request, res: Response) {

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    try {
        await userRegister(req.body.name, req.body.email, password, "Hello")
        res.status(200).json({ status: 200, message: "ok😁" })
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") res.status(400).json({ error: "The email address is already used" })
        res.status(400).send(error);
    }

    // if (req.files?.image) {
    //     const result = await uploadImage(req.files.image.tempFilePath, "Hola")
    //     console.log(result);
    // }
}