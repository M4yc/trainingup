import { useSQLiteContext } from "expo-sqlite"

export type UserDatabase = {
  id: number
  name: string,
  email: string,
  password: string,
  tipo: string,
  personalid: number,
}

export function usePersonalDatabase(){
  const database = useSQLiteContext()
  
  async function getAllPersonal() {
    try {
      const query = "SELECT id, name FROM usuarios WHERE tipo = 'Personal'"

      const response = await database.getAllAsync<UserDatabase>(query)

      return response
    } catch (error) {
      console.error("Erro ao buscar personais:", error);
      throw error
    }
  }
  return { getAllPersonal }
}