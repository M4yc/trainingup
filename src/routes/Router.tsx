import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { User } from 'firebase/auth';
import RegisterScreen from '../screens/register';
import LoginScreen from '../screens/login';
import { auth, db } from '../config/FirebaseConfig';
import AppStack from './AppStack';
import PersonalStack from './PersonalStack';
import { RootStackParamList } from './types';
import { doc, getDoc } from 'firebase/firestore';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function Router() {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (_user) => {
      setUser(_user);
      if (_user) {
        try {
          const docRef = doc(db, "usuarios", _user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserType(docSnap.data().tipo);
          }
        } catch (error) {
          console.error("Erro ao buscar tipo de usuário:", error);
        }
      } else {
        setUserType(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return null; // ou um componente de loading
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : userType === 'Personal' ? (
          <Stack.Screen name="PersonalStack" component={PersonalStack} />
        ) : (
          <Stack.Screen name="AlunoStack" component={AppStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
