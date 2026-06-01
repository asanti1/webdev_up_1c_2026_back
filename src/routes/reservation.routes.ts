import { Router } from "express";
import { ReservationController } from "../controllers/reservation.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateUUID } from "../middleware/validateUUID.middleware";
import { isSelfOrAdmin } from "../middleware/isSelfOrAdmin.middleware";

const reservationRoutes = Router()
const controller = new ReservationController();

reservationRoutes.get("/", authMiddleware, controller.get)
reservationRoutes.get("/getAllMe", authMiddleware, controller.getAllMe)
reservationRoutes.post("/", authMiddleware, controller.create)
reservationRoutes.get("/:id", authMiddleware, validateUUID, controller.getById)
reservationRoutes.patch("/:id", authMiddleware, validateUUID, isSelfOrAdmin, controller.changeStatusById)
reservationRoutes.delete("/:id", authMiddleware, controller.deleteById)


export default reservationRoutes;