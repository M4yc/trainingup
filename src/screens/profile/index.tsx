import React from 'react';
import { View, Text} from 'react-native';

import styles from './style';
import Button from '../../components/button';
import { useAuth } from '../../contexts/AuthContext';

const Perfil = () => {
    
    const { user, signOut } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Perfil</Text>
            <Button text='Sair' onPress={signOut} />
        </View>
    );
};

export default Perfil;