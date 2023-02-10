import express from "express"
import { register, login, logout, infoUser, refreshToken } from "../controllers/user.controller"
import { requireRefreshToken, validateToken } from "../middlewares/token.middlewares";

const router = express.Router()

router.post("/register", register)
router.post("/login", login)

router.get("/protected", validateToken, infoUser);
router.get("/refresh", requireRefreshToken, refreshToken)

router.get("/logout", logout);

export default router