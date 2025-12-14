/*
  Warnings:

  - A unique constraint covering the columns `[product_id,order_id]` on the table `products_orders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `total` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `products_orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "total" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "products_orders" ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "total" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_orders_product_id_order_id_key" ON "products_orders"("product_id", "order_id");
