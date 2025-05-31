import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TreinoDesc from '@screens/treinoDesc';

import AppTabNavigator from './tabRoutesAluno';
// Telas

const AlunoStack = createNativeStackNavigator();

// Rotas principais (condicionais)
export default function AlunoRoutes() {
  return (
    <AlunoStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="App"
    >
      <AlunoStack.Screen name="App" component={AppTabNavigator} />
      <AlunoStack.Screen name="TreinoDesc" component={TreinoDesc} />
    </AlunoStack.Navigator>
  );
}
