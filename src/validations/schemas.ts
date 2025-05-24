import * as yup from 'yup';

// Esquema de validação para Login
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória')
});

// Esquema de validação para Registro
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'O nome deve ter no mínimo 3 caracteres')
    .required('Nome é obrigatório'),
  email: yup
    .string()
    .email('Digite um e-mail válido')
    .required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não conferem')
    .required('Confirmação de senha é obrigatória')
});

// Esquema de validação para Ficha de Treino
export const fichaTreinoSchema = yup.object().shape({
  nomeAluno: yup.string().required('Nome do aluno é obrigatório'),
  objetivo: yup.string().required('Objetivo é obrigatório'),
  dataInicial: yup.string().required('Data inicial é obrigatória'),
  dataFinal: yup.string().required('Data final é obrigatória'),
  grupos: yup.array().of(
    yup.object().shape({
      letra: yup.string().required('Letra do grupo é obrigatória'),
      nome: yup.string().required('Nome do grupo é obrigatório'),
      foco: yup.string().required('Foco do grupo é obrigatório'),
      exercicios: yup.array().of(
        yup.object().shape({
          nome: yup.string().required('Nome do exercício é obrigatório'),
          series: yup.string().required('Número de séries é obrigatório'),
          repeticoes: yup.string().required('Número de repetições é obrigatório'),
          peso: yup.string().required('Peso é obrigatório'),
          descanso: yup.string().required('Tempo de descanso é obrigatório')
        })
      )
    })
  )
});
