/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, Text, TextInput, Image, Alert } from 'react-native';

import Button from '@components//button';
import Layout from '@components/layout';
import Colors from '@constants/colors';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { loginSchema } from '@validations/schemas';

import { RootStackParamList } from 'src/routes/types';
import { auth, db } from '../../config/FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

import styles from './style';
import AppStack from '@/src/routes/AppStack';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import PersonalStack from '@/src/routes/PersonalStack';

type FormData = {
  email: string;
  password: string;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const LoginScreen = () => {

  const navigation = useNavigation<LoginScreenNavigationProp>();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema) // Integra Yup com React Hook Form
  });

  const onSubmit = async (data: FormData) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      const docRef = doc(db, "usuarios", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const tipo = docSnap.data().tipo;
        console.log("Usuário logado como:", tipo);

        // Redirecione com base no tipo
        if (tipo === "Personal") {
          navigation.navigate('PersonalStack');
        } else {
          navigation.navigate('AlunoStack');
        }
      } else {
        Alert.alert('Erro', 'Dados do usuário não encontrados');
      }
      
    } catch (error: any) {
      console.error('Erro no login:', error);
      Alert.alert('Erro', error.message || 'Erro ao fazer login');
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
              Esquecu a senha?
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
