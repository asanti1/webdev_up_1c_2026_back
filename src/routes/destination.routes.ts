import { Router } from "express";
import { DestinationController } from "../controllers/destination.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";

const destinationRoutes = Router()
const controller = new DestinationController();

destinationRoutes.get("/", controller.get)
destinationRoutes.post("/", authMiddleware, isAdmin, controller.create)
destinationRoutes.put("/:id", authMiddleware, isAdmin, controller.updateById)
destinationRoutes.delete("/:id", authMiddleware, isAdmin, controller.deleteById)
destinationRoutes.get("/:id", controller.getById)

export default destinationRoutes;