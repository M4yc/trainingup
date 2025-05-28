import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardPersonal from '@screens/dashboardPersonal';
import { CreateWorkoutPlan } from '@/src/screens/newFichaAluno/createWorkoutPlan';
import NovaFichaTreino from '@screens/novaFichaTreino';
import TreinoDesc from '@screens/treinoDesc';

import AppTabNavigatorPersonal from './tabRoutesPersonal';
// Telas

const Stack = createNativeStackNavigator();

// Rotas principais (condicionais)
export default function PersonalStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainTabs"
    >
      <Stack.Screen name="MainTabs" component={AppTabNavigatorPersonal} />
      <Stack.Screen name="DashboardPersonal" component={DashboardPersonal} />
      <Stack.Screen name="CreateWorkoutPlan" component={CreateWorkoutPlan} />
      <Stack.Screen name="NovaFichaTreino" component={NovaFichaTreino} />
      <Stack.Screen name="TreinoDesc" component={TreinoDesc} />
    </Stack.Navigator>
  );
}
