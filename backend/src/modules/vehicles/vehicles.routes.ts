import { Router } from "express";
import { getVehiclesController, getVehicleByIdController } from "./vehicles.controller.js";

export const vehiclesRoutes = Router();

vehiclesRoutes.get("/", getVehiclesController);
vehiclesRoutes.get("/:id", getVehicleByIdController);