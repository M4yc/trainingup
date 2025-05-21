/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import ContainerStats from '../../components/containerStats';
import Layout from '../../components/layout';
import ListWeek from '../../components/listWeek';
import TopBarDashboard from '../../components/topBarDashboard';
import WorkoutCard from '../../components/WorkoutCard';
import styles from './styles';

const Dashboard = () => {
  return (
    <Layout>
      <TopBarDashboard />

      {/* Seção de Progresso Semanal */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Progresso Semanal</Text>
        <ListWeek />
      </View>

      {/* Estatísticas */}
      <ContainerStats />

      {/* Seção de Treino Atual */}
      <View style={styles.contentContainer}>
        <Text style={styles.mainTitle}>Seu Treino de Hoje</Text>

        <TouchableOpacity style={styles.workoutCard}>
          <ImageBackground
            source={require('../../assets/imgs/bg_musc.png')}
            style={styles.workoutBackground}
            imageStyle={{ opacity: 0.4 }}
          >
            <View style={styles.workoutContent}>
              <View>
                <Text style={styles.workoutTitle}>Treino A - Superiores</Text>
                <Text style={styles.workoutSubtitle}>Foco: Hipertrofia</Text>
              </View>

              <View style={styles.workoutInfo}>
                <MaterialIcons
                  name="fitness-center"
                  size={24}
                  color="#4be381"
                />
                <Text style={styles.workoutInfoText}>8 exercícios</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Próximos Treinos */}
        <Text style={styles.sectionTitle}>Próximos Treinos</Text>

        <WorkoutCard
          title="Treino B - Inferiores"
          exerciseCount={6}
          lastUpdated="Ontem"
          onPress={() => {}}
        />

        <WorkoutCard
          title="Treino C - Full Body"
          exerciseCount={10}
          lastUpdated="2 dias atrás"
          onPress={() => {}}
        />
      </View>
    </Layout>
  );
};

export default Dashboard;
