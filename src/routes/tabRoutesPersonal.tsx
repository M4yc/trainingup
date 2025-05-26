import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlunosScreen from '@screens/alunos';
import DashboardPersonal from '@screens/dashboardPersonal';
import Estatistica from '@screens/estatistica';
import NovoAluno from '@screens/novoAluno';
import Perfil from '@screens/profile';

const Colors = {
  fundo: '#211d28',
  primary: '#44BF86',
  auxiliar: '#00908E',
  white: '#FFFFFF',
  bordas: '#333333',
  auxiliar2: '#2A2634',
  inactive: '#666666'
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AlunosNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right'
      }}
    >
      <Stack.Screen name="ListaAlunos" component={AlunosScreen} />
      <Stack.Screen name="NovoAluno" component={NovoAluno} />
    </Stack.Navigator>
  );
}

export default function AppTabNavigatorPersonal() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: Colors.fundo,
          height: 65,
          borderTopWidth: 1,
          borderTopColor: Colors.bordas,
          paddingBottom: 10,
          paddingTop: 10,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          shadowOpacity: 0,
          zIndex: 999
        },
        tabBarItemStyle: {
          paddingTop: 0,
          paddingBottom: 0
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.inactive,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardPersonal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={28} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Alunos"
        component={AlunosNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="people" size={28} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Estatistica"
        component={Estatistica}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="insert-chart" size={28} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={28} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
