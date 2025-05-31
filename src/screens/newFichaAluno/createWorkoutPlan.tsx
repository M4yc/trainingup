import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput
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

type RootStackParamList = {
  CreateWorkoutPlan: {
    alunoId: string;
    alunoNome: string;
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
  const personalService = usePersonalService();
  const fichaTreinoService = FichaTreinoService();

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
  const valoresIniciais: FichaTreino = {
    id: 0,
    aluno_id: 0,
    personal_id: 0,
    data_inicio: '',
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
    console.log('Iniciando salvarFicha...');
    try {
      // 1. Criar a ficha de treino
      const fichaInput: FichaTreinoInput = {
        aluno_id: Number(selectedAlunoId),
        personal_id: 1, // Você pode ajustar isso conforme necessário
        data_inicio: values.data_inicio,
        data_fim: values.data_fim
      };

      console.log('Dados da ficha:', fichaInput);
      const fichaId = await fichaTreinoService.inserirFichaTreino(fichaInput);
      console.log('ID da ficha criada:', fichaId);
      
      if (fichaId) {
        // 2. Inserir os grupos
        for (const grupo of values.grupos) {
          const grupoInput: GrupoTreinoInput = {
            ficha_id: fichaId,
            nome: grupo.nome,
            foco: grupo.foco
          };

          console.log('Dados do grupo:', grupoInput);
          const grupoId = await fichaTreinoService.inserirGrupo(grupoInput);
          console.log('ID do grupo criado:', grupoId);
        
          if (grupoId) {
            // 3. Inserir os exercícios do grupo
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

              console.log('Dados do exercício:', exercicioInput);
              const exercicioId = await fichaTreinoService.inserirExercicio(exercicioInput);
              console.log('ID do exercício criado:', exercicioId);
            }
          }
        }
        return true;
      }
      return false;
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
          <Text style={styles.headerTitle}>Nova Ficha de Treino</Text>
        </View>

        <ScrollView style={styles.content}>
          <Formik
            initialValues={valoresIniciais}
            validationSchema={fichaTreinoSchema}
            onSubmit={
              async (values, { setSubmitting }) => {
                console.log('Iniciando salvamento da ficha...');
                console.log('Valores do formulário:', values);
                console.log('Aluno selecionado:', selectedAlunoId);
                
                try {
                  if (!selectedAlunoId) {
                    console.error('❌ Nenhum aluno selecionado');
                    return;
                  }

                  const sucesso = await salvarFicha(values);
                  console.log('Resultado do salvamento:', sucesso);
                  
                  if (sucesso) {
                    console.log('✅ Ficha criada com sucesso!');
                    navigation.goBack();
                  } else {
                    console.error('❌ Erro ao criar ficha');
                  }
                } catch(error) {
                  console.error('❌ Erro ao criar ficha:', error);
                } finally {
                  setSubmitting(false);
                }
              }
            }
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
            }) => (
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
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}