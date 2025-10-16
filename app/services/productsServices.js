import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createProduct = async ({
  name,
  description,
  url_img
}) => {
  const product = await prisma.product.create({
    data: {
      name,
      description,
      url_img,
      is_deleted: false,
    },
  });

  return product;
};

export const listProducts = async () => {
  return prisma.product.findMany({
    where: { is_deleted: false }
  });
};

export const searchProductById = async (id) => {
  const foundProduct = await prisma.product.findUnique({ where: { id } });
  if (!foundProduct) {
    const err = new Error("No existe producto con ese ID");
    err.status = 404;
    throw err;
  }
  return foundProduct;
};

export const deleteProduct = async (id) => {
  const foundProduct = await prisma.product.findUnique({ where: { id } });
  if (!foundProduct) {
    const err = new Error("No existe producto con ese ID");
    err.status = 404;
    throw err;
  }

  return prisma.product.update({
    where: { id },
    data: { is_deleted: true },
  });
};

export const updateProduct = async ({ id, data }) => {
  const foundProduct = await prisma.product.findUnique({ where: { id } });
  if (!foundProduct) {
    const err = new Error("No existe producto con ese ID");
    err.status = 404;
    throw err;
  }

  return prisma.product.update({
    where: { id },
    data,
  });
};
