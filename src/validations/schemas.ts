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
  data_inicio: yup
    .string()
    .required('Data inicial é obrigatória')
    .test('valid-date', 'Data inválida (use DD/MM/AAAA)', (value) => 
      value ? isValidDate(value) : false
    )
    .test('not-past', 'A data inicial não pode ser no passado', (value) => {
      if (!value) return false;
      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date >= today;
    }),
  data_fim: yup
    .string()
    .required('Data final é obrigatória')
    .test('valid-date', 'Data inválida (use DD/MM/AAAA)', (value) => 
      value ? isValidDate(value) : false
    )
    .test('is-after', 'Data final deve ser depois da data inicial', function(value) {
      if (!value || !this.parent.data_inicio) return false;
      const [dayInicio, monthInicio, yearInicio] = this.parent.data_inicio.split('/').map(Number);
      const [dayFim, monthFim, yearFim] = value.split('/').map(Number);
      const dateInicio = new Date(yearInicio, monthInicio - 1, dayInicio);
      const dateFim = new Date(yearFim, monthFim - 1, dayFim);
      return dateFim > dateInicio;
    }),
  grupos: yup.array().of(
    yup.object().shape({
      nome: yup.string().required('Nome do grupo é obrigatório'),
      foco: yup.string().required('Foco do grupo é obrigatório'),
      exercicios: yup.array().of(
        yup.object().shape({
          nome: yup.string().required('Nome do exercício é obrigatório'),
          series: yup.number()
            .typeError('Séries deve ser um número')
            .min(1, 'Mínimo de 1 série')
            .required('Número de séries é obrigatório'),
          repeticoes: yup.number()
            .typeError('Repetições deve ser um número')
            .min(1, 'Mínimo de 1 repetição')
            .required('Número de repetições é obrigatório'),
          peso: yup.number()
            .typeError('Peso deve ser um número')
            .min(0, 'Peso não pode ser negativo')
            .required('Peso é obrigatório'),
          intervalo: yup.string()
            .matches(/^\d+$/, 'Intervalo deve ser um número')
            .required('Intervalo é obrigatório')
        })
      ).min(1, 'Adicione pelo menos um exercício')
    })
  ).min(1, 'Adicione pelo menos um grupo')
});

// Esquema de validação para Edição de Perfil
export const editProfileSchema = yup.object().shape({
  name: yup.string().required('Nome é obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail é obrigatório'),
});
