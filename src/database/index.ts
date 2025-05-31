import { type SQLiteDatabase } from "expo-sqlite";

export async function initializeDatabase(database: SQLiteDatabase){
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
    `)
}