import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet
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

type RootStackParamList = {
  CreateWorkoutPlan: {
    alunoId: string;
    alunoNome: string;
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CreateWorkoutPlan'>;
type RoutePropType = RouteProp<RootStackParamList, 'CreateWorkoutPlan'>;

interface Exercicio {
  nome: string;
  series: string;
  repeticoes: string;
  peso: string;
  descanso: string;
}

interface GrupoTreino {
  letra: string;
  nome: string;
  foco: string;
  exercicios: Exercicio[];
}

interface FichaTreino {
  nomeAluno: string;
  objetivo: string;
  dataInicial: string;
  dataFinal: string;
  grupos: GrupoTreino[];
}

const mascaraData = (valor: string) => {
  // Remove tudo que não for número
  const apenasNumeros = valor.replace(/\D/g, '');
  
  // Aplica a máscara DD/MM/AAAA
  let dataFormatada = apenasNumeros;
  if (apenasNumeros.length > 0) {
    // Adiciona a primeira barra após o dia
    if (apenasNumeros.length > 2) {
      dataFormatada = `${apenasNumeros.substring(0, 2)}/${apenasNumeros.substring(2)}`;
    }
    // Adiciona a segunda barra após o mês
    if (apenasNumeros.length > 4) {
      dataFormatada = `${dataFormatada.substring(0, 5)}/${apenasNumeros.substring(4, 8)}`;
    }
  }
  
  return dataFormatada;
};

export function CreateWorkoutPlan() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { alunoId, alunoNome } = route.params;


  const handleCriar = () => {
    const alunoId = '33zVVTB7QkRrgwq7YJBQw77kmc62'; // Use o ID do aluno real
    const nomeFicha = 'Ficha A';
    const nomeTreino = 'Treino A';
    const diasSemana = ['segunda', 'quinta'];

    const exercicios = [
      {
        nome: 'Supino Reto',
        series: 4,
        repeticoes: 12,
        carga: 60,
        ordem: 1,
      },
      {
        nome: 'Rosca Direta',
        series: 3,
        repeticoes: 10,
        carga: 15,
        ordem: 2,
      },
    ];

    criarFichaDeTreino(alunoId, nomeFicha, nomeTreino, diasSemana, exercicios);
  };

  const getNextGroupLetter = (currentGroups: GrupoTreino[]) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const usedLetters = currentGroups.map(group => group.letra);
    return letters.split('').find(letter => !usedLetters.includes(letter)) || 'A';
  };

  const valoresIniciais: FichaTreino = {
    nomeAluno: alunoNome,
    objetivo: '',
    dataInicial: '',
    dataFinal: '',
    grupos: [
      {
        letra: 'A',
        nome: '',
        foco: '',
        exercicios: [
          {
            nome: '',
            series: '',
            repeticoes: '',
            peso: '',
            descanso: ''
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

      <View style={styles.exerciseDetailsRow}>
        <View style={styles.inputHalf}>
          <Text style={styles.label}>Séries</Text>
          <TextInput
            style={styles.smallInput}
            onChangeText={handleChange(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.series`)}
            onBlur={handleBlur(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.series`)}
            value={exercicio.series}
            placeholder="Nº"
            keyboardType="numeric"
            placeholderTextColor={Colors.bordas}
          />
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>Repetições</Text>
          <TextInput
            style={styles.smallInput}
            onChangeText={handleChange(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.repeticoes`)}
            onBlur={handleBlur(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.repeticoes`)}
            value={exercicio.repeticoes}
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
            onChangeText={handleChange(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.peso`)}
            onBlur={handleBlur(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.peso`)}
            value={exercicio.peso}
            placeholder="0.0"
            keyboardType="numeric"
            placeholderTextColor={Colors.bordas}
          />
        </View>

        <View style={styles.inputHalf}>
          <Text style={styles.label}>Descanso (seg)</Text>
          <TextInput
            style={styles.smallInput}
            onChangeText={handleChange(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.descanso`)}
            onBlur={handleBlur(`grupos.${grupoIndex}.exercicios.${exercicioIndex}.descanso`)}
            value={exercicio.descanso}
            placeholder="60"
            keyboardType="numeric"
            placeholderTextColor={Colors.bordas}
          />
        </View>
      </View>
    </View>
  );

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
            onSubmit={(values) => {
              console.log({ ...values, alunoId });
              navigation.goBack();
            }}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue
            }) => (
              <View style={styles.form}>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Informações Gerais</Text>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nome do Aluno</Text>
                    <TextInput
                      style={[styles.input, { backgroundColor: Colors.fundo }]}
                      value={values.nomeAluno}
                      editable={false}
                    />
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Objetivo</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      onChangeText={handleChange('objetivo')}
                      onBlur={handleBlur('objetivo')}
                      value={values.objetivo}
                      placeholder="Digite o objetivo do treino"
                      placeholderTextColor={Colors.bordas}
                      multiline
                      numberOfLines={3}
                      textAlignVertical="top"
                    />
                    {touched.objetivo && errors.objetivo && (
                      <Text style={styles.errorText}>{errors.objetivo}</Text>
                    )}
                  </View>

                  <View style={styles.dateContainer}>
                    <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
                      <Text style={styles.label}>Data Inicial</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={(valor) => {
                          const dataFormatada = mascaraData(valor);
                          setFieldValue('dataInicial', dataFormatada);
                        }}
                        onBlur={handleBlur('dataInicial')}
                        value={values.dataInicial}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor={Colors.bordas}
                        maxLength={10}
                        keyboardType="numeric"
                      />
                      {touched.dataInicial && errors.dataInicial && (
                        <Text style={styles.errorText}>{errors.dataInicial}</Text>
                      )}
                    </View>

                    <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
                      <Text style={styles.label}>Data Final</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={(valor) => {
                          const dataFormatada = mascaraData(valor);
                          setFieldValue('dataFinal', dataFormatada);
                        }}
                        onBlur={handleBlur('dataFinal')}
                        value={values.dataFinal}
                        placeholder="DD/MM/AAAA"
                        placeholderTextColor={Colors.bordas}
                        maxLength={10}
                        keyboardType="numeric"
                      />
                      {touched.dataFinal && errors.dataFinal && (
                        <Text style={styles.errorText}>{errors.dataFinal}</Text>
                      )}
                    </View>
                  </View>
                </View>

                {values.grupos.map((grupo, grupoIndex) => (
                  <View key={grupoIndex} style={styles.groupSection}>
                    <View style={styles.groupHeader}>
                      <Text style={styles.groupTitle}>Grupo {grupo.letra}</Text>
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
                            series: '',
                            repeticoes: '',
                            peso: '',
                            descanso: ''
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
                        letra: getNextGroupLetter(values.grupos),
                        nome: '',
                        foco: '',
                        exercicios: [
                          {
                            nome: '',
                            series: '',
                            repeticoes: '',
                            peso: '',
                            descanso: ''
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
                  onPress={() => handleCriar()}
                >
                  <Text style={styles.submitButtonText}>Salvar Ficha de Treino</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}