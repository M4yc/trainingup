import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';

import Input from '@components/input';
import Layout from '@components/layout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import { AppStackParamList } from 'src/routes/types';
import * as Yup from 'yup';

import styles from './style';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const validationSchema = Yup.object().shape({
  title: Yup.string().required('O título é obrigatório'),
  description: Yup.string()
});

interface FichaTreinoForm {
  title: string;
  description: string;
}

const NovaFichaTreinoScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleSubmit = (values: FichaTreinoForm) => {
    // TODO: Implementar a lógica de salvar a ficha
    console.log(values);
    navigation.goBack();
  };

  return (
    <Layout>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Nova Ficha de Treino</Text>
      </View>

      <Formik
        initialValues={{ title: '', description: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched
        }) => (
          <ScrollView style={styles.content}>
            <Input
              label="Título do Treino"
              placeholder="Ex: Segunda-Feira - Superior"
              value={values.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              error={touched.title && errors.title}
            />

            <Input
              label="Descrição (opcional)"
              placeholder="Adicione uma descrição para este treino"
              value={values.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              error={touched.description && errors.description}
              multiline
              numberOfLines={4}
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Criar Ficha de Treino</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </Formik>
    </Layout>
  );
};

export default NovaFichaTreinoScreen;
