import { Router } from "express";
import { ReservationController } from "../controllers/reservation.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { validateUUID } from "../middleware/validateUUID.middleware";

const reservationRoutes = Router()
const controller = new ReservationController();

reservationRoutes.get("/", authMiddleware, controller.get)
reservationRoutes.post("/", authMiddleware, controller.create)
reservationRoutes.get("/:id", authMiddleware, validateUUID, controller.getById)
reservationRoutes.patch("/:id", authMiddleware, validateUUID, controller.changeStatusById)
reservationRoutes.delete("/:id", authMiddleware, controller.deleteById)


export default reservationRoutes;