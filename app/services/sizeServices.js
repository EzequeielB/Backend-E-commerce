import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createSize = async (data) => {
  return prisma.size.create({
    data: {
      ...data,
      is_deleted: false,
    },
  });
};


export const listSizes = async () => {
  return prisma.size.findMany({
    where: { is_deleted: false }
  });
};

export const searchSizeById = async (id) => {
  const foundSize = await prisma.size.findUnique({ where: { id } });
  if (!foundSize) {
    const err = new Error("No existe talle con ese ID");
    err.status = 404;
    throw err;
  }
  return foundSize;
};

export const deleteSize = async (id) => {
  const foundSize = await prisma.size.findUnique({ where: { id } });
  if (!foundSize) {
    const err = new Error("No existe talle con ese ID");
    err.status = 404;
    throw err;
  }
  
  return prisma.size.update({
    where: { id },
    data: { is_deleted: true },
  });
};

export const updateSize = async ({ id, data }) => {
  const foundSize = await prisma.size.findUnique({ where: { id } });
  if (!foundSize) {
    const err = new Error("No existe talle con ese ID");
    err.status = 404;
    throw err;
  }
  
  return prisma.size.update({
    where: { id },
    data,
  });
};