import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TreinoDesc from '@screens/treinoDesc';

import AppTabNavigator from './tabRoutes';
// Telas

const Stack = createNativeStackNavigator();

// Rotas principais (condicionais)
export default function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="App"
    >
      <Stack.Screen name="App" component={AppTabNavigator} />
      <Stack.Screen name="TreinoDesc" component={TreinoDesc} />
    </Stack.Navigator>
  );
}
