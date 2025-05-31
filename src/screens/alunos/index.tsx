import React, { useEffect, useState } from 'react';
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
import { FichaTreinoService } from '@/src/service/fichaTreinoService';
import { usePersonalService } from '@/src/database/personalService';
import { useIsFocused } from '@react-navigation/native';

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

type Aluno = {
  id: number;
  name: string;  
};

const alunosExemplo: Aluno[] = [
  {
    id: 1,
    name: 'João Silva',
  },
  {
    id: 2,
    name: 'Maria Santos',
  }
];

export default function AlunosScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const personalService = usePersonalService();
  const fichaTreinoService = FichaTreinoService();
  const isFocused = useIsFocused();

  useEffect(() => {
    const setup = async () => {
      const fichas = await fichaTreinoService.getFichasByPersonal(1);
      console.log('Fichas: ', fichas);
    };
    if (isFocused) {
      setup();
    }
  }, [isFocused]);

  useEffect(() => {
    const setup = async () => {
      try {
        const alunos= await personalService.getAlunosPersonal(1);
        setAlunos(alunos);
      }catch(error){
        console.log(error)
      }
    };
  
    setup();
  }, []);
  console.log('Alunos: ', alunos);
  
  const filtrarAlunos = () => {
    let alunosFiltrados = [...alunos];

    // Filtro por busca
    if (busca) {
      alunosFiltrados = alunosFiltrados.filter((aluno) =>
        aluno.name.toLowerCase().includes(busca.toLowerCase())
      );
    }

    // Ordenação
    alunosFiltrados.sort((a: Aluno, b: Aluno) => {
      if (ordenacao === 'nome') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return alunosFiltrados;
  };

  const renderAluno = ({ item }: { item: Aluno }) => (
    <TouchableOpacity style={styles.alunoCard}>
      <View style={styles.alunoHeader}>
        <View>
          <Text style={styles.alunoNome}>{item.name}</Text>
        </View>
      </View>

      <View style={styles.acoesContainer}>
        <TouchableOpacity
          style={[styles.acaoButton, { backgroundColor: '#44BF86' }]}
          onPress={() =>
            navigation.navigate('CreateWorkoutPlan', {
              alunoId: item.id.toString(),
              alunoNome: item.name
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
        </View>

        <FlatList
          data={filtrarAlunos()}
          renderItem={renderAluno}
          keyExtractor={(item) => item.id.toString()}
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
