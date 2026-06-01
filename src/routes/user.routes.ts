import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { isSelfOrAdmin } from "../middleware/isSelfOrAdmin.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";

const userRoutes = Router()
const controller = new UserController();

userRoutes.get("/", authMiddleware, isAdmin, controller.get)
userRoutes.get("/:id", authMiddleware, isSelfOrAdmin, controller.getById)
userRoutes.delete("/:id", authMiddleware, isSelfOrAdmin, controller.deleteById)
userRoutes.put("/:id", authMiddleware, isSelfOrAdmin,  controller.updateById)
userRoutes.post("/", authMiddleware, isAdmin,controller.create)

export default userRoutes;

