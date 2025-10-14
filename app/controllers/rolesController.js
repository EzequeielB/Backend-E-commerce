import {
  createRol,
  deleteRol,
  listRoles,
  searchRoleById,
  updateRol,
} from "../services/rolesServices";

export const rolesCreate = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await createRol({ name });
    res.status(201).json({
      message: "Rol creado correctamente",
      rol: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const rolById = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await searchRoleById({ id });
    res.status(200).json({ message: "Rol encontrado", rol: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const rolesList = async (req, res) => {
  try {
    const result = await listRoles();
    res.status(200).json({
      message: "Usuarios encontrados",
      roles: result,
    });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const roleUpdate = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { data } = req.body;
    const result = await updateRol({ id, data });
    res.status(200).json({ message: "Rol actualizado", rol: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

export const rolDelete = async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await deleteRol({ id });
    res.status(200).json({ message: "Usuario eliminado", Rol: result });
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
};

/*

model Role {
  id          Int          @id @default(autoincrement())
  name        String
  is_Deleted  Boolean
  users       User[]
  permissions Permission[]
}

*/
