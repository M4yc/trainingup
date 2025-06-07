import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';

import { styles } from './styles';
import { usePersonalService } from '@/src/database/personalService';
import { useIsFocused } from '@react-navigation/native';
import { useUserService, Usuario } from '@/src/service/userService';
import { getSession } from '@/src/service/session';

interface Aluno {
  id: number;
  name: string;
}

interface Card {
  titulo: string;
  valor: string | number;
  icone: keyof typeof Feather.glyphMap;
  cor: string;
}

export default function DashboardPersonal() {
  const isFocused = useIsFocused();
  const personalService = usePersonalService();
  const [alunosPersonal, setAlunosPersonal] = useState<Aluno[]>([]);
  const [user, setUser] = useState<Usuario | null>(null);
  const userService = useUserService();
  
  const carregarDados = async () => {
    try {
      const session = await getSession();
      if (!session) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
        return;
      }
      const userData = await userService.getCurrentUser();
      setUser(userData);
      
      const alunosPersonal = await personalService.getAlunosPersonal(Number(userData?.id));
      setAlunosPersonal(alunosPersonal);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isFocused) {
      carregarDados();
    }
  }, [isFocused]);

  const cards = [
    {
      titulo: 'Total de Alunos',
      valor: alunosPersonal.length,
      icone: 'users' as keyof typeof Feather.glyphMap,
      cor: '#44BF86'
    },
    {
      titulo: 'Fichas de Treino',
      valor: 8,
      icone: 'clipboard' as keyof typeof Feather.glyphMap,
      cor: '#00908E'
    },
  ];

  const renderCard = ({ item }: { item: Card }) => (
    <View style={[styles.card, { borderLeftColor: item.cor }]}>
      <Feather name={item.icone} size={24} color={item.cor} />
      <Text style={styles.cardValue}>{item.valor}</Text>
      <Text style={styles.cardTitle}>{item.titulo}</Text>
    </View>
  );

  const renderAluno = ({ item }: { item: Aluno }) => (
    <TouchableOpacity style={styles.alunoCard}>
      <View style={styles.alunoHeader}>
        <Text style={styles.alunoNome}>{item.name}</Text>
        <Feather name="chevron-right" size={24} color="#44BF86" />
      </View>

      <Text style={styles.alunoObjetivo}>
        Objetivo: <Text style={styles.alunoObjetivoValor}>Em andamento</Text>
      </Text>

      <View style={styles.alunoTreinos}>
        <View style={styles.treinoInfo}>
          <Feather name="clock" size={16} color="#00908E" />
          <Text style={styles.treinoTexto}>Último: --/--/----</Text>
        </View>

        <View style={styles.treinoInfo}>
          <Feather name="calendar" size={16} color="#44BF86" />
          <Text style={styles.treinoTexto}>Próximo: --/--/----</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Dashboard</Text>
          </View>

          <FlatList
            data={cards}
            renderItem={renderCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          />

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Alunos</Text>
            </View>

            <FlatList
              data={alunosPersonal}
              renderItem={renderAluno}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
