import React, {useEffect, useState} from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import Layout from '@components/layout';
import WorkoutCard from '@components/WorkoutCard';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from 'src/routes/types';

import styles from './style';
import { buscarFichasDoAluno } from '@/src/service/fichaService';
import { Ficha } from '@/src/types/types';
import { userService, Usuario } from '@/src/service/userService';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

// Dados mockados para exemplo
const mockWorkouts = [
  {
    id: '1',
    title: 'Segunda-Feira - Superior',
    exerciseCount: 8,
    lastUpdated: '15/03/2024'
  },
  {
    id: '2',
    title: 'Terça-Feira - Inferior',
    exerciseCount: 6,
    lastUpdated: '15/03/2024'
  }
];

const FichaTreinoScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await userService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  const [fichas, setFichas] = useState<Ficha[]>([]);

  const alunoId = user?.id; // ID real do aluno autenticado

  useEffect(() => {
    async function carregarFichas() {
      if (!alunoId) {
        console.warn("ID do aluno não está disponível ainda.");
        return;
      }
      try{
        const resultado = await buscarFichasDoAluno(alunoId);
        setFichas(resultado);
      } catch (error){
        console.error('❌ Erro ao buscar fichas:', error);
      }
      
    }

    carregarFichas();
  }, [alunoId]);

  return (
    <Layout>
      <View style={styles.header}>
        <Text style={styles.title}>Fichas de Treino</Text>
        <Text style={styles.subtitle}>Selecione uma ficha de treino para abrir</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {fichas.map((fichas) => (
          <WorkoutCard
            key={fichas.id}
            title={fichas.nome}
            exerciseCount={fichas.treinos.reduce((total, treino) => total + treino.exercicios.length, 0)}
            createDate={fichas.dataCriacao}
            
          />
        ))}
      </ScrollView>
      <ScrollView style={{ padding: 20 }}>
        {fichas.map(ficha => (
          <View key={ficha.id} style={{ marginBottom: 30, backgroundColor: '#fff' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{ficha.nome}</Text>
            <Text>{ficha.descricao}</Text>
            <Text style={{ fontStyle: 'italic' }}>Criada em: {ficha.dataCriacao}</Text>

            {ficha.treinos.map(treino => (
              <View key={treino.nome} style={{ marginTop: 10, paddingLeft: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>Treino: {treino.nome}</Text>
                <Text>Dias: {treino.diasSemana.join(', ')}</Text>
                {treino.exercicios.map((ex, index) => (
                  <Text key={index}>
                    {ex.ordem}. {ex.nome} - {ex.series}x{ex.repeticoes} ({ex.carga ?? 0} kg)
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ))}
    </ScrollView>
    </Layout>
  );
};

export default FichaTreinoScreen;
