import { Prisma, PrismaClient } from "@/generated/prisma/client";
const prisma = new PrismaClient();

async function main() {
  // USERS
  const users: Prisma.UserCreateInput[] = [
    {
      id: "u1",
      name: "Daffa Ilhami",
      email: "mdaffailhami@gmail.com",
      hashedPassword:
        "$2a$12$u/0n/dpxE16CnTUp1lYRLehPFhnoNe5qk2oJLniL8ZJPgRCNTxD7G",
    },
    {
      id: "u2",
      name: "Alice",
      email: "alice@example.com",
      hashedPassword:
        "$2a$12$f.2N9jV..YW/aSq6dJS.3uV.x1Ogj5H/At/Xr7VbTyOD78.9ZqqC.",
    },
    {
      id: "u3",
      name: "Bob",
      email: "bob@example.com",
      hashedPassword:
        "$2a$12$bt2vPMfDw4RDcR9dM9HI2OJRBXvYSlxxqaZ9a9ShVAHweGdvaekA2",
    },
  ];

  // CATEGORIES
  const categories: Prisma.ProductCategoryCreateInput[] = [
    {
      id: "c1",
      name: "Clothes",
    },
    {
      id: "c2",
      name: "Electronics",
    },
  ];

  // PRODUCTS
  const products: Prisma.ProductCreateInput[] = [
    {
      id: "p1",
      name: "T-Shirt",
      description: "Nice cotton shirt",
      imageUrls: ["https://dummy.com/shirt.jpg"],
      isAvailable: true,
      price: 100000,
      category: { connect: { id: "c1" } },
    },
    {
      id: "p2",
      name: "Laptop",
      description: "Fast laptop",
      imageUrls: ["https://dummy.com/laptop.jpg"],
      isAvailable: true,
      price: 15000000,
      category: { connect: { id: "c2" } },
    },
  ];

  // ORDERS
  const orders: Prisma.OrderCreateInput[] = [
    {
      id: "o1",
      isPaid: false,
      total: 100000 + 15000000,
      user: { connect: { id: "u1" } },
    },
  ];

  // PRODUCT_ORDERS (pivot)
  const productOrders: Prisma.ProductOrderCreateInput[] = [
    {
      id: "po1",
      quantity: 1,
      total: 100000,
      order: { connect: { id: "o1" } },
      product: { connect: { id: "p1" } },
    },
    {
      id: "po2",
      quantity: 1,
      total: 15000000,
      order: { connect: { id: "o1" } },
      product: { connect: { id: "p2" } },
    },
  ];

  // USERS
  for (const u of users) {
    await prisma.user.create({ data: u });
  }

  // CATEGORIES
  for (const c of categories) {
    await prisma.productCategory.create({ data: c });
  }

  // PRODUCTS
  for (const p of products) {
    await prisma.product.create({ data: p });
  }

  // ORDERS
  for (const o of orders) {
    await prisma.order.create({ data: o });
  }

  // PRODUCT_ORDERS
  for (const po of productOrders) {
    await prisma.productOrder.create({ data: po });
  }
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
