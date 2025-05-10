import React from 'react';
import { View,  Text} from 'react-native';

import styles from './style';

import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/layout';
import { Ionicons } from '@expo/vector-icons';
// Defina o tipo da navegação para a tela Login
type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'Login'>;

const Dashboard = () => {
    const navigation = useNavigation<LoginScreenNavigationProp>();
    const { user, signOut } = useAuth();


    const handleScreen = () =>{
        navigation.navigate('Login');
    }

    return (
        <Layout>
            <View style={{ flexDirection: 'row', padding: 20, justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row'}}>
                    <Ionicons name='person-sharp' size={30} color={'white'}/>
                    <View >
                        <Text style={{color: 'white'}}>Edinho</Text>
                        <Text style={{color: 'white'}}>Aluno</Text>
                    </View>
                </View>
                
                <Ionicons name='menu' size={24} color={'white'}/>
            </View>
            <View style={{backgroundColor: '#c4c5c5', flexDirection: 'row', padding: 20, justifyContent: 'space-between'}}>
                
            </View>
        </Layout>
    );
};

export default Dashboard;
