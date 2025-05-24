import { auth, db } from '../config/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export interface Usuario {
  id: string;
  name?: string;
  email: string;
  tipo: "Aluno" | "Personal";
  createdAt: Date;
}

export const userService = {
  // Buscar dados do usuário atual
  getCurrentUser: async (): Promise<Usuario | null> => {
    try {
      const user = auth.currentUser;
      if (!user) return null;

      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: user.uid,
          name: data.name,
          email: data.email,
          tipo: data.tipo,
          createdAt: data.createdAt.toDate()
        };
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      return null;
    }
  },

  // Atualizar dados do usuário
  updateUser: async (userId: string, data: Partial<Usuario>): Promise<boolean> => {
    try {
      const docRef = doc(db, "usuarios", userId);
      await updateDoc(docRef, {
        ...data,
        updatedAt: new Date()
      });
      return true;
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      return false;
    }
  },

  // Buscar dados de um usuário específico
  getUserById: async (userId: string): Promise<Usuario | null> => {
    try {
      const docRef = doc(db, "usuarios", userId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: userId,
          name: data.name,
          email: data.email,
          tipo: data.tipo,
          createdAt: data.createdAt.toDate()
        };
      }
      return null;
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      return null;
    }
  }
}; 