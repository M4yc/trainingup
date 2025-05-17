import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '@screens/login';

import { RootStackParamList } from './types';
// Telas

const Stack = createNativeStackNavigator<RootStackParamList>();

// Rotas principais (condicionais)
export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}
