import React from 'react';
import { View, Text } from 'react-native';

import Button from '@components/button';
import ButtonExe from '@components/buttonExe';
import Layout from '@components/layout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from 'src/routes/types';

import styles from './style';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const TreinoDesc = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <Layout>
      <Text style={{ color: 'white' }}>Descrição do treino</Text>
      <Button text="Voltar" onPress={() => navigation.goBack()} />
    </Layout>
  );
};

export default TreinoDesc;
