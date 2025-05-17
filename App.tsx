import React from 'react';

import { Router } from 'src/routes/Router';

import { AuthProvider } from './src/contexts/Auth';
import Routes from './src/routes';

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
