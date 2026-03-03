import type { Request, Response } from "express";
import { prisma } from "../../db/prisma";

// GET vehicles list

export async function getVehiclesController(req: Request, res: Response) {
  try {
    const { city, minPrice, maxPrice, sort } = req.query;

    const filters: any = { isActive: true };

    // US10 — Filtre par ville
    if (city) {
      filters.location = {
        contains: String(city),
        mode: "insensitive",
      };
    }

    // US11 — Filtre prix minimum
    if (minPrice) {
      filters.pricePerDay = {
        ...filters.pricePerDay,
        gte: Number(minPrice),
      };
    }

    // US11 — Filtre prix maximum
    if (maxPrice) {
      filters.pricePerDay = {
        ...filters.pricePerDay,
        lte: Number(maxPrice),
      };
    }

    // US12 — Tri (préparé mais pas encore activé)
    let orderBy: any = undefined;

    if (sort === "price_asc") orderBy = { pricePerDay: "asc" };
    if (sort === "price_desc") orderBy = { pricePerDay: "desc" };

    const vehicles = await prisma.vehicle.findMany({
      where: filters,
      include: {
        images: { take: 1 },
      },
      orderBy: orderBy ?? { createdAt: "desc" },
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



