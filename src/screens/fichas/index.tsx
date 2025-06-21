import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Colors from '@constants/colors';
import { styles } from './styles';
import { FichaTreinoService, FichaTreino } from '@/src/service/fichaTreinoService';
import { usePersonalService } from '@/src/database/personalService';
import { useIsFocused } from '@react-navigation/native';
import { useUserService, Usuario } from '@/src/service/userService';
import { getSession } from '@/src/service/session';

type RootStackParamList = {
  FichasAlunos: undefined;
  NovoAluno: undefined;
  CreateWorkoutPlan: {
    alunoId: string;
    alunoNome: string;
    fichaId?: string;
    modo: 'criar' | 'editar';
  };
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'FichasAlunos'
>;

type Aluno = {
  id: number;
  name: string;
};

type FichaComAluno = FichaTreino & {
  alunoNome: string;
};

export default function FichasAlunosScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [busca, setBusca] = useState('');
  const [ordenacao, setOrdenacao] = useState('nome');
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [fichas, setFichas] = useState<FichaComAluno[]>([]);
  const personalService = usePersonalService();
  const fichaTreinoService = FichaTreinoService();
  const isFocused = useIsFocused();
  const [user, setUser] = useState<Usuario | null>(null);
  const userService = useUserService();


  const formatarData = (data: string) => {
    if (!data) return '';
    try {
      if (data.includes('-')) {
        const [ano, mes, dia] = data.split('-');
        return `${dia}/${mes}/${ano}`;
      }
      return data;
    } catch (error) {
      console.error('Erro ao formatar data:', data, error);
      return data;
    }
  };

  const carregarFichas = async () => {
    try {
      const userData = await userService.getCurrentUser();
      setUser(userData);
      //console.log("Dados do usuário:", userData);
      const fichasPersonal = await fichaTreinoService.getFichasByPersonal(Number(userData?.id));
      const alunosPersonal = await personalService.getAlunosPersonal(Number(userData?.id));

      // Mapear as fichas com os nomes dos alunos
      const fichasComAlunos = fichasPersonal.map(ficha => {
        const aluno = alunosPersonal.find(a => a.id === ficha.aluno_id);
        return {
          ...ficha,
          alunoNome: aluno?.name || 'Aluno não encontrado'
        };
      });

      setFichas(fichasComAlunos);
      setAlunos(alunosPersonal);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      Alert.alert('Erro', 'Não foi possível carregar as fichas');
    }
  };

  useEffect(() => {
    if (isFocused) {
      carregarFichas();
    }
  }, [isFocused]);

  const handleDeleteFicha = async (fichaId: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir esta ficha?',
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await fichaTreinoService.deletarFicha(fichaId);
              Alert.alert('Sucesso', 'Ficha excluída com sucesso');
              carregarFichas(); // Recarrega a lista após excluir
            } catch (error) {
              console.error('Erro ao excluir ficha:', error);
              Alert.alert('Erro', 'Não foi possível excluir a ficha');
            }
          }
        }
      ]
    );
  };

  const handleEditFicha = (ficha: FichaComAluno) => {
    navigation.navigate('CreateWorkoutPlan', {
      alunoId: ficha.aluno_id.toString(),
      alunoNome: ficha.alunoNome,
      fichaId: ficha.id.toString(),
      modo: 'editar'
    });
  };

  const filtrarFichas = () => {
    let fichasFiltradas = [...fichas];

    if (busca) {
      fichasFiltradas = fichasFiltradas.filter((ficha) =>
        ficha.alunoNome.toLowerCase().includes(busca.toLowerCase())
      );
    }

    fichasFiltradas.sort((a, b) => {
      if (ordenacao === 'nome') {
        return a.alunoNome.localeCompare(b.alunoNome);
      }
      return 0;
    });

    return fichasFiltradas;
  };

  const renderFicha = ({ item }: { item: FichaComAluno }) => (
    <TouchableOpacity style={styles.alunoCard}>
      <View style={styles.alunoHeader}>
        <View>
          <Text style={styles.alunoNome}>{item.alunoNome}</Text>
          <Text style={styles.fichaInfo}>
            Início: {formatarData(item.data_inicio)} - Fim: {formatarData(item.data_fim)}
          </Text>
        </View>
      </View>

      <View style={styles.acoesContainer}>
        <TouchableOpacity
          style={[styles.acaoButton, { backgroundColor: '#44BF86' }]}
          onPress={() =>
            navigation.navigate('CreateWorkoutPlan', {
              alunoId: item.aluno_id.toString(),
              alunoNome: item.alunoNome,
              modo: 'criar'
            })
          }
        >
          <Feather name="file-plus" size={20} color="#fff" />
          <Text style={styles.acaoButtonText}>Nova Ficha</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.acaoButton, { backgroundColor: '#00908E' }]}
          onPress={() => handleEditFicha(item)}
        >
          <Feather name="edit-3" size={20} color="#fff" />
          <Text style={styles.acaoButtonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.acaoButton, { backgroundColor: '#FF6B6B' }]}
          onPress={() => handleDeleteFicha(item.id)}
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
          <Text style={styles.title}>Fichas de Treino</Text>
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
          data={filtrarFichas()}
          renderItem={renderFicha}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listaContainer}
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
        />

        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => navigation.navigate('CreateWorkoutPlan', {
            alunoId: '',
            alunoNome: '',
            modo: 'criar'
          })}
        >
          <Feather name="file-plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}
