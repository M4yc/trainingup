// AppStackNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppStackParamList } from '../../routes/types';
import TreinoDesc from '../../screens/treinoDesc';
import AppTabNavigator from './AppTabNavigator';
// import Configuracoes from '../../screens/configuracoes';
// import Exercicio from '../../screens/exercicio';
// import Corpo from '../../screens/corpo';

const Stack = createNativeStackNavigator<AppStackParamList>();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={AppTabNavigator} />
      <Stack.Screen name="TreinoDesc" component={TreinoDesc} />
      {/* <Stack.Screen name="Configuracoes" component={Configuracoes} />
      <Stack.Screen name="Exercicio" component={Exercicio} />
      <Stack.Screen name="Corpo" component={Corpo} /> */}
    </Stack.Navigator>
  );
}
