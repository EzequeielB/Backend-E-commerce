/*
  Warnings:

  - You are about to alter the column `offer` on the `product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(65,30)`.
  - You are about to drop the column `id_product` on the `stock` table. All the data in the column will be lost.
  - You are about to drop the column `roleId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_ordertoproduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_unique_product]` on the table `Stock` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `External_Reference` to the `Detail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_OrderToProduct_A_fkey`;

-- DropForeignKey
ALTER TABLE `_ordertoproduct` DROP FOREIGN KEY `_OrderToProduct_B_fkey`;

-- DropForeignKey
ALTER TABLE `cart` DROP FOREIGN KEY `Cart_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_id_detail_fkey`;

-- DropForeignKey
ALTER TABLE `order` DROP FOREIGN KEY `Order_id_shipping_addres_fkey`;

-- DropForeignKey
ALTER TABLE `reset_token` DROP FOREIGN KEY `Reset_token_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `shipment` DROP FOREIGN KEY `Shipment_id_order_fkey`;

-- DropForeignKey
ALTER TABLE `shipping_address` DROP FOREIGN KEY `Shipping_Address_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `stock` DROP FOREIGN KEY `Stock_id_product_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `wish_list` DROP FOREIGN KEY `Wish_List_id_user_fkey`;

-- DropIndex
DROP INDEX `Stock_id_product_key` ON `stock`;

-- DropIndex
DROP INDEX `User_roleId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `cart` MODIFY `id_user` INTEGER NULL;

-- AlterTable
ALTER TABLE `detail` ADD COLUMN `External_Reference` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` MODIFY `id_shipping_addres` INTEGER NULL,
    MODIFY `id_detail` INTEGER NULL;

-- AlterTable
ALTER TABLE `product` MODIFY `offer` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `reset_token` MODIFY `id_user` INTEGER NULL;

-- AlterTable
ALTER TABLE `shipment` MODIFY `id_order` INTEGER NULL;

-- AlterTable
ALTER TABLE `shipping_address` MODIFY `id_user` INTEGER NULL;

-- AlterTable
ALTER TABLE `stock` DROP COLUMN `id_product`,
    ADD COLUMN `id_unique_product` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `roleId`,
    ADD COLUMN `id_role` INTEGER NULL;

-- AlterTable
ALTER TABLE `wish_list` MODIFY `id_user` INTEGER NULL;

-- DropTable
DROP TABLE `_ordertoproduct`;

-- CreateTable
CREATE TABLE `Unique_Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `color` VARCHAR(191) NOT NULL,
    `id_size` INTEGER NULL,
    `id_brand` INTEGER NULL,

    UNIQUE INDEX `Unique_Product_id_size_key`(`id_size`),
    UNIQUE INDEX `Unique_Product_id_brand_key`(`id_brand`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `size` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Brand` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `external_reference` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_OrderToUnique_Product` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_OrderToUnique_Product_AB_unique`(`A`, `B`),
    INDEX `_OrderToUnique_Product_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Stock_id_unique_product_key` ON `Stock`(`id_unique_product`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Wish_List` ADD CONSTRAINT `Wish_List_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unique_Product` ADD CONSTRAINT `Unique_Product_id_size_fkey` FOREIGN KEY (`id_size`) REFERENCES `Size`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Unique_Product` ADD CONSTRAINT `Unique_Product_id_brand_fkey` FOREIGN KEY (`id_brand`) REFERENCES `Brand`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Stock` ADD CONSTRAINT `Stock_id_unique_product_fkey` FOREIGN KEY (`id_unique_product`) REFERENCES `Unique_Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reset_token` ADD CONSTRAINT `Reset_token_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shipping_Address` ADD CONSTRAINT `Shipping_Address_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Shipment` ADD CONSTRAINT `Shipment_id_order_fkey` FOREIGN KEY (`id_order`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_id_shipping_addres_fkey` FOREIGN KEY (`id_shipping_addres`) REFERENCES `Shipping_Address`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_id_detail_fkey` FOREIGN KEY (`id_detail`) REFERENCES `Detail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToUnique_Product` ADD CONSTRAINT `_OrderToUnique_Product_A_fkey` FOREIGN KEY (`A`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_OrderToUnique_Product` ADD CONSTRAINT `_OrderToUnique_Product_B_fkey` FOREIGN KEY (`B`) REFERENCES `Unique_Product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
