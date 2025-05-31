import { useSQLiteContext } from "expo-sqlite"

export type UserDatabase = {
  id: number
  name: string,
  email: string,
  password: string,
  tipo: string,
  personalid: number,
}

interface Aluno {
  id: number;
  name: string;
}

export function usePersonalService(){
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

  async function getAlunosPersonal(personalId: number): Promise<Aluno[]> {
    if (!personalId) {
      throw new Error("ID do personal trainer é obrigatório");
    }
  
    try {
      const query = "SELECT id, name FROM usuarios WHERE tipo = 'Aluno' AND personal_id = ?";
      const response = await database.getAllAsync<Aluno>(query, [personalId]);
  
      if (!response || response.length === 0) {
        console.log("Nenhum aluno encontrado para este personal trainer");
        return [];
      }
  
      return response;
    } catch (error) {
      console.error("Erro ao buscar alunos do personal:", error);
      throw error;
    }
  }
  
  return { getAllPersonal, getAlunosPersonal }
}