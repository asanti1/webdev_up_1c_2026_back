import { Router } from "express";
import { CountryController } from "../controllers/country.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/isAdmin.middleware";

const countryRoutes = Router()
const controller = new CountryController();

countryRoutes.get("/", controller.get)
countryRoutes.get("/getAll", controller.getAll)
countryRoutes.post("/", authMiddleware, isAdmin, controller.create)
countryRoutes.get("/:id", controller.getById)

export default countryRoutes;