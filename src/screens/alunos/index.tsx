import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { styles } from './styles';

type RootStackParamList = {
  ListaAlunos: undefined;
  NovoAluno: undefined;
  CreateWorkoutPlan: {
    alunoId: string;
    alunoNome: string;
  };
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ListaAlunos'
>;

interface Aluno {
  id: string;
  nome: string;
  idade: number;
  objetivo: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  ultimoTreino: string;
  proximoTreino: string;
  plano: string;
  avaliacao: {
    data: string;
    peso: number;
    altura: number;
    imc: number;
  };
}

const alunosExemplo: Aluno[] = [
  {
    id: '1',
    nome: 'João Silva',
    idade: 28,
    objetivo: 'Hipertrofia',
    status: 'Ativo',
    ultimoTreino: '13/03/2024',
    proximoTreino: '15/03/2024',
    plano: 'Premium',
    avaliacao: {
      data: '01/03/2024',
      peso: 75.5,
      altura: 1.75,
      imc: 24.65
    }
  },
  {
    id: '2',
    nome: 'Maria Santos',
    idade: 32,
    objetivo: 'Emagrecimento',
    status: 'Ativo',
    ultimoTreino: '12/03/2024',
    proximoTreino: '14/03/2024',
    plano: 'Básico',
    avaliacao: {
      data: '28/02/2024',
      peso: 68.0,
      altura: 1.65,
      imc: 24.98
    }
  }
];

const filtrosStatus = ['Todos', 'Ativo', 'Inativo', 'Pendente'];
const filtrosPlano = ['Todos', 'Básico', 'Premium'];

export default function AlunosScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [busca, setBusca] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('Todos');
  const [planoSelecionado, setPlanoSelecionado] = useState('Todos');
  const [ordenacao, setOrdenacao] = useState('nome');

  const filtrarAlunos = () => {
    let alunosFiltrados = [...alunosExemplo];

    // Filtro por busca
    if (busca) {
      alunosFiltrados = alunosFiltrados.filter((aluno) =>
        aluno.nome.toLowerCase().includes(busca.toLowerCase())
      );
    }

    // Filtro por status
    if (statusSelecionado !== 'Todos') {
      alunosFiltrados = alunosFiltrados.filter(
        (aluno) => aluno.status === statusSelecionado
      );
    }

    // Filtro por plano
    if (planoSelecionado !== 'Todos') {
      alunosFiltrados = alunosFiltrados.filter(
        (aluno) => aluno.plano === planoSelecionado
      );
    }

    // Ordenação
    alunosFiltrados.sort((a, b) => {
      if (ordenacao === 'nome') {
        return a.nome.localeCompare(b.nome);
      } else {
        return (
          new Date(a.proximoTreino).getTime() -
          new Date(b.proximoTreino).getTime()
        );
      }
    });

    return alunosFiltrados;
  };

  const renderAluno = ({ item }: { item: Aluno }) => (
    <TouchableOpacity style={styles.alunoCard}>
      <View style={styles.alunoHeader}>
        <View>
          <Text style={styles.alunoNome}>{item.nome}</Text>
          <Text style={styles.alunoIdade}>{item.idade} anos</Text>
        </View>
        <View
          style={[
            styles.statusBadge,
            {
              backgroundColor:
                item.status === 'Ativo'
                  ? '#44BF86'
                  : item.status === 'Inativo'
                    ? '#FF6B6B'
                    : '#FFA500'
            }
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.alunoInfo}>
        <View style={styles.infoItem}>
          <Feather name="target" size={16} color="#00908E" />
          <Text style={styles.infoText}>Objetivo: {item.objetivo}</Text>
        </View>
        <View style={styles.infoItem}>
          <Feather name="award" size={16} color="#44BF86" />
          <Text style={styles.infoText}>Plano: {item.plano}</Text>
        </View>
      </View>

      <View style={styles.avaliacaoContainer}>
        <Text style={styles.avaliacaoTitle}>
          Última Avaliação: {item.avaliacao.data}
        </Text>
        <View style={styles.avaliacaoGrid}>
          <View style={styles.avaliacaoItem}>
            <Text style={styles.avaliacaoLabel}>Peso</Text>
            <Text style={styles.avaliacaoValor}>{item.avaliacao.peso} kg</Text>
          </View>
          <View style={styles.avaliacaoItem}>
            <Text style={styles.avaliacaoLabel}>Altura</Text>
            <Text style={styles.avaliacaoValor}>{item.avaliacao.altura} m</Text>
          </View>
          <View style={styles.avaliacaoItem}>
            <Text style={styles.avaliacaoLabel}>IMC</Text>
            <Text style={styles.avaliacaoValor}>
              {item.avaliacao.imc.toFixed(1)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.treinosContainer}>
        <View style={styles.treinoInfo}>
          <Feather name="clock" size={16} color="#00908E" />
          <Text style={styles.treinoTexto}>Último: {item.ultimoTreino}</Text>
        </View>
        <View style={styles.treinoInfo}>
          <Feather name="calendar" size={16} color="#44BF86" />
          <Text style={styles.treinoTexto}>Próximo: {item.proximoTreino}</Text>
        </View>
      </View>

      <View style={styles.acoesContainer}>
        <TouchableOpacity
          style={[styles.acaoButton, { backgroundColor: '#44BF86' }]}
          onPress={() =>
            navigation.navigate('CreateWorkoutPlan', {
              alunoId: item.id,
              alunoNome: item.nome
            })
          }
        >
          <Feather name="file-plus" size={20} color="#fff" />
          <Text style={styles.acaoButtonText}>Nova Ficha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.acaoButton, { backgroundColor: '#00908E' }]}
        >
          <Feather name="edit-3" size={20} color="#fff" />
          <Text style={styles.acaoButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.acaoButton, { backgroundColor: '#FF6B6B' }]}
        >
          <Feather name="trash-2" size={20} color="#FFFFFF" />
          <Text style={styles.acaoText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Meus Alunos</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('NovoAluno')}
          >
            <Feather name="user-plus" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchInputContainer}>
            <Feather name="search" size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar aluno..."
              placeholderTextColor="#666"
              value={busca}
              onChangeText={setBusca}
            />
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filtrosContainer}
        >
          <View style={styles.filtroGrupo}>
            <Text style={styles.filtroLabel}>Status:</Text>
            {filtrosStatus.map((status) => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.filtroButton,
                  statusSelecionado === status && styles.filtroButtonAtivo
                ]}
                onPress={() => setStatusSelecionado(status)}
              >
                <Text
                  style={[
                    styles.filtroButtonText,
                    statusSelecionado === status &&
                      styles.filtroButtonTextoAtivo
                  ]}
                >
                  {status}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.filtroGrupo}>
            <Text style={styles.filtroLabel}>Plano:</Text>
            {filtrosPlano.map((plano) => (
              <TouchableOpacity
                key={plano}
                style={[
                  styles.filtroButton,
                  planoSelecionado === plano && styles.filtroButtonAtivo
                ]}
                onPress={() => setPlanoSelecionado(plano)}
              >
                <Text
                  style={[
                    styles.filtroButtonText,
                    planoSelecionado === plano && styles.filtroButtonTextoAtivo
                  ]}
                >
                  {plano}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <View style={styles.ordenacaoContainer}>
          <Text style={styles.ordenacaoLabel}>Ordenar por:</Text>
          <TouchableOpacity
            style={[
              styles.ordenacaoButton,
              ordenacao === 'nome' && styles.ordenacaoButtonAtivo
            ]}
            onPress={() => setOrdenacao('nome')}
          >
            <Text
              style={[
                styles.ordenacaoButtonText,
                ordenacao === 'nome' && styles.ordenacaoButtonTextoAtivo
              ]}
            >
              Nome
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.ordenacaoButton,
              ordenacao === 'proximoTreino' && styles.ordenacaoButtonAtivo
            ]}
            onPress={() => setOrdenacao('proximoTreino')}
          >
            <Text
              style={[
                styles.ordenacaoButtonText,
                ordenacao === 'proximoTreino' &&
                  styles.ordenacaoButtonTextoAtivo
              ]}
            >
              Próximo Treino
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={filtrarAlunos()}
          renderItem={renderAluno}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listaContainer}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </View>
  );
}
