import express from "express";
import { signup, getAllUsers, getUserById, updateUser, deleteUser, login, getBookingsofUser } from "../controllers/user-controller.js";

const userRouter = express.Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login)
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id", updateUser)
userRouter.delete("/:id", deleteUser)
userRouter.get("/bookings/:id", getBookingsofUser)




export default userRouter;