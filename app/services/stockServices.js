import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createstock = async ({ count }) => {
  const stock = await prisma.stock.create({
    data: {
      count,
    },
  });

  return stock;
};

export const listStocks = async () => prisma.stock.findMany();

export const searchStockById = async (id) => {
  const foundStock = await prisma.stock.findUnique({ where: { id } });
  if (!foundStock) {
    const err = new Error("No existe stock con ese ID");
    err.status = 404;
    throw err;
  }
  return foundStock;
};

export const deletestock = async (id) => {
  const foundStock = await prisma.stock.findUnique({ where: { id } });
  if (!foundStock) {
    const err = new Error("No existe stock con ese ID");
    err.status = 404;
    throw err;
  }
  return prisma.stock.delete({ where: { id } });
};

export const updateStock = async ({ id, data }) => {
  const foundStock = await prisma.stock.findUnique({ where: { id } });
  if (!foundStock) {
    const err = new Error("No existe stock con ese ID");
    err.status = 404;
    throw err;
  }
  return prisma.stock.update({ where: { id }, data });
};
