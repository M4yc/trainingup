import * as yup from 'yup';
import { isValidDate, isAfter } from './dateValidations';
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
export const registerSchema = yup.object({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Confirmação de senha é obrigatória'),
});

// Esquema de validação para Ficha de Treino
export const fichaTreinoSchema = yup.object().shape({
  nomeAluno: yup.string().required('Nome do aluno é obrigatório'),
  objetivo: yup.string().required('Objetivo é obrigatório'),
  dataInicial: yup
    .string()
    .required('Data inicial é obrigatória')
    .test('valid-date', 'Data inválida (use DD/MM/AAAA)', (value) => 
      value ? isValidDate(value) : false
    ),
  dataFinal: yup
    .string()
    .required('Data final é obrigatória')
    .test('valid-date', 'Data inválida (use DD/MM/AAAA)', (value) => 
      value ? isValidDate(value) : false
    )
    .test('is-after', 'Data final deve ser depois da data inicial', function(value) {
      return isAfter(this.parent.dataInicial, value);
    }),
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

// Esquema de validação para Edição de Perfil
export const editProfileSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
});
