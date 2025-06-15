import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import { FadeInUp } from 'react-native-reanimated';

import Layout from '@components/layout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from 'src/routes/types';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

import styles from './style';

import { FichaTreinoService } from '@/src/service/fichaTreinoServiceAluno';
import { useUserService, Usuario } from '@/src/service/userService';
import { getSession } from '@/src/service/session';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const FichaTreinoScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [loading, setLoading] = useState(true);
  const [fichas, setFichas] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [user, setUser] = useState<Usuario | null>(null);
  const fichaService = FichaTreinoService();
  const userService = useUserService();

  const rotateArrow = useSharedValue(0);

  const arrowStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotateArrow.value}deg` }]
    };
  });

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

  const getTotalExercicios = (ficha: any) => {
    if (!ficha?.grupos) return 0;

    return ficha.grupos.reduce((total: number, grupo: any) => {
      return total + (grupo.exercicios?.length || 0);
    }, 0);
  };

  const formatarData = (data: string) => {
    if (!data) return '';
    try {
      console.log('Data recebidapara formatação: ', data);
      if (data.includes('-')) {
        const [ano, mes, dia] = data.split('-');
        return '${dia}/${mes}/${ano}';
      }
      if (data.includes('/')) {
        return data;
      }
      return data;
    } catch (error) {
      console.error('Erro ao formatar data:', data, error);
      return data;
    }
  };

  const toggleExpand = (id: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    rotateArrow.value = withTiming(expandedId === id ? 0 : 180, {
      duration: 300
    });
    setExpandedId(expandedId === id ? null : id);
  };

  const abrirDetalheExercicio = (exercicio: any) => {
    navigation.navigate('TreinoDesc', { exercicio });
  };

  return (
    <Layout>
      <LinearGradient
        colors={['#2c2a37', '#211d28']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.title}>Fichas de Treino</Text>
        <Text style={styles.subtitle}>
          Selecione uma ficha de treino para abrir
        </Text>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {loading ? (
          <Text style={styles.loadingText}>Carregando fichas...</Text>
        ) : fichas.length === 0 ? (
          <Text style={styles.emptyText}>
            Nenhuma ficha de treino encontrada
          </Text>
        ) : (
          fichas.map((ficha) => {
            const isExpanded = ficha.id === expandedId;

            return (
              <View key={ficha.id} style={styles.card}>
                <TouchableOpacity onPress={() => toggleExpand(ficha.id)}>
                  <View style={styles.cardHeader}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.cardTitle}>Ficha de treino</Text>
                      <View
                        style={{
                          flexDirection: 'row',
                          gap: 10,
                          marginTop: 4,
                          justifyContent: 'space-between'
                        }}
                      >
                        <Text style={styles.cardSubtitle}>
                          📅 {formatarData(ficha.data_inicio)} -{' '}
                          {formatarData(ficha.data_fim)}
                        </Text>
                        <Text style={styles.cardSubtitle}>
                          🏋️‍♂️ {getTotalExercicios(ficha)} exercícios
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>

                <View style={{ alignItems: 'center', marginTop: 8 }}>
                  <Animated.View style={arrowStyle}>
                    <MaterialIcons
                      name={isExpanded ? 'expand-less' : 'expand-more'}
                      size={28}
                      color="#44BF86"
                    />
                  </Animated.View>
                </View>

                {isExpanded && (
                  <View style={styles.cardContent}>
                    {ficha.grupos.map((grupo: any, idx: number) => (
                      <View key={idx} style={styles.group}>
                        <Text style={styles.groupTitle}>
                          {' '}
                          Ficha {grupo.nome} - musc
                        </Text>
                        {grupo.exercicios.map((ex: any, i: number) => (
                          <Animated.View
                            key={i}
                            entering={FadeInUp.duration(400).delay(i * 100)}
                          >
                            <TouchableOpacity
                              key={i}
                              style={styles.exerciseBlock}
                              onPress={() => abrirDetalheExercicio(ex)}
                            >
                              <Text style={styles.exerciseItem}>{ex.nome}</Text>

                              <View style={styles.exerciseInfoRow}>
                                <View style={styles.infoItem}>
                                  <MaterialIcons
                                    name="fitness-center"
                                    size={16}
                                    color="#ccc"
                                  />
                                  <Text style={styles.exerciseInfo}>
                                    Séries: {ex.series || '-'}
                                  </Text>
                                </View>
                                <View style={styles.infoItem}>
                                  <MaterialIcons
                                    name="repeat"
                                    size={16}
                                    color="#ccc"
                                  />
                                  <Text style={styles.exerciseInfo}>
                                    Reps: {ex.repeticoes || '-'}
                                  </Text>
                                </View>
                                <View style={styles.infoItem}>
                                  <MaterialIcons
                                    name="timer"
                                    size={16}
                                    color="#ccc"
                                  />
                                  <Text style={styles.exerciseInfo}>
                                    Interv: {ex.intervalo}s
                                  </Text>
                                </View>
                              </View>
                            </TouchableOpacity>
                          </Animated.View>
                        ))}
                      </View>
                    ))}
                  </View>
                )}
              </View>
            );
          })
        )}
      </ScrollView>
    </Layout>
  );
};

export default FichaTreinoScreen;
