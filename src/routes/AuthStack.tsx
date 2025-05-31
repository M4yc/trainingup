import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/login';
import RegisterScreen from '@screens/register';

import { RootStackParamList } from './types';
import Profile from '../screens/profile';
// Telas

const AuthStack = createNativeStackNavigator<RootStackParamList>();

// Rotas principais (condicionais)
export default function AuthRoutes() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Register" component={RegisterScreen} />
      <AuthStack.Screen name="Profile" component={Profile} />
    </AuthStack.Navigator>
  );
}
