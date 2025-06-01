import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';

import Layout from '@components/layout';
import WorkoutCard from '@components/WorkoutCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from 'src/routes/types';

import styles from './style';

import { FichaTreinoService } from '@/src/service/fichaTreinoServiceAluno';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUserService, Usuario } from '@/src/service/userService';
import { getSession } from '@/src/service/session';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const FichaTreinoScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [fichas, setFichas] = useState<any[]>([]);
  const [user, setUser] = useState<Usuario | null>(null);
  const fichaService = FichaTreinoService();
  const userService = useUserService();
  
  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        
        const session = await getSession();
        if (!session) {
          navigation.reset;
          return;
        }
        
        const userData = await userService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil");
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

  const getTotalExercicios = (ficha: any) => {
    if (!ficha?.grupos) return 0;
    
    return ficha.grupos.reduce((total: number, grupo: any) => {
      return total + (grupo.exercicios?.length || 0);
    }, 0);
  };

  const formatarData = (data: string) => {
    if (!data) return '';
    try {
      console.log('Data recebida para formatação:', data);
      // Verifica se a data está no formato YYYY-MM-DD
      if (data.includes('-')) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
      }
      // Se a data já estiver no formato DD/MM/YYYY, retorna ela mesma
      if (data.includes('/')) {
        return data;
      }
      // Se não estiver em nenhum dos formatos esperados, retorna a data original
      return data;
    } catch (error) {
      console.error('Erro ao formatar data:', data, error);
      return data;
    }
  };

  const handleFichaPress = (ficha: any) => {
    navigation.navigate('TreinoDesc', { id: ficha.id.toString() });
  };
  
  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.title}>Fichas de Treino</Text>
        <Text style={styles.subtitle}>Selecione uma ficha de treino para abrir</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text style={styles.loadingText}>Carregando fichas...</Text>
        ) : fichas.length === 0 ? (
          <Text style={styles.emptyText}>Nenhuma ficha de treino encontrada</Text>
        ) : (
          fichas.map((ficha) => (
            <WorkoutCard
              key={ficha.id}
              title={`Ficha de Treino ${ficha.id}`}
              exerciseCount={getTotalExercicios(ficha)}
              createDate={formatarData(ficha.data_inicio)}
              endDate={formatarData(ficha.data_fim)}
              onPress={() => handleFichaPress(ficha)}
            />
          ))
        )}
      </ScrollView>
    </Layout>
  );
};

export default FichaTreinoScreen;
