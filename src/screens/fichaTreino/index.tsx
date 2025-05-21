import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import Layout from '@components/layout';
import WorkoutCard from '@components/WorkoutCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from 'src/routes/types';

import styles from './style';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

// Dados mockados para exemplo
const mockWorkouts = [
  {
    id: '1',
    title: 'Segunda-Feira - Superior',
    exerciseCount: 8,
    lastUpdated: '15/03/2024'
  },
  {
    id: '2',
    title: 'Terça-Feira - Inferior',
    exerciseCount: 6,
    lastUpdated: '15/03/2024'
  },
  {
    id: '3',
    title: 'Quarta-Feira - Full Body',
    exerciseCount: 10,
    lastUpdated: '15/03/2024'
  }
];

const FichaTreinoScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.title}>Fichas de Treino</Text>
        <Text style={styles.subtitle}>Gerencie os treinos do seu aluno</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {mockWorkouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            title={workout.title}
            exerciseCount={workout.exerciseCount}
            lastUpdated={workout.lastUpdated}
            onPress={() => navigation.navigate('TreinoDesc')}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('NovaFichaTreino')}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </Layout>
  );
};

export default FichaTreinoScreen;
