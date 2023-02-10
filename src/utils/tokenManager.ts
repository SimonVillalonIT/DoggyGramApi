import jwt from "jsonwebtoken"
import { jwtVariables } from "../config/envVariables";

export const generateToken = (id) => {
    const expiresIn = 1000 * 60 * 15
    try {
        const token = jwt.sign({ id }, jwtVariables.secret, { expiresIn });
        return { token, expiresIn }
    } catch (error) {
        console.log(error);
    }
}

export const generateRefreshToken = (id, res) => {
    const expiresIn = 1000 * 60 * 60 * 24 * 30;
    try {
        const refreshToken = jwt.sign({ id }, jwtVariables.refresh, {
            expiresIn,
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: !(process.env.MODE === "developer"),
            expires: new Date(Date.now() + expiresIn),
        })
    } catch (error) {
        console.log(error);
    }
}