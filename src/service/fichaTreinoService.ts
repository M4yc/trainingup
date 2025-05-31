// src/service/useUserService.ts
import { useSQLiteContext } from "expo-sqlite";

export interface FichaTreino {
  id: number;
  aluno_id: number;
  personal_id: number;
  data_inicio: string; // formato 'YYYY-MM-DD'
  data_fim: string;    // formato 'YYYY-MM-DD'
}

export interface GrupoTreino {
  id: number;
  ficha_id: number;
  nome: string; // ex: "A", "B", "C"
  foco: string; // ex: "Peito e tríceps"
}

export interface Exercicio {
  id: number;
  grupo_id: number;
  nome: string;
  series: number;
  repeticoes: number;
  intervalo: string; // ex: "60" (segundos)
  peso: number; // em kg
  descricao?: string;
  imagem?: string; // URL da imagem
}

export interface FichaTreinoInput {
  aluno_id: number;
  personal_id: number;
  data_inicio: string;
  data_fim: string;
}

export interface GrupoTreinoInput {
  ficha_id: number;
  nome: string;
  foco: string;
}

export interface ExercicioInput {
  grupo_id: number;
  nome: string;
  series: number;
  repeticoes: number;
  intervalo: string;
  peso: number;
  descricao?: string;
  imagem?: string;
}

