import {Router} from "express"
import {getVehiclesController} from "./vehicles.controller"

export const vehiclesRoutes = Router();

vehiclesRoutes.get("/", getVehiclesController); 
