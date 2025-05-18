/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import ButtonExe from '@components/buttonExe';
import ButtonFloating from '@components/buttonFloating';
import ContainerAluno from '@components/containerAluno';
import ContainerStats from '@components/containerStats';
import Layout from '@components/layout';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from 'src/routes/types';

import styles from './style';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const AlunosScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Layout>
      <View style={styles.containerTitle}>
        <Text style={styles.titleText}>Lista de Alunos</Text>
      </View>
      <View style={styles.content}>
        <ContainerAluno
          name="Edinho"
          idade={21}
          userIcon={
            <Image
              source={require('../../assets/imgs/userProfile.jpg')}
              style={{ width: 64, height: 64, borderRadius: 999 }}
            />
          }
          objetivo="Hipertrofia"
          frequencia="5x"
          onPress={() => {
            console.log('teste');
            navigation.navigate('FichaTreinoAluno');
          }}
        />

        <ContainerAluno
          name="Luiz Filipe"
          userIcon={
            <Image
              source={{
                uri: 'https://avatars.githubusercontent.com/u/181023866?v=4'
              }}
              style={{ width: 64, height: 64, borderRadius: 999 }}
            />
          }
          idade={22}
          objetivo="Hipertrofia"
          frequencia="4x"
          onPress={() => console.log('Luiz')}
        />
        <ContainerAluno
          name="Edinho"
          idade={12}
          objetivo="Não sei"
          frequencia="5x"
          onPress={() => null}
        />
        <ButtonFloating onPress={() => null} />
      </View>
    </Layout>
  );
};

export default AlunosScreen;
