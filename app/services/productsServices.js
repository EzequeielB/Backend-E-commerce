import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createProduct = async (data) => {
  const { categories, uniqueProducts, images, ...rest } = data;
  return prisma.product.create({
    data: {
      ...rest,
      is_deleted: false,
      categories: categories?.length
        ? { connect: categories }
        : undefined,
      uniqueProducts: uniqueProducts?.length
        ? { connect: uniqueProducts }
        : undefined,
      images: images?.length
        ? {
            create: images.map((url) => ({ url }))
          }
        : undefined,
    },
    include: {
      images: true,
      uniqueProducts: {
        include: {
          brand: true,
          size: true,
          stock: true,
        },
      },
    },
  });
};



export const listProducts = async () => {
  return prisma.product.findMany({
    where: { is_deleted: false },
    include: {
      categories:true,
      images: true,
      uniqueProducts: {
        include: {
          brand: true,
          size: true,
          stock: true,
        },
      },
    },
  });
};

export const searchProductById = async (id) => {
  const foundProduct = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      categories:true,
      images: true,
      uniqueProducts: {
        include: {
          brand: true,
          size: true,
          stock: true,
        },
      },
    },
  });
  if (!foundProduct) {
    const err = new Error("No existe producto con ese ID");
    err.status = 404;
    throw err;
  }
  return foundProduct;
};


export const updateProduct = async ({ id, data }) => {
  const foundProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!foundProduct) {
    const err = new Error("No existe producto con ese ID");
    err.status = 404;
    throw err;
  }

  const {
      categories,
      uniqueProducts,
      images,
      ...rest
  }=data

return prisma.product.update({
  where: { id: Number(id) },
  data: {
    ...rest,
    categories: categories?.length
      ? { set: categories }
      : undefined,
    uniqueProducts: uniqueProducts?.length
      ? { set: uniqueProducts }
      : undefined,
      images: {
        deleteMany: {},
        create: images?.length
          ? images.map((img) => ({
              url: typeof img === "string" ? img : img.url,
            }))
          : [],
      },
  },
  include: {
    categories: true,
    uniqueProducts: true,
    images: true,
  },
});


};

export const deleteProduct = async (id) => {
  const foundProduct = await prisma.product.findUnique({ where: { id: Number(id) } });
  if (!foundProduct) {
    const err = new Error("No existe producto con ese ID");
    err.status = 404;
    throw err;
  }

  return prisma.product.update({
    where: { id: Number(id) },
    data: { is_deleted: true },
  });
};
