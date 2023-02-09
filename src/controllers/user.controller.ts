import { Request, Response } from "express";
import fs from "fs/promises"
import bcrypt from "bcrypt";
import { userRegister, userLogin, userAddAvatar } from "../models/user.model";
import { uploadImage } from "../utils/cloudinary";
import { UploadedFile } from "express-fileupload";
export async function register(req: Request, res: Response) {

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    try {
        await userRegister(req.body.name, req.body.email, password)
        if (req.files?.image) {
            const file = req.files.image as UploadedFile
            const filePath = `${file.tempFilePath}`
            const uploadedImage = await uploadImage(filePath, req.body.name)
            await fs.unlink(filePath)
            await userAddAvatar(req.body.name, uploadedImage.public_id, uploadedImage.secure_url)
        }
        res.status(200).json({ status: 200, message: "ok😁" })
    } catch (error) {
        if (error.code === "ER_DUP_ENTRY") res.status(400).json({ error: "The email address is already used" })
        res.status(400).send(error);
    }
}

export async function login(req: Request, res: Response) {
    try {
        const result = await userLogin(req.body.user)
        const data = result[0]
        if (!data.length) {
            res.status(400).json({ error: "The username/email or password is incorrect" })
        }
        const validPassword = await bcrypt.compare(req.body.password, data[0].password);
        if (!validPassword) return res.status(400).json({ error: '' })

        res.status(200).json({ "message": data[0], "ok": true })
    } catch (error) {
        throw new Error(error)
    }
}