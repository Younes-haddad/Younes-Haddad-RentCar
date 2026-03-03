import type { Request, Response } from "express";
import { prisma } from "../../db/prisma";

// GET vehicles list

export async function getVehiclesController(req: Request, res: Response) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isActive: true },
      include: {
        images: {
          take: 1,
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return res.json(vehicles);
  } catch (error) {
    console.error("GET VEHICLES ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// GET vehicles details by ID 

export async function getVehicleByIdController(req: Request, res: Response) {
  try {
    const id = req.params.id as string;

    const vehicle = await prisma.vehicle.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }

    return res.json(vehicle);
  } catch (error) {
    console.error("GET VEHICLE BY ID ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}



