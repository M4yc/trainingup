// service/authService.ts
import { AuthData } from '../contexts/Auth';

async function signIn(email: string, password: string): Promise<AuthData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (password !== '123456') {
        return reject(new Error('Credenciais inválidas'));
      }

      if (email === 'aluno@teste.com') {
        return resolve({
          token: 'fake-token-aluno',
          email,
          name: 'Edson Rodrigues',
          userType: 'aluno'
        });
      }

      if (email === 'personal@teste.com') {
        return resolve({
          token: 'fake-token-personal',
          email,
          name: 'Arthur Lopes',
          userType: 'personal'
        });
      }

      return reject(new Error('Usuário não encontrado'));
    }, 500);
  });
}

export const authService = { signIn };
