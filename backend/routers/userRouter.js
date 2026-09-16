import express from "express";
import { createUser, loginUser, getCurrentUser, logoutUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/logout", logoutUser);
userRouter.get("/me", getCurrentUser);

export default userRouter;