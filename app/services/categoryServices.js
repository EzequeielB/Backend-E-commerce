import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createCategory = async (data) => {
  const { id_category_parent, ...rest } = data;

  return prisma.category.create({
    data: {
      ...rest,
      is_deleted: false,
    },
  });
};

export const listCategorys = async () => {
  return prisma.category.findMany({
    where: { is_deleted: false },
  });
};

export const searchCategoryById = async (id) => {
  const foundCategory = await prisma.category.findUnique({ where: { id } });
  if (!foundCategory) {
    const err = new Error("No existe categoria con ese ID");
    err.status = 404;
    throw err;
  }
  return foundCategory;
};

export const deleteCategory = async (id) => {
  const foundCategory = await prisma.category.findUnique({ where: { id } });
  if (!foundCategory) {
    const err = new Error("No existe categoria con ese ID");
    err.status = 404;
    throw err;
  }

  return prisma.category.update({
    where: { id },
    data: { is_deleted: true },
  });
};

export const updateCategory = async ({ id, data }) => {
  const foundCategory = await prisma.category.findUnique({ where: { id } });
  if (!foundCategory) {
    const err = new Error("No existe categoria con ese ID");
    err.status = 404;
    throw err;
  }

  const { id: _ignore, id_category_parent, ...rest } = data;

  return prisma.category.update({
    where: { id },
    data: {
      ...rest,
      parent: id_category_parent
        ? { connect: { id: id_category_parent } }
        : { disconnect: true },
    },
  });
};
