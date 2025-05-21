import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';

import { styles } from './styles';

interface Aluno {
  id: string;
  nome: string;
  objetivo: string;
  proximoTreino: string;
  ultimoTreino: string;
}

interface Card {
  titulo: string;
  valor: string | number;
  icone: keyof typeof Feather.glyphMap;
  cor: string;
}

const dadosExemplo = {
  alunosAtivos: [
    {
      id: '1',
      nome: 'João Silva',
      objetivo: 'Hipertrofia',
      proximoTreino: '15/03/2024',
      ultimoTreino: '13/03/2024'
    },
    {
      id: '2',
      nome: 'Maria Santos',
      objetivo: 'Emagrecimento',
      proximoTreino: '14/03/2024',
      ultimoTreino: '12/03/2024'
    }
  ],
  cards: [
    {
      titulo: 'Total de Alunos',
      valor: 25,
      icone: 'users' as keyof typeof Feather.glyphMap,
      cor: '#44BF86'
    },
    {
      titulo: 'Treinos Hoje',
      valor: 8,
      icone: 'calendar' as keyof typeof Feather.glyphMap,
      cor: '#00908E'
    },
    {
      titulo: 'Avaliações Pendentes',
      valor: 3,
      icone: 'clipboard' as keyof typeof Feather.glyphMap,
      cor: '#FF6B6B'
    }
  ]
};

export default function DashboardPersonal() {
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
        <Text style={styles.alunoNome}>{item.nome}</Text>
        <Feather name="chevron-right" size={24} color="#44BF86" />
      </View>

      <Text style={styles.alunoObjetivo}>
        Objetivo: <Text style={styles.alunoObjetivoValor}>{item.objetivo}</Text>
      </Text>

      <View style={styles.alunoTreinos}>
        <View style={styles.treinoInfo}>
          <Feather name="clock" size={16} color="#00908E" />
          <Text style={styles.treinoTexto}>Último: {item.ultimoTreino}</Text>
        </View>

        <View style={styles.treinoInfo}>
          <Feather name="calendar" size={16} color="#44BF86" />
          <Text style={styles.treinoTexto}>Próximo: {item.proximoTreino}</Text>
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
            <TouchableOpacity style={styles.notificationButton}>
              <Feather name="bell" size={24} color="#FFFFFF" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          <FlatList
            data={dadosExemplo.cards}
            renderItem={renderCard}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          />

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Próximos Treinos</Text>
              <TouchableOpacity>
                <Text style={styles.verTodosText}>Ver todos</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={dadosExemplo.alunosAtivos}
              renderItem={renderAluno}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
          </View>

          <TouchableOpacity style={styles.addButton}>
            <Feather name="plus" size={24} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Novo Aluno</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
