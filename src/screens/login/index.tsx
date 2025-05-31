import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, Image, Alert, ActivityIndicator } from 'react-native';

import Button from '@components//button';
import Layout from '@components/layout';
import Colors from '@constants/colors';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loginSchema } from '@validations/schemas';

import { RootStackParamList } from 'src/routes/types';
import styles from './style';

import { useLoginDatabase } from '@/src/service/loginService';
import { saveSession } from '@/src/service/session';
import AsyncStorage from '@react-native-async-storage/async-storage';

type FormData = {
  email: string;
  password: string;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const userDatabase = useLoginDatabase();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const user = await userDatabase.login(data.email, data.password);

      if (user) {
        const sessionUser = {
          id: user.id,
          nome: user.name,
          tipo: user.tipo as 'Personal' | 'Aluno'
        };

        await saveSession(sessionUser);
        await AsyncStorage.setItem("userId", String(user.id));
        await AsyncStorage.setItem("userType", user.tipo);

        // Força a atualização do estado do Router
        if (user.tipo === "Personal") {
          navigation.reset({
            index: 0,
            routes: [{ name: 'PersonalRoutes' }],
          });
        } else if (user.tipo === "Aluno") {
          navigation.reset({
            index: 0,
            routes: [{ name: 'AlunoRoutes' }],
          });
        }
      } else {
        Alert.alert('Erro', 'Email ou senha inválidos');
      }
    } catch (error: any) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', error.message || 'Erro ao fazer login');
    } finally {
      setLoading(false);
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
                    editable={!loading}
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
                    editable={!loading}
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
            text={loading ? "Carregando..." : "Entrar"}
            onPress={handleSubmit(onSubmit)}
            width={220}
            style={{ marginBottom: 36 }}
            disabled={loading}
          />

          {loading && <ActivityIndicator color={Colors.primary} />}

          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Text style={{ color: Colors.white }}>Não tem uma conta?</Text>
            <Text
              style={{ color: Colors.primary }}
              onPress={() => navigation.navigate('Register')}
            >
              Criar uma conta
            </Text>
          </View>
        </View>
      </View>
    </Layout>
  );
};

export default LoginScreen;
