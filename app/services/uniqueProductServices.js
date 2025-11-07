import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createUniqueProduct = async (data) => {
  const { id_brand, id_product, size, stock, ...rest } = data;

  const product = await prisma.unique_Product.create({
    data: {
      ...rest,
      is_deleted: false,
      brand: id_brand ? { connect: { id: id_brand } } : undefined,
      product: id_product ? { connect: { id: id_product } } : undefined,
      size: size?.length ? { connect: size } : undefined,
      stock: stock
        ? {
            create: {
              count: stock.count,
            },
          }
        : undefined,
    },
    include: {
      brand: true,
      product: true,
      size: true,
      stock: true,
    },
  });

  return product;
};


export const listUniqueProducts = async () => {
  return prisma.unique_Product.findMany({
    where: { is_deleted: false },
    include: {
      brand: true,
      product: true,
      size: true,
      stock: true,
    },
  });
};


export const searchUniqueProductById = async (id) => {
  const foundProduct = await prisma.unique_Product.findUnique({
    where: { id },
    include: {
      brand: true,
      product: true,
      size: true,
      stock: true,
    },
  });

  if (!foundProduct || foundProduct.is_deleted) {
    const err = new Error("No existe producto con ese ID");
    err.status = 404;
    throw err;
  }

  return foundProduct;
};


export const deleteUniqueProduct = async (id) => {
  const foundProduct = await prisma.unique_Product.findUnique({ where: { id } });

  if (!foundProduct || foundProduct.is_deleted) {
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

  const {
    id_brand,
    id_product,
    size,
    stock,
    ...rest
  } = data;

return prisma.unique_Product.update({
  where: { id },
  data: {
    ...rest,
    brand: id_brand ? { connect: { id: id_brand } } : undefined,
    product: id_product ? { connect: { id: id_product } } : undefined,
    size: size?.length
      ? {
          set: size,
        }
      : undefined,
    stock: stock
      ? {
          upsert: {
            update: { count: Number(stock.count) },
            create: { count: Number(stock.count) },
          },
        }
      : undefined,
  },
  include: {
    brand: true,
    product: true,
    size: true,
    stock: true,
  },
});

};