import { useSQLiteContext } from "expo-sqlite"

export type UserDatabase = {
  id: number
  name: string,
  email: string,
  password: string,
  tipo: string,
  personal_id: number,
}
export function useLoginDatabase(){
  const database = useSQLiteContext()

  async function login( email: string, password: string) {
    try {
    const result = await database.getFirstAsync<UserDatabase>(
      `SELECT id, name, email, tipo, personal_id FROM usuarios WHERE email = ? AND password = ?`,
      [email, password]
    );

    if (!result) {
      return null; // Credenciais inválidas
    }

    return result; // Login bem-sucedido
  } catch (error) {
    console.error("Erro no login:", error);
    return null;
  }
  }

  return {login}
}