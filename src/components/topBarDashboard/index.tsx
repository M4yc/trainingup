/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { View, Text, Image } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useAuth } from 'src/contexts/Auth';

import Colors from '../../constants/colors';
import styles from './style';

const TopBarDashboard: React.FC = () => {
  const { authData } = useAuth();
  return (
    <View style={styles.topBar}>
      <View>
        <Text style={styles.textWelcome}>Bem vindo de volta!</Text>
        <Text style={styles.textName}>{authData?.name}</Text>
      </View>
      <View>
        <Image
          source={require('../../assets/imgs/userProfile.jpg')}
          style={{ width: 48, height: 48, borderRadius: 999 }}
        />
        {/* <Ionicons name='menu' size={24} color={'white'}/> */}
      </View>
    </View>
  );
};

export default TopBarDashboard;
