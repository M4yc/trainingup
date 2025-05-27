// firebase/fichaService.ts
import { db } from '../config/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

type Exercicio = {
  nome: string;
  series: number;
  repeticoes: number;
  carga?: number;
  ordem: number;
  observacoes?: string;
};

export async function criarFichaDeTreino(
  alunoId: string,
  nomeFicha: string,
  nomeTreino: string,
  diasSemana: string[],
  exercicios: Exercicio[]
) {
  try {
    // 1. Criar a ficha
    const fichaRef = await addDoc(collection(db, 'usuarios', alunoId, 'fichasTreino'), {
      nome: nomeFicha,
      descricao: 'Ficha criada pelo personal',
      dataCriacao: new Date().toISOString(),
      ativa: true,
    });

    // 2. Criar o treino
    const treinoRef = await addDoc(
      collection(db, 'usuarios', alunoId, 'fichasTreino', fichaRef.id, 'treinos'),
      {
        nome: nomeTreino,
        diasSemana,
      }
    );

    // 3. Inserir os exercícios
    for (const exercicio of exercicios) {
      await addDoc(
        collection(
          db,
          'usuarios',
          alunoId,
          'fichasTreino',
          fichaRef.id,
          'treinos',
          treinoRef.id,
          'exercicios'
        ),
        exercicio
      );
    }

    console.log('Ficha de treino criada com sucesso!');
  } catch (error) {
    console.error('Erro ao criar ficha de treino:', error);
  }
}
