import { AuthData } from '../contexts/AuthContext';

async function signIn(email: string, password: string): Promise<AuthData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password === '123456') {
        resolve({
          token: 'fake-token',
          email,
          name: 'Maycon'
        });
      } else {
        reject(new Error('Credenciais invalidas'));
      }
    }, 500);
  });
}

export const authService = { signIn };
