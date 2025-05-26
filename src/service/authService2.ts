// src/services/authService.ts
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../config/firebaseConfig';

export const registrarUsuario = async (
  email: string,
  senha: string,
  name: string,
  userType: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha
    );
    const uid = userCredential.user.uid;

    await setDoc(doc(db, 'usuarios', uid), {
      token: uid,
      email,
      name,
      userType
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
};
