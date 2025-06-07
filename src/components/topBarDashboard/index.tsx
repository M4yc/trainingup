/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from 'react';
import { View, Text, Image, Alert } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/colors';
import styles from './style';
import { useUserService, Usuario } from '@/src/service/userService';
import { getSession } from '@/src/service/session';

const TopBarDashboard: React.FC = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const userService = useUserService();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const session = await getSession();
        const userData = await userService.getCurrentUser();
        // console.log("Dados do usuário:", userData);
        setUser(userData);
      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil");
      } 
    };

    loadUserData();
  }, []);

  return (
    <View style={styles.topBar}>
      <View>
        <Text style={styles.textWelcome}>Bem vindo de volta!</Text>
        <Text style={styles.textName}>{user?.name || 'Usuário'}</Text>
      </View>
      <View>
        <Image
          source={require('../../assets/imgs/profile.png')}
          style={{ width: 48, height: 48, borderRadius: 999 }}
        />
      </View>
    </View>
  );
};

export default TopBarDashboard;
