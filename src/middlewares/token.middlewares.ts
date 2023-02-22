import jwt from "jsonwebtoken";
import { errorTokens } from "../utils/errorToken.js";
import { jwtVariables } from "../config/envVariables.js";

export const validateToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;
    if (!token) throw new Error("Token does not exist");

    token = token.split(" ")[1];
    const { id } = jwt.verify(token, jwtVariables.secret) as any;
    req.uid = id;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: errorTokens(error.message) });
  }
};

export const requireRefreshToken = (req, res, next) => {
  try {
    const refreshTokenCookie = req.cookies.refreshToken;
    if (!refreshTokenCookie) throw new Error("Token does not exist");

    const { uid } = jwt.verify(refreshTokenCookie, jwtVariables.refresh) as any;

    req.uid = uid;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({ error: errorTokens[error.message] });
  }
};
