import express from "express";
import { addAdmin, adminLogin, getAdminById, getAllAdmins, deleteAdminById } from "../controllers/admin-controller.js";

const adminRouter = express.Router();

adminRouter.post("/signup", addAdmin)
adminRouter.post("/login", adminLogin)
adminRouter.get("/", getAllAdmins)
adminRouter.get("/:id", getAdminById);
adminRouter.delete("/:id", deleteAdminById);


export default adminRouter;