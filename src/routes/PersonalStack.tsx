import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardPersonal from '@screens/dashboardPersonal';
import { CreateWorkoutPlan } from '@/src/screens/newFichaAluno/createWorkoutPlan';
import NovaFichaTreino from '@screens/novaFichaTreino';
import TreinoDesc from '@screens/treinoDesc';

import AppTabNavigatorPersonal from './tabRoutesPersonal';
// Telas

const PersonalStack = createNativeStackNavigator();

// Rotas principais (condicionais)
export default function PersonalRoutes() {
  return (
    <PersonalStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainTabs"
    >
      <PersonalStack.Screen name="MainTabs" component={AppTabNavigatorPersonal} />
      <PersonalStack.Screen name="DashboardPersonal" component={DashboardPersonal} />
      <PersonalStack.Screen name="CreateWorkoutPlan" component={CreateWorkoutPlan} />
      <PersonalStack.Screen name="NovaFichaTreino" component={NovaFichaTreino} />
      <PersonalStack.Screen name="TreinoDesc" component={TreinoDesc} />
    </PersonalStack.Navigator>
  );
}
