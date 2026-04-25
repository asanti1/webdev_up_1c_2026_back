import { Router } from "express";
import { PackageController } from "../controllers/package.controller";
import { isAdmin } from "../middleware/isAdmin.middleware";
import { validateUUID } from "../middleware/validateUUID.middleware";
import { authMiddleware } from "../middleware/auth.middleware";

const packageRoutes = Router()
const controller = new PackageController();

packageRoutes.get("/", controller.get)
packageRoutes.post("/", authMiddleware, isAdmin, controller.create)
packageRoutes.get("/:id", validateUUID, controller.getById)
packageRoutes.put("/:id",  validateUUID,authMiddleware, isAdmin, controller.updateById)
packageRoutes.delete("/:id",  validateUUID,authMiddleware, isAdmin, controller.deleteById)

export default packageRoutes;