export function FichaTreinoService() {
  const db = useSQLiteContext();

  async function Create(): Promise<void> {
    try {
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS fichas_treino (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          aluno_id INTEGER,
          personal_id INTEGER,
          data_inicio DATE,
          data_fim DATE,
          FOREIGN KEY (aluno_id) REFERENCES usuarios(id),
          FOREIGN KEY (personal_id) REFERENCES usuarios(id)
        );
        `);
      
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS grupos_treino (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          ficha_id INTEGER,
          nome TEXT, -- A, B, C...
          foco TEXT,
          FOREIGN KEY (ficha_id) REFERENCES fichas_treino(id)
        );
      `);

      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS exercicios (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          grupo_id INTEGER,
          nome TEXT,
          series INTEGER,
          repeticoes INTEGER,
          intervalo TEXT,
          peso REAL,
          descricao TEXT,
          imagem TEXT,
          FOREIGN KEY (grupo_id) REFERENCES grupos_treino(id)
        );
      `);

    } catch (error) {
      console.error("Erro ao criar ficha de treino:", error);
    }
  }
  async function inserirFichaTreino(ficha: FichaTreinoInput): Promise<number | null> {
    try {
      const result = await db.runAsync(
        `INSERT INTO fichas_treino (aluno_id, personal_id, data_inicio, data_fim)
         VALUES (?, ?, ?, ?)`,
        [ficha.aluno_id, ficha.personal_id, ficha.data_inicio, ficha.data_fim]
      );
      return result.lastInsertRowId as number;
    } catch (error) {
      console.error("Erro ao inserir ficha:", error);
      return null;
    }
  }

  async function inserirGrupo(grupo: GrupoTreinoInput): Promise<number | null> {
    try {
      const result = await db.runAsync(
        `INSERT INTO grupos_treino (ficha_id, nome, foco)
         VALUES (?, ?, ?)`,
        [grupo.ficha_id, grupo.nome, grupo.foco]
      );
      return result.lastInsertRowId as number;
    } catch (error) {
      console.error("Erro ao inserir grupo:", error);
      return null;
    }
  }

  async function inserirExercicio(exercicio: ExercicioInput): Promise<number | null> {
    try {
      const result = await db.runAsync(
        `INSERT INTO exercicios (grupo_id, nome, series, repeticoes, intervalo, peso, descricao, imagem)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          exercicio.grupo_id,
          exercicio.nome,
          exercicio.series,
          exercicio.repeticoes,
          exercicio.intervalo,
          exercicio.peso,
          exercicio.descricao || '',
          exercicio.imagem || ''
        ]
      );
      return result.lastInsertRowId as number;
    } catch (error) {
      console.error("Erro ao inserir exercício:", error);
      return null;
    }
  }

  async function editarFicha(ficha: FichaTreino): Promise<void> {
    await db.runAsync(
      `UPDATE fichas_treino SET aluno_id = ?, personal_id = ?, data_inicio = ?, data_fim = ? WHERE id = ?`,
      [ficha.aluno_id, ficha.personal_id, ficha.data_inicio, ficha.data_fim, ficha.id]
    );
  }

  async function editarGrupo(grupo: GrupoTreino): Promise<void> {
    await db.runAsync(
      `UPDATE grupos_treino SET nome = ?, foco = ? WHERE id = ?`,
      [grupo.nome, grupo.foco, grupo.id]
    );
  }

  async function editarExercicio(exercicio: Exercicio): Promise<void> {
    await db.runAsync(
      `UPDATE exercicios SET 
        nome = ?, series = ?, repeticoes = ?, intervalo = ?, peso = ?, descricao = ?, imagem = ?
       WHERE id = ?`,
      [
        exercicio.nome,
        exercicio.series,
        exercicio.repeticoes,
        exercicio.intervalo,
        exercicio.peso,
        exercicio.descricao || '',
        exercicio.imagem || '',
        exercicio.id
      ]
    );
  }


  async function deletarFicha(fichaId: number): Promise<void> {
    // Deleta todos os exercícios ligados a grupos dessa ficha
    await db.runAsync(
      `DELETE FROM exercicios WHERE grupo_id IN (
        SELECT id FROM grupos_treino WHERE ficha_id = ?
      )`,
      [fichaId]
    );
  
    // Deleta os grupos da ficha
    await db.runAsync(
      `DELETE FROM grupos_treino WHERE ficha_id = ?`,
      [fichaId]
    );
  
    // Deleta a própria ficha
    await db.runAsync(
      `DELETE FROM fichas_treino WHERE id = ?`,
      [fichaId]
    );
  }

  async function deletarGrupo(grupoId: number): Promise<void> {
    await db.runAsync(`DELETE FROM exercicios WHERE grupo_id = ?`, [grupoId]);
    await db.runAsync(`DELETE FROM grupos_treino WHERE id = ?`, [grupoId]);
  }

  async function deletarExercicio(exercicioId: number): Promise<void> {
    await db.runAsync(`DELETE FROM exercicios WHERE id = ?`, [exercicioId]);
  }

  async function getFichaCompleta(fichaId: number): Promise<{
    ficha: FichaTreino;
    grupos: (GrupoTreino & { exercicios: Exercicio[] })[];
  } | null> {
    try {
      const fichaResult = await db.getFirstAsync<FichaTreino>(
        'SELECT * FROM fichas_treino WHERE id = ?',
        [fichaId]
      );

      if (!fichaResult) return null;

      const gruposResult = await db.getAllAsync<GrupoTreino>(
        'SELECT * FROM grupos_treino WHERE ficha_id = ?',
        [fichaId]
      );

      const gruposComExercicios = await Promise.all(
        gruposResult.map(async (grupo) => {
          const exercicios = await db.getAllAsync<Exercicio>(
            'SELECT * FROM exercicios WHERE grupo_id = ?',
            [grupo.id]
          );
          return { ...grupo, exercicios };
        })
      );

      return {
        ficha: fichaResult,
        grupos: gruposComExercicios,
      };
    } catch (error) {
      console.error('Erro ao buscar ficha:', error);
      return null;
    }
  }

  async function getFichasByPersonal(personalId: number): Promise<FichaTreino[]> {
    try {
      const result = await db.getAllAsync<FichaTreino>(
        'SELECT * FROM fichas_treino WHERE personal_id = ?',
        [personalId]
      );
      return result;
    } catch (error) {
      console.error('Erro ao buscar fichas do personal:', error);
      return [];
    }
  }

  return { 
    Create, 
    inserirFichaTreino, 
    inserirGrupo, 
    inserirExercicio, 
    editarFicha, 
    editarGrupo, 
    editarExercicio, 
    deletarFicha, 
    deletarGrupo, 
    deletarExercicio,
    getFichaCompleta,
    getFichasByPersonal
  };
}
