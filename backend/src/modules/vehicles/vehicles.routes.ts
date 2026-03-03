import { Router } from "express";
import { getVehiclesController } from "./vehicles.controller.js";

export const vehiclesRoutes = Router();

vehiclesRoutes.get("/", getVehiclesController);
