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
    .required('Senha é obrigatória'),
});

// Esquema de validação para Cadastro
export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .required('Nome é obrigatório')
    .min(3, 'Mínimo 3 caracteres'),
  email: yup
    .string()
    .email('E-mail inválido')
    .required('E-mail é obrigatório'),
  password: yup
    .string()
    .min(6, 'Mínimo 6 caracteres')
    .required('Senha é obrigatória'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Confirme sua senha'),
});
