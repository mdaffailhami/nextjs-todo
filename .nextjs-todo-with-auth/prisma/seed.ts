import "dotenv/config";
import { PrismaClient, Prisma } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

export async function main() {
  const users: Prisma.UserCreateInput[] = [
    {
      email: "alice@example.com",
      hashedPassword:
        "$2a$12$imPi.aYcNVwpP6L.v6Uzguqf77tEpdWBu8SoYdhm4vEzPQ2R/mm3u",
      tasks: {
        create: [
          {
            name: "Finish reciting Al-Baqarah",
            deadline: new Date("2026-02-15T00:00:00Z"),
            isCompleted: true,
          },
          {
            name: "Get a job",
            deadline: new Date("2025-12-25T00:00:00Z"),
            isCompleted: false,
          },
          {
            name: "Master Order Flow",
            deadline: new Date("2025-12-31T00:00:00Z"),
            isCompleted: false,
          },
          {
            name: "Get certificate",
            deadline: new Date("2025-11-16T00:00:00Z"),
            isCompleted: true,
          },
        ],
      },
    },
    {
      email: "bob@example.com",
      hashedPassword:
        "$2a$12$imPi.aYcNVwpP6L.v6Uzguqf77tEpdWBu8SoYdhm4vEzPQ2R/mm3u",
      tasks: {
        create: [
          {
            name: "Buy Groceries",
            deadline: new Date("2025-12-05T00:00:00Z"),
            isCompleted: true,
          },
          {
            name: "Read a Book",
            deadline: new Date("2025-02-28T00:00:00Z"),
            isCompleted: false,
          },
        ],
      },
    },
  ];

  for (const user of users) {
    await prisma.user.create({ data: user });
  }
}

main();
