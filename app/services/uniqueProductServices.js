import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createUniqueProduct = async ({
  name,
  offer,
  unit_price,
  color,
}) => {
  const product = await prisma.unique_Product.create({
    data: {
      name,
      offer: new prisma.Decimal(offer),
      unit_price: new prisma.Decimal(unit_price),
      color,
      is_deleted: false,
    },
  });

  return product;
};

export const listUniqueProducts = async () => {
  return prisma.unique_Product.findMany({
    where: { is_deleted: false }
  });
};

export const searchUniqueProductById = async (id) => {
  const foundProduct = await prisma.unique_Product.findUnique({ where: { id } });
  if (!foundProduct) {
    const err = new Error("No existe producto con ese ID");
    err.status = 404;
    throw err;
  }
  return foundProduct;
};

export const deleteUniqueProduct = async (id) => {
  const foundProduct = await prisma.unique_Product.findUnique({ where: { id } });
  if (!foundProduct) {
    const err = new Error("No existe producto con ese ID");
    err.status = 404;
    throw err;
  }

  return prisma.unique_Product.update({
    where: { id },
    data: { is_deleted: true },
  });
};

export const updateUniqueProduct = async ({ id, data }) => {
  const foundProduct = await prisma.unique_Product.findUnique({ where: { id } });
  if (!foundProduct) {
    const err = new Error("No existe producto con ese ID");
    err.status = 404;
    throw err;
  }

  return prisma.unique_Product.update({
    where: { id },
    data,
  });
};
