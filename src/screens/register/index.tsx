import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert
} from 'react-native';

import IconApp from '@assets/Icon_app.png';
import Button from '@components/button';
import Layout from '@components/layout';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { registerSchema } from '@validations/schemas';
import { useAuth } from 'src/contexts/Auth';
import { RootStackParamList } from 'src/routes/types';

import styles from './style';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type RegisterScreenNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;

const RegisterScreen = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const [userType, setUserType] = useState<'aluno' | 'personal'>('aluno');
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      //await registrarUsuario(data.email, data.password, data.name, userType);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao realizar cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image source={IconApp} style={{ width: 150, height: 150 }} />

          <View style={{ width: '100%', gap: 20 }}>
            <View>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Nome completo"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name.message}</Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="E-mail"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email.message}</Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Senha"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text style={styles.errorText}>{errors.password.message}</Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                name="confirmPassword"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Confirmar senha"
                    style={styles.input}
                    placeholderTextColor="#aaa"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />
              {errors.confirmPassword && (
                <Text style={styles.errorText}>
                  {errors.confirmPassword.message}
                </Text>
              )}
            </View>

            <View style={styles.userTypeContainer}>
              <TouchableOpacity
                style={[
                  styles.userTypeButton,
                  userType === 'aluno' && styles.userTypeButtonActive
                ]}
                onPress={() => setUserType('aluno')}
              >
                <Text
                  style={[
                    styles.userTypeText,
                    userType === 'aluno' && styles.userTypeTextActive
                  ]}
                >
                  Aluno
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.userTypeButton,
                  userType === 'personal' && styles.userTypeButtonActive
                ]}
                onPress={() => setUserType('personal')}
              >
                <Text
                  style={[
                    styles.userTypeText,
                    userType === 'personal' && styles.userTypeTextActive
                  ]}
                >
                  Personal
                </Text>
              </TouchableOpacity>
            </View>

            <Button
              text={isLoading ? 'Cadastrando...' : 'Cadastrar'}
              onPress={handleSubmit(onSubmit)}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            />

            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => navigation.goBack()}
              disabled={isLoading}
            >
              <Text
                style={[styles.loginLinkText, { opacity: isLoading ? 0.7 : 1 }]}
              >
                Já tem uma conta? Faça login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default RegisterScreen;
