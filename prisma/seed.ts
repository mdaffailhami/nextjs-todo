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
  // USERS
  const users: Prisma.UserCreateInput[] = [
    {
      id: "u1",
      email: "mdaffailhami@gmail.com",
      hashedPassword:
        "$2a$12$u/0n/dpxE16CnTUp1lYRLehPFhnoNe5qk2oJLniL8ZJPgRCNTxD7G",
    },
    {
      id: "u2",
      email: "alice@example.com",
      hashedPassword:
        "$2a$12$f.2N9jV..YW/aSq6dJS.3uV.x1Ogj5H/At/Xr7VbTyOD78.9ZqqC.",
    },
    {
      id: "u3",
      email: "bob@example.com",
      hashedPassword:
        "$2a$12$bt2vPMfDw4RDcR9dM9HI2OJRBXvYSlxxqaZ9a9ShVAHweGdvaekA2",
    },
  ];

  // TASKS
  const tasks: Prisma.TaskCreateInput[] = [
    {
      id: "t1",
      name: "Finish the whole Qur'an",
      deadline: new Date("2025-12-31T00:00:00Z"),
      isCompleted: false,
      user: { connect: { id: "u1" } },
    },
    {
      id: "t2",
      name: "Get a job",
      deadline: new Date("2025-12-25T00:00:00Z"),
      isCompleted: false,
      user: { connect: { id: "u1" } },
    },
    {
      id: "t3",
      name: "Buy Groceries",
      deadline: new Date("2025-12-05T00:00:00Z"),
      isCompleted: true,
      user: { connect: { id: "u2" } },
    },
    {
      id: "t4",
      name: "Read a Book",
      deadline: new Date("2025-02-28T00:00:00Z"),
      isCompleted: false,
      user: { connect: { id: "u3" } },
    },
  ];

  // USERS
  for (const user of users) {
    await prisma.user.create({ data: user });
  }

  // TASKS
  for (const task of tasks) {
    await prisma.task.create({ data: task });
  }
}

main();
