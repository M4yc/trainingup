import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@constants/colors';
import { Feather } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { fichaTreinoSchema } from '@validations/schemas';
import { styles } from './styles';
import { criarFichaDeTreino } from '@/src/service/testService';
import { Select } from '@/src/components/select';
import { mascaraData } from '@/src/utils/maskUtils';

import { usePersonalService } from '@/src/database/personalService';
import { FichaTreinoService } from '@/src/service/fichaTreinoService';
import { useUserService, Usuario } from '@/src/service/userService';

type RootStackParamList = {
  CreateWorkoutPlan: {
    alunoId: string;
    alunoNome: string;
    fichaId?: string;
    modo: 'criar' | 'editar';
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateWorkoutPlan'>;
type RoutePropType = RouteProp<RootStackParamList, 'CreateWorkoutPlan'>;

interface FichaTreino {
  id?: number;
  aluno_id: number;
  personal_id: number;
  data_inicio: string;
  data_fim: string;
  grupos: GrupoTreino[];
}

interface FichaTreinoCompleta {
  ficha: FichaTreino;
  grupos: (GrupoTreino & { exercicios: Exercicio[] })[];
}

interface GrupoTreino {
  id?: number;
  ficha_id: number;
  nome: string;
  foco: string;
  exercicios: Exercicio[];
}

interface Exercicio {
  id?: number;
  grupo_id: number;
  nome: string;
  series: number;
  repeticoes: number;
  intervalo: string;
  peso: number;
  descricao?: string;
  imagem?: string;
}

interface FichaTreinoInput {
  aluno_id: number;
  personal_id: number;
  data_inicio: string;
  data_fim: string;
}

interface GrupoTreinoInput {
  ficha_id: number;
  nome: string;
  foco: string;
}

interface ExercicioInput {
  grupo_id: number;
  nome: string;
  series: number;
  repeticoes: number;
  intervalo: string;
  peso: number;
  descricao?: string;
  imagem?: string;
}

type Aluno = {
  id: number;
  name: string;  
};

export function CreateWorkoutPlan() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [selectedAlunoId, setSelectedAlunoId] = useState('');
  const [fichaExistente, setFichaExistente] = useState<FichaTreino | null>(null);
  const personalService = usePersonalService();
  const fichaTreinoService = FichaTreinoService();
  const dataAtual = new Date();
  const dataInicio = dataAtual.toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const userService = useUserService();
  const [user, setUser] = useState<Usuario | null>(null);
  
  useEffect(() => {
    const setup = async () => {
      try {
        const userData = await userService.getCurrentUser();
        setUser(userData);
        const alunos = await personalService.getAlunosPersonal(Number(userData?.id));
        setAlunos(alunos);

        // Se estiver no modo de edição, carrega a ficha existente
        if (route.params.fichaId && route.params.modo === 'editar') {
          // console.log('Carregando ficha para edição:', route.params.fichaId);
          const fichaCompleta = await fichaTreinoService.getFichaCompleta(Number(route.params.fichaId));
          // console.log('Ficha carregada:', JSON.stringify(fichaCompleta, null, 2));
          
          if (fichaCompleta) {
            // Formata as datas para o formato DD/MM/AAAA
            const dataInicio = fichaCompleta.ficha.data_inicio.split('-').reverse().join('/');
            const dataFim = fichaCompleta.ficha.data_fim.split('-').reverse().join('/');

            const fichaFormatada = {
              id: fichaCompleta.ficha.id,
              aluno_id: fichaCompleta.ficha.aluno_id,
              personal_id: fichaCompleta.ficha.personal_id,
              data_inicio: dataInicio,
              data_fim: dataFim,
              grupos: fichaCompleta.grupos.map(grupo => ({
                id: grupo.id,
                ficha_id: grupo.ficha_id,
                nome: grupo.nome || '',
                foco: grupo.foco || '',
                exercicios: grupo.exercicios.map(exercicio => ({
                  id: exercicio.id,
                  grupo_id: exercicio.grupo_id,
                  nome: exercicio.nome || '',
                  series: Number(exercicio.series) || 0,
                  repeticoes: Number(exercicio.repeticoes) || 0,
                  peso: Number(exercicio.peso) || 0,
                  intervalo: exercicio.intervalo || '',
                  descricao: exercicio.descricao || '',
                  imagem: exercicio.imagem || ''
                }))
              }))
            };

            // console.log('Ficha formatada para o formulário:', JSON.stringify(fichaFormatada, null, 2));
            setFichaExistente(fichaFormatada);
            setSelectedAlunoId(fichaCompleta.ficha.aluno_id.toString());
          }
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados da ficha');
      }
    };
  
    setup();
  }, []);

  const valoresIniciais: FichaTreino = fichaExistente || {
    id: 0,
    aluno_id: 0,
    personal_id: 0,
    data_inicio: dataInicio,
    data_fim: '',
    grupos: [
      {
        id: 0,
        ficha_id: 0,
        nome: '',
        foco: '',
        exercicios: [
          {
            id: 0,
            grupo_id: 0,
            nome: '',
            series: 0,
            repeticoes: 0,
            peso: 0,
            intervalo: ''
          }
        ]
      }
    ]
  };

  //console.log('Valores iniciais do formulário:', JSON.stringify(valoresIniciais, null, 2));

  const renderExercicio = (
    exercicio: Exercicio,
    grupoIndex: number,
    exercicioIndex: number,
    setFieldValue: any,
    handleChange: any,
    handleBlur: any,
    values: FichaTreino
  ) => (
    <View key={exercicioIndex} style={styles.exerciseCard}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseNumber}>Exercício {exercicioIndex + 1}</Text>
        {exercicioIndex > 0 && (
          <TouchableOpacity
            onPress={() => {
              const novosExercicios = values.grupos[grupoIndex].exercicios.filter(
                (_: Exercicio, index: number) => index !== exercicioIndex
              );
              setFieldValue(`grupos.${grupoIndex}.exercicios`, novosExercicios);
            }}
            style={styles.removeButton}
          >
            <Feather name="trash-2" size={20} color="#FF6B6B" />
          </TouchableOpacity>
        )}
      </View>
      
      <TextInput
        style={styles.input}
        onChangeText={handleChange(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.nome`)}
        onBlur={handleBlur(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.nome`)}
        value={exercicio.nome}
        placeholder="Nome do exercício"
        placeholderTextColor={Colors.bordas}
      />

      <TextInput
        style={styles.input}
        onChangeText={handleChange(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.descricao`)}
        onBlur={handleBlur(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.descricao`)}
        value={exercicio.descricao}
        placeholder="Descrição do exercício"
        placeholderTextColor={Colors.bordas}
      />

      <View style={styles.exerciseDetailsRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Séries</Text>
          <TextInput
            style={styles.smallInput}
            onChangeText={(valor) => {
              const numero = valor.replace(/\D/g, '');
              setFieldValue(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.series`, numero ? parseInt(numero) : '');
            }}
            onBlur={handleBlur(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.series`)}
            value={exercicio.series ? exercicio.series.toString() : ''}
            placeholder="Nº"
            keyboardType="numeric"
            placeholderTextColor={Colors.bordas}
          />
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>Repetições</Text>
          <TextInput
            style={styles.smallInput}
            onChangeText={(valor) => {
              const numero = valor.replace(/\D/g, '');
              setFieldValue(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.repeticoes`, numero ? parseInt(numero) : '');
            }}
            onBlur={handleBlur(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.repeticoes`)}
            value={exercicio.repeticoes ? exercicio.repeticoes.toString() : ''}
            placeholder="Nº"
            keyboardType="numeric"
            placeholderTextColor={Colors.bordas}
          />
        </View>
      </View>

      <View style={styles.exerciseDetailsRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Peso (kg)</Text>
          <TextInput
            style={styles.smallInput}
            onChangeText={(valor) => {
              const numero = valor.replace(/\D/g, '');
              setFieldValue(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.peso`, numero ? parseInt(numero) : '');
            }}
            onBlur={handleBlur(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.peso`)}
            value={exercicio.peso ? exercicio.peso.toString() : ''}
            placeholder="0"
            keyboardType="numeric"
            placeholderTextColor={Colors.bordas}
          />
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>Intervalo (seg)</Text>
          <TextInput
            style={styles.smallInput}
            onChangeText={(valor) => {
              const numero = valor.replace(/\D/g, '');
              setFieldValue(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.intervalo`, numero);
            }}
            onBlur={handleBlur(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.intervalo`)}
            value={exercicio.intervalo}
            placeholder="60"
            keyboardType="numeric"
            placeholderTextColor={Colors.bordas}
          />
        </View>
      </View>
    </View>
  );
  const salvarFicha = async (values: FichaTreino) => {
    try {
      if (route.params.modo === 'editar' && route.params.fichaId) {
        // Modo de edição
        const fichaId = Number(route.params.fichaId);
        
        // Converte as datas de volta para o formato YYYY-MM-DD
        const dataInicio = values.data_inicio.split('/').reverse().join('-');
        const dataFim = values.data_fim.split('/').reverse().join('-');
        
        // Atualiza a ficha
        await fichaTreinoService.editarFicha({
          id: fichaId,
          aluno_id: Number(selectedAlunoId),
          personal_id: 1,
          data_inicio: dataInicio,
          data_fim: dataFim
        });

        // Atualiza os grupos e exercícios
        for (const grupo of values.grupos) {
          if (grupo.id) {
            // Atualiza grupo existente
            await fichaTreinoService.editarGrupo({
              id: grupo.id,
              ficha_id: fichaId,
              nome: grupo.nome,
              foco: grupo.foco
            });

            // Atualiza exercícios existentes
            for (const exercicio of grupo.exercicios) {
              if (exercicio.id) {
                await fichaTreinoService.editarExercicio({
                  id: exercicio.id,
                  grupo_id: grupo.id,
                  nome: exercicio.nome,
                  series: Number(exercicio.series),
                  repeticoes: Number(exercicio.repeticoes),
                  intervalo: exercicio.intervalo,
                  peso: Number(exercicio.peso),
                  descricao: exercicio.descricao,
                  imagem: exercicio.imagem
                });
              } else {
                // Insere novo exercício
                await fichaTreinoService.inserirExercicio({
                  grupo_id: grupo.id,
                  nome: exercicio.nome,
                  series: Number(exercicio.series),
                  repeticoes: Number(exercicio.repeticoes),
                  intervalo: exercicio.intervalo,
                  peso: Number(exercicio.peso),
                  descricao: exercicio.descricao,
                  imagem: exercicio.imagem
                });
              }
            }
          } else {
            // Insere novo grupo
            const grupoId = await fichaTreinoService.inserirGrupo({
              ficha_id: fichaId,
              nome: grupo.nome,
              foco: grupo.foco
            });

            // Insere exercícios do novo grupo
            if (grupoId) {
              for (const exercicio of grupo.exercicios) {
                await fichaTreinoService.inserirExercicio({
                  grupo_id: grupoId,
                  nome: exercicio.nome,
                  series: Number(exercicio.series),
                  repeticoes: Number(exercicio.repeticoes),
                  intervalo: exercicio.intervalo,
                  peso: Number(exercicio.peso),
                  descricao: exercicio.descricao,
                  imagem: exercicio.imagem
                });
              }
            }
          }
        }
      } else {
        // Modo de criação (código existente)
        const fichaInput: FichaTreinoInput = {
          aluno_id: Number(selectedAlunoId),
          personal_id: 1,
          data_inicio: values.data_inicio,
          data_fim: values.data_fim
        };

        const fichaId = await fichaTreinoService.inserirFichaTreino(fichaInput);
        
        if (fichaId) {
          for (const grupo of values.grupos) {
            const grupoInput: GrupoTreinoInput = {
              ficha_id: fichaId,
              nome: grupo.nome,
              foco: grupo.foco
            };

            const grupoId = await fichaTreinoService.inserirGrupo(grupoInput);
          
            if (grupoId) {
              for (const exercicio of grupo.exercicios) {
                const exercicioInput: ExercicioInput = {
                  grupo_id: grupoId,
                  nome: exercicio.nome,
                  series: Number(exercicio.series),
                  repeticoes: Number(exercicio.repeticoes),
                  intervalo: exercicio.intervalo,
                  peso: Number(exercicio.peso),
                  descricao: exercicio.descricao,
                  imagem: exercicio.imagem
                };

                await fichaTreinoService.inserirExercicio(exercicioInput);
              }
            }
          }
        }
      }
      return true;
    } catch (error) {
      console.error('Erro ao salvar ficha:', error);
      return false;
    }
  }
  const verFicha = async () => {

    const fichas = await fichaTreinoService.getFichaCompleta(1);
    console.log('Fichas: ', fichas);
  }

  const formatarErro = (key: string, error: any): string => {
    if (typeof error === 'string') {
      return error;
    }
    
    if (Array.isArray(error)) {
      return error.map(e => formatarErro(key, e)).join(', ');
    }
    
    if (typeof error === 'object' && error !== null) {
      return Object.entries(error)
        .map(([subKey, subError]) => {
          const campo = subKey === 'nome' ? 'Nome' :
                       subKey === 'foco' ? 'Foco' :
                       subKey === 'exercicios' ? 'Exercícios' :
                       subKey === 'series' ? 'Séries' :
                       subKey === 'repeticoes' ? 'Repetições' :
                       subKey === 'peso' ? 'Peso' :
                       subKey === 'intervalo' ? 'Intervalo' :
                       subKey;
          
          return `${campo}: ${formatarErro(subKey, subError)}`;
        })
        .join(', ');
    }
    
    return String(error);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>
            {route.params.modo === 'editar' ? 'Editar Ficha de Treino' : 'Nova Ficha de Treino'}
          </Text>
        </View>

        <ScrollView style={styles.content}>
          <Formik
            enableReinitialize
            initialValues={valoresIniciais}
            validationSchema={fichaTreinoSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                if (!selectedAlunoId) {
                  Alert.alert('Erro', 'Selecione um aluno');
                  return;
                }

                const sucesso = await salvarFicha(values);
                
                if (sucesso) {
                  Alert.alert('Sucesso', 'Ficha salva com sucesso!');
                  navigation.goBack();
                } else {
                  Alert.alert('Erro', 'Não foi possível salvar a ficha');
                }
              } catch(error) {
                console.error('Erro ao salvar ficha:', error);
                Alert.alert('Erro', 'Ocorreu um erro ao salvar a ficha');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              values,
              errors,
              touched,
              setFieldValue,
              validateForm
            }) => {
              console.log('Valores atuais do formulário:', JSON.stringify(values, null, 2));
              return (
                <View style={styles.form}>
                  <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informações Gerais</Text>
                    
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Nome do Aluno</Text>
                      <Select
                        value={selectedAlunoId ?? ''}
                        onChange={setSelectedAlunoId}
                        options={alunos.map(aluno => ({
                          label: aluno.name,
                          value: aluno.id.toString()
                        }))}
                        placeholder="Selecione um Aluno"
                      />
                    </View>

                    <View style={styles.dateContainer}>
                      <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                        <Text style={styles.label}>Data Inicial</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={(valor) => {
                            const dataFormatada = mascaraData(valor);
                            setFieldValue('data_inicio', dataFormatada);
                          }}
                          onBlur={handleBlur('data_inicio')}
                          value={values.data_inicio}
                          placeholder="DD/MM/AAAA"
                          placeholderTextColor={Colors.bordas}
                          maxLength={10}
                          keyboardType="numeric"
                        />
                        {touched.data_inicio && errors.data_inicio && (
                          <Text style={styles.errorText}>{errors.data_inicio}</Text>
                        )}
                      </View>

                      <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                        <Text style={styles.label}>Data Final</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={(valor) => {
                            const dataFormatada = mascaraData(valor);
                            setFieldValue('data_fim', dataFormatada);
                          }}
                          onBlur={handleBlur('data_fim')}
                          value={values.data_fim}
                          placeholder="DD/MM/AAAA"
                          placeholderTextColor={Colors.bordas}
                          maxLength={10}
                          keyboardType="numeric"
                        />
                        {touched.data_fim && errors.data_fim && (
                          <Text style={styles.errorText}>{errors.data_fim}</Text>
                        )}
                      </View>
                    </View>
                  </View>

                  {values.grupos.map((grupo, grupoIndex) => (
                    <View key={grupoIndex} style={styles.groupSection}>
                      <View style={styles.groupHeader}>
                        
                        {grupoIndex > 0 && (
                          <TouchableOpacity
                            onPress={() => {
                              const newGroups = values.grupos.filter((_, index) => index !== grupoIndex);
                              setFieldValue('grupos', newGroups);
                            }}
                            style={styles.removeButton}
                          >
                            <Feather name="trash-2" size={20} color="#FF6B6B" />
                          </TouchableOpacity>
                        )}
                      </View>

                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange(`grupos.${grupoIndex}.nome`)}
                        onBlur={handleBlur(`grupos.${grupoIndex}.nome`)}
                        value={grupo.nome}
                        placeholder="Nome do grupo (ex: Peito e Tríceps)"
                        placeholderTextColor={Colors.bordas}
                      />

                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange(`grupos.${grupoIndex}.foco`)}
                        onBlur={handleBlur(`grupos.${grupoIndex}.foco`)}
                        value={grupo.foco}
                        placeholder="Foco do treino"
                        placeholderTextColor={Colors.bordas}
                      />

                      {grupo.exercicios.map((exercicio, exercicioIndex) =>
                        renderExercicio(
                          exercicio,
                          grupoIndex,
                          exercicioIndex,
                          setFieldValue,
                          handleChange,
                          handleBlur,
                          values
                        )
                      )}

                      <TouchableOpacity
                        style={styles.addButton}
                        onPress={() => {
                          const novosExercicios = [
                            ...grupo.exercicios,
                            {
                              nome: '',
                              series: 0,
                              repeticoes: 0,
                              peso: 0,
                              intervalo: ''
                            }
                          ];
                          setFieldValue(`grupos.${grupoIndex}.exercicios`, novosExercicios);
                        }}
                      >
                        <Feather name="plus-circle" size={20} color={Colors.primary} />
                        <Text style={styles.addButtonText}>Adicionar Exercício</Text>
                      </TouchableOpacity>
                    </View>
                  ))}

                  <TouchableOpacity
                    style={styles.addGroupButton}
                    onPress={() => {
                      const novosGrupos = [
                        ...values.grupos,
                        {
                          letra: 'A',
                          nome: '',
                          foco: '',
                          exercicios: [
                            {
                              nome: '',
                              series: 0,
                              repeticoes: 0,
                              peso: 0,
                              intervalo: ''
                            }
                          ]
                        }
                      ];
                      setFieldValue('grupos', novosGrupos);
                    }}
                  >
                    <Feather name="plus-circle" size={20} color={Colors.white} />
                    <Text style={styles.addGroupButtonText}>Adicionar Grupo</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={async () => {
                      console.log('Botão de submit pressionado');
                      const validationErrors = await validateForm();
                      console.log('Erros de validação:', validationErrors);
                      
                      if (Object.keys(validationErrors).length === 0) {
                        handleSubmit();
                      } else {
                        console.log('Formulário com erros:', validationErrors);
                      }
                    }}
                    disabled={isSubmitting}
                  >
                    <Text style={styles.submitButtonText}>
                      {isSubmitting ? 'Salvando...' : 'Salvar Ficha de Treino'}
                    </Text>
                  </TouchableOpacity>

                  {/* Mostrar erros de validação */}
                  {Object.keys(errors).length > 0 && (
                    <View style={styles.errorContainer}>
                      {Object.entries(errors).map(([key, error]) => (
                        <Text key={key} style={styles.errorText}>
                          {formatarErro(key, error)}
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              );
            }}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}