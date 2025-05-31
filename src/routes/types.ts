export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  PersonalRoutes: undefined;
  AlunoRoutes: undefined;
  EditProfile: {
    userId: number;
  };
};

export type AppTabParamList = {
  Dashboard: undefined;
  TreinosScreen: undefined;
  Estatistica: undefined;
  Perfil: undefined;
};

export type PersonalTabParamList = {
  Dashboard: undefined;
  Alunos: undefined;
  Estatistica: undefined;
  Perfil: undefined;
};

export type AppStackParamList = {
  MainTabs: undefined;
  TreinoDesc: { id: string };
};

export type PersonalStackParamList = {
  MainTabs: undefined;
  DashboardPersonal: undefined;
  CreateWorkoutPlan: undefined;
  NovaFichaTreino: undefined;
  TreinoDesc: { id: string };
};
