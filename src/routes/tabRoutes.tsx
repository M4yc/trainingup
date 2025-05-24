import Colors from '@constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from '@screens/dashboard';
import Estatistica from '@screens/estatistica';
import FichaTreino from '@screens/fichaTreino';
import Perfil from '@screens/profile';

import { AppTabParamList } from './types';

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#2E3335',
          height: 56,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopWidth: 0,
          elevation: 0,
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
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={32} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="TreinosScreen"
        component={FichaTreino}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="content-paste" size={32} color={color} />
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
