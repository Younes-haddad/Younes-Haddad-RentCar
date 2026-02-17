import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma";

if (!process.env.DATABASE_URL) {
  console.error("Error: DATABASE_URL is not defined");
  process.exit(1);
}

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding...");

  await prisma.vehicle.deleteMany();

  await prisma.vehicle.createMany({
    data: [
      {
        name: "Lamborghini Huracan",
        brand: "Lamborghini",
        city: "Cannes",
        pricePerDay: 1800,
        deposit: 10000,
        mileageLimit: 150,
        minAge: 25,
      },
      {
        name: "Ferrari 488 Spider",
        brand: "Ferrari",
        city: "Cannes",
        pricePerDay: 2000,
        deposit: 12000,
        mileageLimit: 150,
        minAge: 27,
      },
    ],
  });

  console.log("Seed done");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });