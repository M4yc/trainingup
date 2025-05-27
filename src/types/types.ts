export type Exercicio = {
  nome: string;
  series: number;
  repeticoes: number;
  carga?: number;
  ordem: number;
  observacoes?: string;
};

export type Treino = {
  id: string;
  nome: string;
  diasSemana: string[];
  exercicios: Exercicio[];
};

export type Ficha = {
  id: string;
  nome: string;
  descricao: string;
  dataCriacao: string;
  ativa: boolean;
  treinos: Treino[];
};