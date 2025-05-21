import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';

import Layout from '../../components/layout';
import { styles } from './styles';

const Colors = {
  success: '#44BF86',
  warning: '#FFA500',
  error: '#FF6B6B'
};

const dadosExemplo = {
  cards: [
    {
      title: 'Alunos Ativos',
      value: '45',
      icon: 'users',
      change: '+12%',
      isPositive: true
    },
    {
      title: 'Receita Mensal',
      value: 'R$ 4.500',
      icon: 'dollar-sign',
      change: '+8%',
      isPositive: true
    }
  ],
  desempenho: [
    {
      title: 'Taxa de Retenção',
      value: '85%',
      icon: 'trending-up',
      change: '+5%',
      isPositive: true
    },
    {
      title: 'Avaliações Pendentes',
      value: '3',
      icon: 'clipboard',
      change: '-2',
      isPositive: true
    }
  ],
  ultimosAlunos: [
    {
      nome: 'João Silva',
      status: 'Ativo',
      ultimoTreino: '15/03/2024',
      progresso: '90%'
    },
    {
      nome: 'Maria Santos',
      status: 'Pendente',
      ultimoTreino: '14/03/2024',
      progresso: '75%'
    },
    {
      nome: 'Pedro Costa',
      status: 'Inativo',
      ultimoTreino: '10/03/2024',
      progresso: '45%'
    }
  ]
};

const Estatistica = () => {
  const renderCard = (item: (typeof dadosExemplo.cards)[0]) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Feather
          name={item.icon as keyof typeof Feather.glyphMap}
          size={20}
          color={Colors.success}
          style={styles.cardIcon}
        />
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <Text style={styles.cardValue}>{item.value}</Text>
      <View style={styles.cardFooter}>
        <Feather
          name={item.isPositive ? 'trending-up' : 'trending-down'}
          size={16}
          color={item.isPositive ? Colors.success : Colors.error}
        />
        <Text
          style={[
            styles.cardFooterText,
            { color: item.isPositive ? Colors.success : Colors.error }
          ]}
        >
          {item.change} este mês
        </Text>
      </View>
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ativo':
        return Colors.success;
      case 'Pendente':
        return Colors.warning;
      case 'Inativo':
        return Colors.error;
      default:
        return Colors.success;
    }
  };

  return (
    <Layout>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>Estatísticas</Text>
            <Text style={styles.subtitle}>Visão geral do seu desempenho</Text>
          </View>

          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Visão Geral</Text>
              <View style={styles.row}>
                {dadosExemplo.cards.map((card, index) => (
                  <View key={index} style={{ flex: 1 }}>
                    {renderCard(card)}
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Métricas de Desempenho</Text>
              <View style={styles.row}>
                {dadosExemplo.desempenho.map((card, index) => (
                  <View key={index} style={{ flex: 1 }}>
                    {renderCard(card)}
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Últimos Alunos</Text>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.tableHeaderCell, { flex: 2 }]}>
                    Aluno
                  </Text>
                  <Text style={styles.tableHeaderCell}>Status</Text>
                  <Text style={styles.tableHeaderCell}>Último Treino</Text>
                  <Text style={styles.tableHeaderCell}>Progresso</Text>
                </View>
                {dadosExemplo.ultimosAlunos.map((aluno, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={[styles.tableCell, { flex: 2 }]}>
                      {aluno.nome}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: getStatusColor(aluno.status) }
                        ]}
                      >
                        <Text style={styles.statusText}>{aluno.status}</Text>
                      </View>
                    </View>
                    <Text style={styles.tableCell}>{aluno.ultimoTreino}</Text>
                    <Text style={styles.tableCell}>{aluno.progresso}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default Estatistica;
