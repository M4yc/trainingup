import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardPersonal from '@screens/dashboardPersonal';
import FichaTreinoAluno from '@screens/fichaAluno';
import TreinoDesc from '@screens/treinoDesc';

import AppTabNavigatorPersonal from './tabRoutesPersonal';
// Telas

const Stack = createNativeStackNavigator();

// Rotas principais (condicionais)
export default function PersonalStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="App"
    >
      <Stack.Screen name="App" component={AppTabNavigatorPersonal} />
      <Stack.Screen name="DashboardPersonal" component={DashboardPersonal} />
      <Stack.Screen name="FichaTreinoAluno" component={FichaTreinoAluno} />
    </Stack.Navigator>
  );
}
