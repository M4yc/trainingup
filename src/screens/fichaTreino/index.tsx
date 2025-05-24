import React from 'react';
import { View, Text } from 'react-native';

import ButtonExe from '@components/buttonExe';
import Layout from '@components/layout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from 'src/routes/types';

import styles from './style';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const FichaTreino = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Layout>
      <View style={styles.containerTitle}>
        <Text style={styles.titleText}>Segunda-Feira</Text>
      </View>
      <View style={styles.content}>
        <ButtonExe
          nameExe="Supino em aparelho"
          icon={
            <MaterialIcons name="sports-handball" size={32} color="orange" />
          }
          repticoes={15}
          serie={4}
          onPress={() =>
            navigation.navigate('TreinoDesc', {
              nome: 'Supino em aparelho',
              musculoAlvo: 'Peitoral',
              series: 4,
              repeticoes: 15,
              peso: '15kg',
              intervalo: '30-60s',
              descricao:
                'Este exercício é para ser feito de forma consicente na questão do peso arrisque peso alto sem uma pessoa treinando contigo.Quando sentir que esse peso já está leve, pode ir aumentando aos poucos, COM SEGURANÇA!',
              imagem:
                'https://dicasef.com.br/wp-content/uploads/2024/08/supino-reto-1.jpg',
              numero: 1
            })
          }
        />
      </View>
    </Layout>
  );
};

export default FichaTreino;
