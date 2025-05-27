export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  AlunoStack: undefined;
  PersonalStack: undefined;
};

export type AppTabParamList = {
  Dashboard: undefined;
  TreinosScreen: undefined;
  Estatistica: undefined;
  Perfil: undefined;
  Alunos: undefined;
};

export type AppStackParamList = {
  MainTabs: undefined;
  TreinoDesc: {
    nome: string;
    musculoAlvo: string;
    series: number;
    repeticoes: number;
    peso: string;
    intervalo: string;
    descricao: string;
    imagem: string;
    numero: number;
  };
  Configuracoes: undefined;
  Exercicio: undefined;
  Corpo: undefined;
  FichaTreinoAluno: undefined;
  CreateWorkoutPlan: undefined;
  NovaFichaTreino: undefined;
};
