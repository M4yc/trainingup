/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';
import styles from './style';
import { userService, Usuario } from '@/src/service/userService';

const TopBarDashboard: React.FC = () => {
  const [user, setUser] = useState<Usuario | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const userData = await userService.getCurrentUser();
      setUser(userData);
    };

    getUser();
  }, []);

  return (
    <View style={styles.topBar}>
      <View>
        <Text style={styles.textWelcome}>Bem vindo de volta!</Text>
        <Text style={styles.textName}>{user?.name || 'Usuário'}</Text>
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
