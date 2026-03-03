import type { Request, Response } from "express";
import { prisma } from "../../db/prisma";

export async function getVehiclesController(req: Request, res: Response) {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isActive: true },
      orderBy: { pricePerDay: "asc" }, // tri par défaut
    });

    return res.json(vehicles);
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
