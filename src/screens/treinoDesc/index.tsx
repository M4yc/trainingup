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
import { ScrollView } from 'react-native-gesture-handler';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const TreinoDesc = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <Layout>
      <ScrollView>
        <Text style={styles.nome}>{exercicio.nome}</Text>
        <Text style={styles.musculo}>Músculo: {exercicio.musculo}</Text>

        {exercicio.imagem ? (
          <Image source={{ uri: exercicio.imagem }} style={styles.imagem} />
        ) : (
          <Text style={semImagem}>[Sem imagem disponível]</Text>
        )}

        <Text style={styles.descricao}>{exercicio.descricao}</Text>

        <Text style={{ color: 'white' }}>Descrição do treino</Text>
        <Button text="Voltar" onPress={() => navigation.goBack()} />
      </ScrollView>
    </Layout>
  );
};

export default TreinoDesc;
