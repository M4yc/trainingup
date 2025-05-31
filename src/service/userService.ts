// src/service/useUserService.ts
import { useSQLiteContext } from "expo-sqlite";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Usuario = {
  id: number;
  name: string;
  email: string;
  tipo: string;
  personal_id: number;
};

export function useUserService() {
  const db = useSQLiteContext();

  async function getCurrentUser(): Promise<Usuario | null> {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) return null;

      const user = await db.getFirstAsync<Usuario>(
        `SELECT id, name, email, tipo, personal_id FROM usuarios WHERE id = ?`,
        [userId]
      );

      return user || null;
    } catch (error) {
      console.error("Erro ao buscar usuário atual:", error);
      return null;
    }
  }

  return { getCurrentUser };
}
