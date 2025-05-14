/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { View, Text, Image } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Layout from '../../components/layout';
import MenuOptions from '../../components/menuOptions';
import { useAuth } from '../../contexts/AuthContext';
import styles from './style';

const Perfil = () => {
  const { signOut } = useAuth();

  const botoes = [
    {
      text: 'Editar perfil',
      onPress: () => null,
      icon: <Ionicons name="person" size={20} color={'white'} />
    },
    {
      text: 'Configurações',
      onPress: () => null,
      icon: <Ionicons name="settings" size={20} color={'white'} />
    },
    {
      text: 'Sobre',
      onPress: () => null,
      icon: <Ionicons name="alert-circle" size={20} color={'white'} />
    },
    {
      text: 'Sair',
      onPress: signOut,
      icon: <Ionicons name="exit-outline" size={20} color={'white'} />
    }
  ];

  return (
    <Layout>
      <View style={styles.container}>
        <Image
          source={require('../../assets/imgs/userProfile.jpg')}
          style={{ width: 64, height: 64, borderRadius: 999 }}
        />
        <Text style={{ color: 'white' }}>User Name</Text>
        <Text style={styles.text}>Perfil</Text>
        <View style={styles.buttons}>
          {botoes.map((item) => (
            <MenuOptions
              key={item.text}
              text={item.text}
              onPress={item.onPress}
              icon={item.icon}
            />
          ))}
        </View>
      </View>
    </Layout>
  );
};

export default Perfil;
