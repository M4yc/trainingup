/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import ContainerStats from '../../components/containerStats';
import Layout from '../../components/layout';
import ListWeek from '../../components/listWeek';
import TopBarDashboard from '../../components/topBarDashboard';
import WorkoutCard from '../../components/WorkoutCard';
import styles from './styles';
import { FichaTreinoService } from '@/src/service/fichaTreinoServiceAluno';
import { useUserService, Usuario } from '@/src/service/userService';
import { getSession } from '@/src/service/session';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppTabParamList } from '@/src/routes/types';
import { useNavigation } from '@react-navigation/native';

type NavigationProp = NativeStackNavigationProp<AppTabParamList>;

const Dashboard = () => {
  const navigation = useNavigation<NavigationProp>();
  const [user, setUser] = useState<Usuario | null>(null);
  const fichaService = FichaTreinoService();
  const userService = useUserService();
  const [fichas, setFichas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const userData = await userService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Erro ao carregar dados do perfil:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do perfil');
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  useEffect(() => {
    async function loadFichas() {
      try {
        if (!user?.id) return;

        const res = await fichaService.getFichasByAluno(Number(user.id));
        setFichas(res);
      } catch (error) {
        console.error('Erro ao carregar fichas:', error);
        Alert.alert('Erro', 'Não foi possível carregar as fichas de treino');
      }
    }

    loadFichas();
  }, [user]);
  console.log('Fichas: ', fichas)
  const primeiraFicha = fichas && fichas.length > 0 ? fichas[0] : null;

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
        {primeiraFicha ? (
          <TouchableOpacity
            style={styles.workoutCard}
            onPress={() => navigation.navigate('TreinosScreen')}
          >
            <ImageBackground
              source={require('../../assets/imgs/bg_musc.png')}
              style={styles.workoutBackground}
              imageStyle={{ opacity: 0.4 }}
            >
              {primeiraFicha.grupos && primeiraFicha.grupos.slice(0, 2).map((grupo: { nome: any; foco: any; exercicios: string | any[]; }, index: number) => (
                <View key={`grupo-${index}`} style={styles.workoutContent}>
                  <View>
                    <Text style={styles.workoutTitle}>Treino {grupo.nome || `Grupo ${index + 1}`}</Text>
                    <Text style={styles.workoutSubtitle}>Foco: {grupo.foco}</Text>
                  </View>
                  <View style={styles.workoutInfo}>
                    <MaterialIcons
                      name="fitness-center"
                      size={24}
                      color="#4be381"
                    />
                    <Text style={styles.workoutInfoText}>{grupo.exercicios ? grupo.exercicios.length : 0}exercícios</Text>
                  </View>
                </View>
              ))}
            </ImageBackground>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.workoutCard}>
            <ImageBackground
              source={require('../../assets/imgs/bg_musc.png')}
              style={styles.workoutBackground}
              imageStyle={{ opacity: 0.4 }}
            >
              <View style={styles.workoutContent}>
                <View>
                  <Text style={styles.workoutTitle}>Nenhuma ficha encontrada</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        )}

      </View>
    </Layout>
  );
};

export default Dashboard;
