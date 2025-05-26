import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as Yup from 'yup';

import Layout from '../../components/layout';
import { styles } from './styles';

interface NovoAlunoForm {
  nome: string;
  email: string;
  telefone: string;
  idade: string;
  objetivo: string;
  plano: 'Mensal' | 'Trimestral' | 'Semestral' | 'Anual';
  observacoes: string;
}

const validationSchema = Yup.object().shape({
  nome: Yup.string().required('Nome é obrigatório'),
  email: Yup.string().email('Email inválido').required('Email é obrigatório'),
  telefone: Yup.string().required('Telefone é obrigatório'),
  idade: Yup.string()
    .matches(/^\d+$/, 'Idade deve ser um número')
    .required('Idade é obrigatória'),
  objetivo: Yup.string().required('Objetivo é obrigatório'),
  plano: Yup.string()
    .oneOf(['Mensal', 'Trimestral', 'Semestral', 'Anual'])
    .required('Plano é obrigatório'),
  observacoes: Yup.string()
});

const initialValues: NovoAlunoForm = {
  nome: '',
  email: '',
  telefone: '',
  idade: '',
  objetivo: '',
  plano: 'Mensal',
  observacoes: ''
};

const NovoAluno = () => {
  const navigation = useNavigation();

  const handleSubmit = (values: NovoAlunoForm) => {
    console.log('Novo aluno:', values);
    // Aqui você implementaria a lógica para salvar o novo aluno
    navigation.goBack();
  };

  const RadioButton = ({
    selected,
    label,
    onPress
  }: {
    selected: boolean;
    label: string;
    onPress: () => void;
  }) => (
    <TouchableOpacity style={styles.radioButton} onPress={onPress}>
      <View style={styles.radio}>
        {selected && <View style={styles.radioSelected} />}
      </View>
      <Text style={styles.radioLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <Layout>
      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}
            >
              <Feather name="arrow-left" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.title}>Novo Aluno</Text>
          </View>

          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          >
            <ScrollView
              style={styles.content}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <TouchableOpacity
                activeOpacity={1}
                onPress={Keyboard.dismiss}
                style={{ flex: 1 }}
              >
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    setFieldValue,
                    values,
                    errors,
                    touched
                  }) => (
                    <View style={styles.form}>
                      <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                          Informações Básicas
                        </Text>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Nome Completo</Text>
                          <TextInput
                            style={styles.input}
                            onChangeText={handleChange('nome')}
                            onBlur={handleBlur('nome')}
                            value={values.nome}
                            placeholder="Digite o nome do aluno"
                            placeholderTextColor="#666666"
                          />
                          {touched.nome && errors.nome && (
                            <Text style={styles.errorText}>{errors.nome}</Text>
                          )}
                        </View>

                        <View style={styles.row}>
                          <View style={[styles.col, { flex: 2 }]}>
                            <View style={styles.inputContainer}>
                              <Text style={styles.label}>Email</Text>
                              <TextInput
                                style={styles.input}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                                placeholder="Digite o email"
                                placeholderTextColor="#666666"
                                keyboardType="email-address"
                                autoCapitalize="none"
                              />
                              {touched.email && errors.email && (
                                <Text style={styles.errorText}>
                                  {errors.email}
                                </Text>
                              )}
                            </View>
                          </View>
                          <View style={styles.col}>
                            <View style={styles.inputContainer}>
                              <Text style={styles.label}>Idade</Text>
                              <TextInput
                                style={styles.input}
                                onChangeText={handleChange('idade')}
                                onBlur={handleBlur('idade')}
                                value={values.idade}
                                placeholder="Idade"
                                placeholderTextColor="#666666"
                                keyboardType="number-pad"
                              />
                              {touched.idade && errors.idade && (
                                <Text style={styles.errorText}>
                                  {errors.idade}
                                </Text>
                              )}
                            </View>
                          </View>
                        </View>

                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Telefone</Text>
                          <TextInput
                            style={styles.input}
                            onChangeText={handleChange('telefone')}
                            onBlur={handleBlur('telefone')}
                            value={values.telefone}
                            placeholder="(00) 00000-0000"
                            placeholderTextColor="#666666"
                            keyboardType="phone-pad"
                          />
                          {touched.telefone && errors.telefone && (
                            <Text style={styles.errorText}>
                              {errors.telefone}
                            </Text>
                          )}
                        </View>
                      </View>

                      <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                          Detalhes do Plano
                        </Text>
                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Objetivo</Text>
                          <TextInput
                            style={[styles.input, { height: 80 }]}
                            onChangeText={handleChange('objetivo')}
                            onBlur={handleBlur('objetivo')}
                            value={values.objetivo}
                            placeholder="Descreva o objetivo do aluno"
                            placeholderTextColor="#666666"
                            multiline
                            numberOfLines={3}
                            textAlignVertical="top"
                          />
                          {touched.objetivo && errors.objetivo && (
                            <Text style={styles.errorText}>
                              {errors.objetivo}
                            </Text>
                          )}
                        </View>

                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Plano</Text>
                          <View style={styles.radioGroup}>
                            {['Mensal', 'Trimestral', 'Semestral', 'Anual'].map(
                              (plano) => (
                                <RadioButton
                                  key={plano}
                                  selected={values.plano === plano}
                                  label={plano}
                                  onPress={() => setFieldValue('plano', plano)}
                                />
                              )
                            )}
                          </View>
                          {touched.plano && errors.plano && (
                            <Text style={styles.errorText}>{errors.plano}</Text>
                          )}
                        </View>

                        <View style={styles.inputContainer}>
                          <Text style={styles.label}>Observações</Text>
                          <TextInput
                            style={[styles.input, { height: 100 }]}
                            onChangeText={handleChange('observacoes')}
                            onBlur={handleBlur('observacoes')}
                            value={values.observacoes}
                            placeholder="Observações adicionais"
                            placeholderTextColor="#666666"
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                          />
                        </View>
                      </View>

                      <TouchableOpacity
                        style={styles.submitButton}
                        onPress={() => handleSubmit()}
                      >
                        <Text style={styles.submitButtonText}>
                          Cadastrar Novo Aluno
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </Formik>
              </TouchableOpacity>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </SafeAreaView>
    </Layout>
  );
};

export default NovoAluno;
