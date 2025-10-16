import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createBrand = async ({
  name,
  external_reference
}) => {
  const brand = await prisma.brand.create({
    data: {
      name,
      external_reference,
      is_deleted: false,
    },
  });

  return brand;
};

export const listBrands = async () => {
  return prisma.brand.findMany({
    where: { is_deleted: false }
  });
};

export const searchBrandById = async (id) => {
  const foundBrand = await prisma.brand.findUnique({ where: { id } });
  if (!foundBrand) {
    const err = new Error("No existe marca con ese ID");
    err.status = 404;
    throw err;
  }
  return foundBrand;
};

export const deleteBrand = async (id) => {
  const foundBrand = await prisma.brand.findUnique({ where: { id } });
  if (!foundBrand) {
    const err = new Error("No existe marca con ese ID");
    err.status = 404;
    throw err;
  }

  return prisma.brand.update({
    where: { id },
    data: { is_deleted: true },
  });
};

export const updateBrand = async ({ id, data }) => {
  const foundBrand = await prisma.brand.findUnique({ where: { id } });
  if (!foundBrand) {
    const err = new Error("No existe marca con ese ID");
    err.status = 404;
    throw err;
  }

  return prisma.brand.update({
    where: { id },
    data,
  });
};
