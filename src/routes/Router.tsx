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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (_user) => {
      setUser(_user);
      if (_user) {
        // Buscar o tipo do usuário
        const docRef = doc(db, "usuarios", _user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserType(docSnap.data().tipo);
        }
      } else {
        setUserType(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <>
            {userType === 'Personal' ? (
              <Stack.Screen name="PersonalStack" component={PersonalStack} />
            ) : (
              <Stack.Screen name="AlunoStack" component={AppStack} />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
