import { Request, Response } from "express";
import fs from "fs/promises"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { userRegister, userLogin, userAddAvatar, userInfo } from "../models/user.model";
import { uploadImage } from "../utils/cloudinary";
import { UploadedFile } from "express-fileupload";
import { generateToken, generateRefreshToken } from "../utils/tokenManager";
import { errorTokens } from "../utils/errorToken";
import { jwtVariables } from "../config/envVariables";

export async function register(req: Request, res: Response) {
    try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(req.body.password, salt);

        const response = await userRegister(res, req.body.name, req.body.email, password)

        if (req.files?.image) {

            const file = req.files.image as UploadedFile
            const filePath = `${file.tempFilePath}`
            const uploadedImage = await uploadImage(filePath, req.body.name)
            await fs.unlink(filePath)
            await userAddAvatar(res, req.body.name, uploadedImage.public_id, uploadedImage.secure_url)
        }
        const { token, expiresIn } = generateToken(response.insertedId)
        generateRefreshToken(response.insertedId, res)

        res.status(200).json({ token, expiresIn })

    } catch (error) {
        res.status(403).json({ error: error.message });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const result = await userLogin(res, req.body.user)
        const data = result[0]
        if (!data.length) {
            throw new Error("The username/email or password is incorrect")
        }
        const validPassword = await bcrypt.compare(req.body.password, data[0].password);
        if (!validPassword) throw new Error("The username/email or password is incorrect")

        const { token, expiresIn } = generateToken(data[0].id);
        generateRefreshToken(data[0].id, res)

        return res.json({ token, expiresIn });
    } catch (error) {
        res.status(403).json({ error: error })
    }
}

export async function infoUser(req, res) {
    try {
        const user = await userInfo(req.uid)
        return res.json({ userData: user[0][0] })
    } catch (error) {
        console.log(error);
        res.status(403).json({ error: error })
    }
}

export function logout(req, res) {
    // https://stackoverflow.com/questions/27978868/destroy-cookie-nodejs
    res.clearCookie("refreshToken");
    return res.json({ ok: true });
};

export function refreshToken(req, res) {
    try {
        const { token, expiresIn } = generateToken(req.uid)
        return res.json({ token, expiresIn });
    } catch (err) {
        const data = errorTokens(err)
        return res.status(401).json({ error: data })
    }
}