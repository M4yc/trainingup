import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase){
  try {
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      tipo TEXT CHECK(tipo IN ('Aluno', 'Personal')) NOT NULL,
      personal_id INTEGER,
      FOREIGN KEY (personal_id) REFERENCES users(id)
      );
      `);
      
    await database.execAsync(`
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

      await database.execAsync(`
        CREATE TABLE IF NOT EXISTS grupos_treino (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          ficha_id INTEGER,
          nome TEXT, -- A, B, C...
          foco TEXT,
          FOREIGN KEY (ficha_id) REFERENCES fichas_treino(id)
        );
      `);
  
      await database.execAsync(`
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
    console.log("Erro ao criar tabelas")
  }
  
}