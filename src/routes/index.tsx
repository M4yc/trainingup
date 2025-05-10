import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootStackParamList } from './types';
// Telas
import LoginScreen from '../screens/login';
import { useAuth } from '../contexts/AuthContext';
import { ActivityIndicator } from 'react-native';
import MainTabNavigator from '../components/navigation/AppTabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Rotas principais (condicionais)
export default function Routes() {
  const {user, loading} = useAuth();
  if (loading){
    return <ActivityIndicator size="large"/>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
            <Stack.Screen name='Main' component={MainTabNavigator}/>
          ) : (
            <Stack.Screen name='Login' component={LoginScreen} />
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}