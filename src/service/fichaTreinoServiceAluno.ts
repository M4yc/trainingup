import { useSQLiteContext } from 'expo-sqlite';
import { FichaTreino, GrupoTreino, Exercicio } from './fichaTreinoService';

export function FichaTreinoService() {
  const db = useSQLiteContext();

  async function getFichasByAluno(id_aluno: number): Promise<FichaTreino[]> {
    try {
      console.log('Buscando fichas para o aluno:', id_aluno);
      
      // Primeiro, vamos verificar se a tabela existe
      const tables = await db.getAllAsync(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='fichas_treino'"
      );
      
      if (tables.length === 0) {
        console.log('❌ Tabela fichas_treino não encontrada');
        return [];
      }

      // Buscar as fichas usando o nome correto da coluna
      const fichas = await db.getAllAsync<FichaTreino>(
        `SELECT * FROM fichas_treino WHERE aluno_id = ?`,
        [id_aluno]
      );
      
      console.log('Fichas encontradas:', fichas);

      if (!fichas || fichas.length === 0) {
        console.log('Nenhuma ficha encontrada para o aluno');
        return [];
      }
  
      const fichasComGruposEExercicios = await Promise.all(
        fichas.map(async (ficha) => {
          console.log('Dados da ficha:', {
            id: ficha.id,
            data_inicio: ficha.data_inicio,
            data_fim: ficha.data_fim
          });
          
          console.log('Buscando grupos para a ficha:', ficha.id);
          
          const grupos = await db.getAllAsync<GrupoTreino>(
            `SELECT * FROM grupos_treino WHERE ficha_id = ?`,
            [ficha.id]
          );
          
          console.log('Grupos encontrados:', grupos);
  
          const gruposComExercicios = await Promise.all(
            grupos.map(async (grupo) => {
              console.log('Buscando exercícios para o grupo:', grupo.id);
              
              const exercicios = await db.getAllAsync<Exercicio>(
                `SELECT * FROM exercicios WHERE grupo_id = ?`,
                [grupo.id]
              );
              
              console.log('Exercícios encontrados:', exercicios);
              
              return { ...grupo, exercicios } as GrupoTreino & { exercicios: Exercicio[] };
            })
          );
  
          return { ...ficha, grupos: gruposComExercicios } as FichaTreino & { grupos: (GrupoTreino & { exercicios: Exercicio[] })[] };
        })
      );
  
      console.log('Fichas completas:', fichasComGruposEExercicios);
      return fichasComGruposEExercicios;
    } catch (error) {
      console.error('Erro ao buscar fichas:', error);
      throw error;
    }
  }

  return {
    getFichasByAluno,
    // ...outros métodos
  };
}
