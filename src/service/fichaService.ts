// firebase/fichaService.ts
import { db } from '../config/FirebaseConfig';
import { collection, getDocs, DocumentData } from 'firebase/firestore';
import { Ficha, Treino, Exercicio } from '../../src/types/types';

export async function buscarFichasDoAluno(alunoId: string): Promise<Ficha[]> {
  const fichas: Ficha[] = [];

  const fichasSnapshot = await getDocs(collection(db, 'usuarios', alunoId, 'fichasTreino'));

  for (const fichaDoc of fichasSnapshot.docs) {
    const fichaData = fichaDoc.data() as DocumentData;

    const treinosSnapshot = await getDocs(
      collection(db, 'usuarios', alunoId, 'fichasTreino', fichaDoc.id, 'treinos')
    );

    const treinos: Treino[] = [];

    for (const treinoDoc of treinosSnapshot.docs) {
      const treinoData = treinoDoc.data() as DocumentData;

      const exerciciosSnapshot = await getDocs(
        collection(
          db,
          'usuarios',
          alunoId,
          'fichasTreino',
          fichaDoc.id,
          'treinos',
          treinoDoc.id,
          'exercicios'
        )
      );

      const exercicios: Exercicio[] = exerciciosSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          nome: data.nome,
          series: data.series,
          repeticoes: data.repeticoes,
          carga: data.carga,
          ordem: data.ordem,
          observacoes: data.observacoes,
          descricao: data.descricao,
          image_url: data.image_url
        };
      });

      treinos.push({
        id: treinoDoc.id,
        nome: treinoData.nome,
        diasSemana: treinoData.diasSemana,
        exercicios,
      });
    }

    fichas.push({
      id: fichaDoc.id,
      nome: fichaData.nome,
      descricao: fichaData.descricao,
      dataCriacao: fichaData.dataCriacao,
      ativa: fichaData.ativa,
      treinos,
    });
  }
  
  return fichas;
}