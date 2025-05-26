// services/firestoreService.ts
import { collection, addDoc, getDocs } from 'firebase/firestore';

import { db } from '../config/firebaseConfig';

const usuariosRef = collection(db, 'usuarios');

// Interface do usuário
export interface Usuario {
  token: string;
  email: string;
  name: string;
  userType: string;
}

// Adicionar novo usuário com estrutura correta
export const adicionarUsuario = async (usuario: Usuario) => {
  try {
    await addDoc(usuariosRef, usuario);
    console.log('Usuário adicionado com sucesso!');
  } catch (error) {
    console.error('Erro ao adicionar usuário:', error);
  }
};

// Buscar todos os usuários
export const buscarUsuarios = async (): Promise<Usuario[]> => {
  const querySnapshot = await getDocs(usuariosRef);
  const usuarios: Usuario[] = [];

  querySnapshot.forEach((doc) => {
    const data = doc.data() as Usuario;
    usuarios.push({ ...data });
  });

  return usuarios;
};
