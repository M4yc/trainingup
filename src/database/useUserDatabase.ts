import { useSQLiteContext } from "expo-sqlite"

export type UserDatabase = {
  id: number
  name: string,
  email: string,
  password: string,
  tipo: string,
  personalid: number,
}

export function useUserDatabase(){
  const database = useSQLiteContext()

  async function checkEmailExists(email: string): Promise<boolean> {
    try {
      const result = await database.getFirstAsync<UserDatabase>(
        "SELECT id FROM usuarios WHERE email = ?",
        [email]
      );
      return !!result;
    } catch (error) {
      console.error("Erro ao verificar email:", error);
      throw error;
    }
  }

  async function create(data: Omit<UserDatabase, "id">) {
    // Verifica se o email já existe
    const emailExists = await checkEmailExists(data.email);
    if (emailExists) {
      throw new Error("Este email já está cadastrado");
    }

    const statement = await database.prepareAsync(
      "INSERT INTO usuarios (name, email, password, tipo, personal_id) VALUES ($name, $email, $password, $tipo, $personal_id)"
    )
    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $email: data.email,
        $password: data.password,
        $tipo: data.tipo,
        $personal_id: data.personalid,
      })
      const insertedRowId = result.lastInsertRowId.toLocaleString()

      return { insertedRowId }
    } catch (error){
      throw error
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function updateUser(id: number, data: Partial<Omit<UserDatabase, "id" | "email">>) {
    try {
      let updateFields = [];
      let params: any = {};

      if (data.name) {
        updateFields.push("name = $name");
        params.$name = data.name;
      }

      if (data.password) {
        updateFields.push("password = $password");
        params.$password = data.password;
      }

      if (data.tipo) {
        updateFields.push("tipo = $tipo");
        params.$tipo = data.tipo;
      }

      if (data.personalid) {
        updateFields.push("personal_id = $personal_id");
        params.$personal_id = data.personalid;
      }

      if (updateFields.length === 0) {
        throw new Error("Nenhum campo para atualizar");
      }

      const statement = await database.prepareAsync(
        `UPDATE usuarios SET ${updateFields.join(", ")} WHERE id = $id`
      );

      try {
        await statement.executeAsync({
          ...params,
          $id: id
        });
      } finally {
        await statement.finalizeAsync();
      }
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  }

  async function getAllUsuarios() {
    try {
      const query = "SELECT * FROM usuarios"

      const response = await database.getAllAsync<UserDatabase>(query)

      return response
    } catch (error) {
      console.error("Erro ao buscar usuarios:", error);
      throw error
    }
  }

  async function getAllPersonal() {
    try {
      const query = "SELECT id, name, email FROM usuarios WHERE tipo = 'Personal'"

      const response = await database.getAllAsync<UserDatabase>(query)

      return response
    } catch (error) {
      console.error("Erro ao buscar personais:", error);
      throw error
    }
  }

  async function getUserById(id: number) {
    try {
      const query = "SELECT * FROM usuarios WHERE id = ?"
      const response = await database.getFirstAsync<UserDatabase>(query, [id])
      return response
    } catch (error) {
      console.error("Erro ao buscar usuário:", error);
      throw error
    }
  }

  return {
    create,
    getAllUsuarios,
    getAllPersonal,
    checkEmailExists,
    updateUser,
    getUserById
  }
}