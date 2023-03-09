import bcrypt from "bcrypt";
import {
  userRegister,
  userLogin,
  userAddAvatar,
  userInfo,
} from "../models/user.model";
import { uploadImage } from "../utils/cloudinary";
import { UploadedFile } from "express-fileupload";
import { generateToken, generateRefreshToken } from "../utils/tokenManager";
import { errorTokens } from "../utils/errorToken";
import { FindOrCreate } from "../utils/googleAuth";
import { User, request, response } from "../ts/interfaces";

export async function register(req: request, res: response) {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    const response = await userRegister(
      req.body.user,
      req.body.email,
      password
    );

    const insertedId = response[0].insertId;

    if (req.files?.image) {
      const file = req.files.image as UploadedFile;
      const filePath = `${file.tempFilePath}`;
      const uploadedImage = await uploadImage(filePath, req.body.name);
      await userAddAvatar(
        insertedId,
        uploadedImage.public_id,
        uploadedImage.secure_url
      );
    }
    const { token, expiresIn } = generateToken(insertedId);
    generateRefreshToken(insertedId, res);

    res.status(200).json({ token, expiresIn });
  } catch (error) {
    res.status(403).json({ error: error });
  }
}

export async function login(req: request, res: response) {
  try {
    const result = await userLogin(req.body.user);
    const data = result[0];
    if (!data.length) {
      throw new Error("The username/email or password is incorrect");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      data[0].password
    );
    if (!validPassword)
      throw new Error("The username/email or password is incorrect");

    const { token, expiresIn } = generateToken(data[0].id);
    generateRefreshToken(data[0].id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    res
      .status(400)
      .json({ error: "The username/email or password is incorrect" });
  }
}

export async function googleAuth(req: request, res: response) {
  const user: User = req.body;
  try {
    const id = await FindOrCreate(user);
    const { token, expiresIn } = generateToken(id);
    generateRefreshToken(id, res);

    return res.json({ token, expiresIn });
  } catch (error) {
    console.log(error);
  }
}

export async function changeAvatar(req: request, res: response) {
  try {
    if (!req.files.image) {
      throw new Error("There is no file provided");
    }
    const file = req.files.image as UploadedFile;
    const filePath = `${file.tempFilePath}`;
    const uploadedImage = await uploadImage(filePath, req.uid as string);
    await userAddAvatar(
      req.uid as number,
      uploadedImage.public_id,
      uploadedImage.secure_url
    );
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: error });
  }
}

export async function infoUser(req: request, res: response) {
  try {
    const user = await userInfo(req.uid);
    return res.json({ userData: user[0][0] });
  } catch (error) {
    console.log(error);
    res.status(403).json({ error: error });
  }
}

export function logout(req: request, res: response) {
  res.clearCookie("refreshToken");
  return res.json({ ok: true });
}

export function refreshToken(req: request, res: response) {
  try {
    const { token, expiresIn } = generateToken(req.uid);
    return res.json({ token, expiresIn });
  } catch (err) {
    const data = errorTokens(err);
    return res.status(401).json({ error: data });
  }
}
