import React, { useState } from 'react';

import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../contexts/Auth';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import PersonalStack from './PersonalStack';

export function Router() {
  const { authData } = useAuth();

  return (
    <NavigationContainer>
      {!authData ? (
        <AuthStack />
      ) : authData.userType === 'aluno' ? (
        <AppStack />
      ) : (
        <PersonalStack />
      )}
    </NavigationContainer>
  );
}
