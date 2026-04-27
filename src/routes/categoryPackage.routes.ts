import { Router } from "express";
import { CategoryPackageController } from "../controllers/categoryPackage.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";

const categoryPackageRoutes = Router()
const controller = new CategoryPackageController();

categoryPackageRoutes.get("/", controller.get)
categoryPackageRoutes.post("/", authMiddleware, isAdmin, controller.create)
categoryPackageRoutes.put("/:id", authMiddleware, isAdmin, controller.updateById)
categoryPackageRoutes.delete("/:id", authMiddleware, isAdmin, controller.deleteById)
categoryPackageRoutes.get("/:id", controller.getById)

export default categoryPackageRoutes;