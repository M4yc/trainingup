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

import Colors from '@constants/colors';
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
  frequencia: string;
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
    frequencia: '3x',
    
  },
  {
    id: '2',
    nome: 'Maria Santos',
    idade: 32,
    objetivo: 'Emagrecimento',
    status: 'Ativo',
    ultimoTreino: '12/03/2024',
    proximoTreino: '14/03/2024',
    frequencia: '5x',
  
  }
];

const filtrosStatus = ['Todos', 'Ativo', 'Inativo', 'Pendente'];
const filtrosFrequencia = ['Todos', '3x', '5x', '6x'];

export default function AlunosScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [busca, setBusca] = useState('');
  const [statusSelecionado, setStatusSelecionado] = useState('Todos');
  const [frequenciaSelecionada, setFrequenciaSelecionada] = useState('Todos');
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

    // Filtro por frequência
    if (frequenciaSelecionada !== 'Todos') {
      alunosFiltrados = alunosFiltrados.filter(
        (aluno) => aluno.frequencia.includes(frequenciaSelecionada)
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
          <Feather name="calendar" size={16} color="#44BF86" />
          <Text style={styles.infoText}>Frequência: {item.frequencia}</Text>
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
          <View style={styles.headerButtons}>
            <TouchableOpacity
              style={[styles.headerButton, { marginRight: 8 }]}
              onPress={() => navigation.navigate('NovoAluno')}
            >
              <Feather name="user-plus" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
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
            <Text style={styles.filtroLabel}>Frequência:</Text>
            {filtrosFrequencia.map((freq) => (
              <TouchableOpacity
                key={freq}
                style={[
                  styles.filtroButton,
                  frequenciaSelecionada === freq && styles.filtroButtonAtivo
                ]}
                onPress={() => setFrequenciaSelecionada(freq)}
              >
                <Text
                  style={[
                    styles.filtroButtonText,
                    frequenciaSelecionada === freq &&
                      styles.filtroButtonTextoAtivo
                  ]}
                >
                  {freq}
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
          style={{ flex: 1 }}
        />

        <TouchableOpacity 
          style={styles.fabButton}
          onPress={() => navigation.navigate('CreateWorkoutPlan', {
            alunoId: '',
            alunoNome: ''
          })}
        >
          <Feather name="file-plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
