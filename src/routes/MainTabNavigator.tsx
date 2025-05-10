import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from './types';
import LoginScreen from '../screens/login';
import Dashboard from '../screens/dashboard';
import FichaTreino from '../screens/fichaTreino';
import Estatistica from '../screens/estatistica';
import Perfil from '../screens/profile';

import { MaterialIcons } from '@expo/vector-icons'; // Ou outro pacote de ícones

const Tab = createBottomTabNavigator<MainTabParamList>();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
      }}
    >
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard}
        options={{
          tabBarLabel: 'Início',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="FichaTreino" 
        component={FichaTreino}
        options={{
          tabBarLabel: 'Treino',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="fitness-center" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Perfil" 
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}