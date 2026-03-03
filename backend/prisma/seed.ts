import "dotenv/config";
import bcrypt from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL is not defined");
  process.exit(1);
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Reset tables in correct order
  await prisma.reservation.deleteMany();
  await prisma.vehicleImage.deleteMany();
  await prisma.vehicle.deleteMany();
  await prisma.user.deleteMany();

  // Password for all test users
  const passwordHash = await bcrypt.hash("password123", 10);

  // Create admin
  const admin = await prisma.user.create({
    data: {
      email: "admin@rentcar.com",
      passwordHash,
      firstName: "Admin",
      lastName: "RentCar",
      role: "ADMIN",
    },
  });

  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: "client1@rentcar.com",
      passwordHash,
      firstName: "Jean",
      lastName: "Dupont",
      role: "USER",
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: "client2@rentcar.com",
      passwordHash,
      firstName: "Marie",
      lastName: "Martin",
      role: "USER",
    },
  });

  // Create vehicles with multiple images
  const huracan = await prisma.vehicle.create({
    data: {
      name: "Lamborghini Huracan",
      brand: "Lamborghini",
      location: "Cannes",
      pricePerDay: 1800,
      deposit: 10000,
      mileageLimit: 150,
      minAge: 25,
      isActive: true,
      images: {
        create: [
          { url: "https://res.cloudinary.com/di2vsp3jq/image/upload/v1772539542/rentcar/vehicles/ntfbtyt9dqhr2nut1hf9.png" },
          { url: "https://res.cloudinary.com/di2vsp3jq/image/upload/v1772539542/rentcar/vehicles/ntfbtyt9dqhr2nut1hf9.png" },
          { url: "https://res.cloudinary.com/di2vsp3jq/image/upload/v1772539542/rentcar/vehicles/ntfbtyt9dqhr2nut1hf9.png" },
        ],
      },
    },
  });

  const ferrari = await prisma.vehicle.create({
    data: {
      name: "Ferrari 488 Spider",
      brand: "Ferrari",
      location: "Paris",
      pricePerDay: 2000,
      deposit: 12000,
      mileageLimit: 150,
      minAge: 27,
      isActive: true,
      images: {
        create: [
          { url: "https://res.cloudinary.com/di2vsp3jq/image/upload/v1772539542/rentcar/vehicles/ntfbtyt9dqhr2nut1hf9.png" },
          { url: "https://res.cloudinary.com/di2vsp3jq/image/upload/v1772539542/rentcar/vehicles/ntfbtyt9dqhr2nut1hf9.png" },
          { url: "https://res.cloudinary.com/di2vsp3jq/image/upload/v1772539542/rentcar/vehicles/ntfbtyt9dqhr2nut1hf9.png" },
        ],
      },
    },
  });

  const porsche = await prisma.vehicle.create({
    data: {
      name: "Porsche 911 Turbo S",
      brand: "Porsche",
      location: "Lyon",
      pricePerDay: 1400,
      deposit: 8000,
      mileageLimit: 200,
      minAge: 25,
      isActive: true,
      images: {
        create: [
          { url: "https://res.cloudinary.com/di2vsp3jq/image/upload/v1772539542/rentcar/vehicles/ntfbtyt9dqhr2nut1hf9.png" },
          { url: "https://res.cloudinary.com/di2vsp3jq/image/upload/v1772539542/rentcar/vehicles/ntfbtyt9dqhr2nut1hf9.png" },
          { url: "https://res.cloudinary.com/di2vsp3jq/image/upload/v1772539542/rentcar/vehicles/ntfbtyt9dqhr2nut1hf9.png" },
        ],
      },
    },
  });

  // Create reservations
  await prisma.reservation.createMany({
    data: [
      {
        userId: user1.id,
        vehicleId: huracan.id,
        startDate: new Date("2026-03-10T10:00:00.000Z"),
        endDate: new Date("2026-03-13T10:00:00.000Z"),
        totalPrice: 1800 * 3,
        delivery: true,
        deliveryAddress: "10 rue de la République, 69002 Lyon",
        status: "PENDING",
      },
      {
        userId: user2.id,
        vehicleId: ferrari.id,
        startDate: new Date("2026-03-20T10:00:00.000Z"),
        endDate: new Date("2026-03-22T10:00:00.000Z"),
        totalPrice: 2000 * 2,
        delivery: false,
        deliveryAddress: null,
        status: "CONFIRMED",
      },
      {
        userId: user1.id,
        vehicleId: porsche.id,
        startDate: new Date("2026-04-01T10:00:00.000Z"),
        endDate: new Date("2026-04-05T10:00:00.000Z"),
        totalPrice: 1400 * 4,
        delivery: true,
        deliveryAddress: "2 place Bellecour, 69002 Lyon",
        status: "CANCELLED",
      },
    ],
  });

  console.log("Seed done!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
