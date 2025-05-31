import React, { useEffect } from 'react';

import Router from 'src/routes/Router';
import { SQLiteProvider } from 'expo-sqlite';
import { initializeDatabase } from './src/database';
import * as FileSystem from 'expo-file-system';

const deleteDatabase = async () => {
  const dbPath = `${FileSystem.documentDirectory}SQLite/trainingup.db`;
  const fileInfo = await FileSystem.getInfoAsync(dbPath);
  if (fileInfo.exists) {
    await FileSystem.deleteAsync(dbPath);
    console.log('Banco de dados deletado com sucesso');
  } else {
    console.log('Banco de dados não encontrado');
  }
};

export default function App() {
  // useEffect(() => {
  //   deleteDatabase(); // 🔥 Só use no DEV! Remova em produção.
  // }, []);
  return (
    <SQLiteProvider databaseName='trainingup.db' onInit={initializeDatabase}>
      <Router />
    </SQLiteProvider>
  );
}
