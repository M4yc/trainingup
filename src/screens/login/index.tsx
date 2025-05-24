/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, Image } from 'react-native';

import Button from '@components//button';
import Layout from '@components/layout';
import Colors from '@constants/colors';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '@validations/schemas';
import { useAuth } from 'src/contexts/Auth';

import styles from './style';

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const { signIn } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema) // Integra Yup com React Hook Form
  });

  const onSubmit = async (data: FormData) => {
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };
  return (
    <Layout>
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
            source={require('../../assets/Icon_app.png')}
            style={{ width: 150, height: 150 }}
          />
          <View style={{ width: '100%', gap: 20 }}>
            <View>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Usuário"
                    style={styles.inputUser}
                    placeholderTextColor="#aaa"
                    value={value}
                    onChangeText={onChange}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                )}
              />
              {errors.email && (
                <Text style={{ color: 'red', marginTop: 4 }}>
                  {errors.email.message}
                </Text>
              )}
            </View>
            <View>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    placeholder="Senha"
                    style={styles.inputUser}
                    placeholderTextColor="#aaa"
                    value={value}
                    onChangeText={onChange}
                    secureTextEntry
                  />
                )}
              />
              {errors.password && (
                <Text style={{ color: 'red', marginTop: 4 }}>
                  {errors.password.message}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.containerEscSenha}>
            <Text onPress={() => null} style={styles.textEscSenha}>
              Esqueceu a senha?
            </Text>
          </View>

          <Button
            text="Entrar"
            onPress={handleSubmit(onSubmit)}
            width={220}
            style={{ marginBottom: 36 }}
          />

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={{ color: Colors.white }}>Não tem uma conta?</Text>
            <Text style={{ color: Colors.primary }} onPress={() => null}>
              Criar uma conta
            </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default LoginScreen;
