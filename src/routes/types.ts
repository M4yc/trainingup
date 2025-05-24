export type RootStackParamList = {
  Login: undefined;
  App: undefined;
};

export type AppTabParamList = {
  Dashboard: undefined;
  FichaTreino: undefined;
  Estatistica: undefined;
  Perfil: undefined;
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
};
