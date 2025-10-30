import { PrismaClient } from "../generated/prisma/index.js";

const prisma = new PrismaClient();

export const createRol = async ({ name }) => {
  const role = await prisma.role.create({
    data: {
      name,
      is_Deleted: false,
    },
  });

  return role;
};

export const listRoles = async () => prisma.role.findMany();

export const searchRoleById = async (id) => {
  const foundRole = await prisma.role.findUnique({ where: { id } });
  if (!foundRole) {
    const err = new Error("No existe usuario con ese ID");
    err.status = 404;
    throw err;
  }
  return foundRole;
};

export const deleteRol = async (id) => {
  const foundRole = await prisma.role.findUnique({ where: { id } });
  if (!foundRole) {
    const err = new Error("No existe Rol con ese ID");
    err.status = 404;
    throw err;
  }
  return prisma.role.delete({ where: { id } });
};

export const updateRole = async ({ id, data }) => {
  const foundRole = await prisma.role.findUnique({ where: { id } });
  if (!foundRole) {
    const err = new Error("No existe Rol con ese ID");
    err.status = 404;
    throw err;
  }
  return prisma.role.update({ where: { id }, data });
};
