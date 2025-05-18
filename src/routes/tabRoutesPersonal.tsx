import Colors from '@constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AlunosScreen from '@screens/alunos';
import DashboardPersonal from '@screens/dashboardPersonal';
import Estatistica from '@screens/estatistica';
import Perfil from '@screens/profile';

import { AppTabParamList } from './types';

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppTabNavigatorPersonal() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#2E3335',
          height: 56,
          borderColor: 'black',
          borderWidth: 0,
          marginBottom: 18,
          justifyContent: 'center'
        },
        tabBarItemStyle: {
          height: '100%',
          padding: 0,
          justifyContent: 'center',
          paddingBottom: 4
        },
        tabBarIconStyle: {},
        tabBarLabelStyle: {
          display: 'none',
          opacity: 0,
          height: 0
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarHideOnKeyboard: true
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardPersonal}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={32} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Alunos"
        component={AlunosScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="users" size={28} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Estatistica"
        component={Estatistica}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="show-chart" size={32} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={32} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  );
}
