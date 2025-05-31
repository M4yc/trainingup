import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '@/src/screens/login';
import RegisterScreen from '@/src/screens/register';
import EditProfileScreen from '@/src/screens/editProfile';
import PersonalRoutes from '@/src/routes/PersonalStack';
import AlunoRoutes from '@/src/routes/AlunoStack';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Router() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUserType = await AsyncStorage.getItem('userType');
      setUserId(storedUserId);
      setUserType(storedUserType);
    } catch (error) {
      console.error('Erro ao verificar login:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="PersonalRoutes" component={PersonalRoutes} />
        <Stack.Screen name="AlunoRoutes" component={AlunoRoutes} />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen}
          options={{
            headerShown: true,
            title: 'Editar Perfil',
            headerStyle: {
              backgroundColor: '#1A1A1A',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
