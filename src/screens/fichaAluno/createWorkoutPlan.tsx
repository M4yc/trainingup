import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputFocusEventData
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@constants/colors';
import { Feather } from '@expo/vector-icons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { fichaTreinoSchema } from '@validations/schemas';
import { Formik, FormikHelpers, FormikProps } from 'formik';

import { styles } from './styles';

type RootStackParamList = {
  CreateWorkoutPlan: {
    alunoId: string;
    alunoNome: string;
  };
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CreateWorkoutPlan'
>;
type RoutePropType = RouteProp<RootStackParamList, 'CreateWorkoutPlan'>;

interface Exercicio {
  nome: string;
  series: string;
  repeticoes: string;
  peso: string;
  descanso: string;
}

interface FichaTreino {
  nomeAluno: string;
  objetivo: string;
  dataInicial: string;
  dataFinal: string;
  exercicios: Exercicio[];
}

export function CreateWorkoutPlan() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RoutePropType>();
  const { alunoId, alunoNome } = route.params;

  const valoresIniciais: FichaTreino = {
    nomeAluno: alunoNome,
    objetivo: '',
    dataInicial: '',
    dataFinal: '',
    exercicios: [
      {
        nome: '',
        series: '',
        repeticoes: '',
        peso: '',
        descanso: ''
      }
    ]
  };

  const handleSubmit = (
    valores: FichaTreino,
    helpers: FormikHelpers<FichaTreino>
  ) => {
    console.log({ ...valores, alunoId });
    // Aqui você implementará a lógica para salvar a ficha de treino
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nova Ficha de Treino</Text>
        </View>

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <Formik
            initialValues={valoresIniciais}
            validationSchema={fichaTreinoSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue
            }: FormikProps<FichaTreino>) => (
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Nome do Aluno</Text>
                  <TextInput
                    style={[
                      styles.input,
                      { backgroundColor: Colors.auxiliar2 }
                    ]}
                    value={values.nomeAluno}
                    editable={false}
                  />
                </View>

                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Objetivo</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={handleChange('objetivo')}
                    onBlur={(
                      e: NativeSyntheticEvent<TextInputFocusEventData>
                    ) => handleBlur('objetivo')(e)}
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
                  <View
                    style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}
                  >
                    <Text style={styles.label}>Data Inicial</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('dataInicial')}
                      onBlur={(
                        e: NativeSyntheticEvent<TextInputFocusEventData>
                      ) => handleBlur('dataInicial')(e)}
                      value={values.dataInicial}
                      placeholder="DD/MM/AAAA"
                      placeholderTextColor={Colors.bordas}
                    />
                    {touched.dataInicial && errors.dataInicial && (
                      <Text style={styles.errorText}>{errors.dataInicial}</Text>
                    )}
                  </View>

                  <View
                    style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}
                  >
                    <Text style={styles.label}>Data Final</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={handleChange('dataFinal')}
                      onBlur={(
                        e: NativeSyntheticEvent<TextInputFocusEventData>
                      ) => handleBlur('dataFinal')(e)}
                      value={values.dataFinal}
                      placeholder="DD/MM/AAAA"
                      placeholderTextColor={Colors.bordas}
                    />
                    {touched.dataFinal && errors.dataFinal && (
                      <Text style={styles.errorText}>{errors.dataFinal}</Text>
                    )}
                  </View>
                </View>

                <Text style={styles.sectionTitle}>Exercícios</Text>
                {values.exercicios.map(
                  (exercicio: Exercicio, index: number) => (
                    <View key={index} style={styles.exerciseContainer}>
                      <Text style={styles.exerciseTitle}>
                        Exercício {index + 1}
                      </Text>

                      <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome do Exercício</Text>
                        <TextInput
                          style={styles.input}
                          onChangeText={handleChange(
                            `exercicios.${index}.nome`
                          )}
                          onBlur={(
                            e: NativeSyntheticEvent<TextInputFocusEventData>
                          ) => handleBlur(`exercicios.${index}.nome`)(e)}
                          value={exercicio.nome}
                          placeholder="Digite o nome do exercício"
                          placeholderTextColor={Colors.bordas}
                        />
                      </View>

                      <View style={styles.exerciseDetailsContainer}>
                        <View
                          style={[
                            styles.inputContainer,
                            { flex: 1, marginRight: 8 }
                          ]}
                        >
                          <Text style={styles.label}>Séries</Text>
                          <TextInput
                            style={styles.input}
                            onChangeText={handleChange(
                              `exercicios.${index}.series`
                            )}
                            onBlur={(
                              e: NativeSyntheticEvent<TextInputFocusEventData>
                            ) => handleBlur(`exercicios.${index}.series`)(e)}
                            value={exercicio.series}
                            placeholder="Nº séries"
                            placeholderTextColor={Colors.bordas}
                            keyboardType="numeric"
                          />
                        </View>

                        <View
                          style={[
                            styles.inputContainer,
                            { flex: 1, marginLeft: 8 }
                          ]}
                        >
                          <Text style={styles.label}>Repetições</Text>
                          <TextInput
                            style={styles.input}
                            onChangeText={handleChange(
                              `exercicios.${index}.repeticoes`
                            )}
                            onBlur={(
                              e: NativeSyntheticEvent<TextInputFocusEventData>
                            ) =>
                              handleBlur(`exercicios.${index}.repeticoes`)(e)
                            }
                            value={exercicio.repeticoes}
                            placeholder="Nº reps"
                            placeholderTextColor={Colors.bordas}
                            keyboardType="numeric"
                          />
                        </View>
                      </View>

                      <View style={styles.exerciseDetailsContainer}>
                        <View
                          style={[
                            styles.inputContainer,
                            { flex: 1, marginRight: 8 }
                          ]}
                        >
                          <Text style={styles.label}>Peso (kg)</Text>
                          <TextInput
                            style={styles.input}
                            onChangeText={handleChange(
                              `exercicios.${index}.peso`
                            )}
                            onBlur={(
                              e: NativeSyntheticEvent<TextInputFocusEventData>
                            ) => handleBlur(`exercicios.${index}.peso`)(e)}
                            value={exercicio.peso}
                            placeholder="Peso"
                            placeholderTextColor={Colors.bordas}
                            keyboardType="numeric"
                          />
                        </View>

                        <View
                          style={[
                            styles.inputContainer,
                            { flex: 1, marginLeft: 8 }
                          ]}
                        >
                          <Text style={styles.label}>Descanso (seg)</Text>
                          <TextInput
                            style={styles.input}
                            onChangeText={handleChange(
                              `exercicios.${index}.descanso`
                            )}
                            onBlur={(
                              e: NativeSyntheticEvent<TextInputFocusEventData>
                            ) => handleBlur(`exercicios.${index}.descanso`)(e)}
                            value={exercicio.descanso}
                            placeholder="Tempo"
                            placeholderTextColor={Colors.bordas}
                            keyboardType="numeric"
                          />
                        </View>
                      </View>
                    </View>
                  )
                )}

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => {
                    const novosExercicios = [
                      ...values.exercicios,
                      {
                        nome: '',
                        series: '',
                        repeticoes: '',
                        peso: '',
                        descanso: ''
                      }
                    ];
                    setFieldValue('exercicios', novosExercicios);
                  }}
                >
                  <Text style={styles.addButtonText}>Adicionar Exercício</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={() => handleSubmit()}
                >
                  <Text style={styles.submitButtonText}>
                    Salvar Ficha de Treino
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
