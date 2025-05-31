import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView
} from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { setDoc, doc, collection, getDocs, query, where, getFirestore } from 'firebase/firestore';

import IconApp from '@assets/Icon_app.png';
import Button from '@components/button';
import Layout from '@components/layout';
import { registerSchema } from '@validations/schemas';
import { RootStackParamList } from 'src/routes/types';
import { auth, db } from '../../config/FirebaseConfig';

import styles from './style';
import { Select } from '@/src/components/select';
import { Ionicons } from '@expo/vector-icons';
import { useUserDatabase } from '@/src/database/useUserDatabase';
import { string } from 'yup';

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
  const [step, setStep] = useState(1);
  const [tipo, setUserType] = useState<'Aluno' | 'Personal'>('Aluno');
  const [personals, setPersonals] = useState<any[]>([]);
  const [selectedPersonalId, setSelectedPersonalId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [usuarios, setUsuarios] = useState<any[]>([]);

  useEffect(() => {
    const setup = async () => {
      try {
        const response = await userDatabase.getAllPersonal()
        const lista = response;
        console.log("👥 Personal encontrados:", lista);
        setPersonals(lista);
      }catch(error){
        console.log(error)
      }
    };

    setup();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema)
  });

  const userDatabase = useUserDatabase()

  async function create(data: FormData){
    const { name, email, password} = data;
    const personalid = selectedPersonalId;
    try {
      // Verifica se o email já existe
      const emailExists = await userDatabase.checkEmailExists(email);
      if (emailExists) {
        Alert.alert("Erro", "Este email já está cadastrado");
        return;
      }

      const response = await userDatabase.create({name, email, password, tipo, personalid: Number(personalid)})
      Alert.alert("Sucesso", "Usuário cadastrado com sucesso!");
      navigation.navigate('Login');
    } catch (error: any) {
      console.log(error);
      Alert.alert("Erro", error.message || "Erro ao cadastrar usuário");
    }
  }

  const onSubmit = async (data: FormData) => {
    try {
      if (tipo === 'Aluno' && !selectedPersonalId) {
        Alert.alert('Atenção', 'Selecione um personal para continuar.');
        return;
      }

      setIsLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      const user = userCredential.user;

      await setDoc(doc(db, 'usuarios', user.uid), {
        name: data.name,
        email: data.email,
        tipo: tipo,
        personalId: tipo === 'Aluno' ? selectedPersonalId : null,
        createdAt: new Date()
      });

      await signOut(auth);
      Alert.alert('Sucesso', 'Cadastro realizado com sucesso! Por favor, faça login.');
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Erro ao realizar cadastro');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.content}>
          {step == 2 &&(<TouchableOpacity onPress={() => setStep(1)} style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', top: 0, left: 0}}>
            <Ionicons name='chevron-back' color={'#4be381'} size={24}/>
            <Text style={styles.loginLinkText}>Voltar</Text>
          </TouchableOpacity>)}
          
          <Image source={IconApp} style={{ width: 150, height: 150 }} />
          
          <View style={{ width: '100%', gap: 20 }}>
            {step === 1 && (
              <>
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
                  {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}
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
                  {errors.email && <Text style={styles.errorText}>{errors.email.message}</Text>}
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
                    <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
                  )}
                </View>

                <View style={styles.userTypeContainer}>
                  <TouchableOpacity
                    style={[
                      styles.userTypeButton,
                      tipo === 'Aluno' && styles.userTypeButtonActive
                    ]}
                    onPress={() => setUserType('Aluno')}
                  >
                    <Text
                      style={[
                        styles.userTypeText,
                        tipo === 'Aluno' && styles.userTypeTextActive
                      ]}
                    >
                      Aluno
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.userTypeButton,
                      tipo === 'Personal' && styles.userTypeButtonActive
                    ]}
                    onPress={() => setUserType('Personal')}
                  >
                    <Text
                      style={[
                        styles.userTypeText,
                        tipo === 'Personal' && styles.userTypeTextActive
                      ]}
                    >
                      Personal
                    </Text>
                  </TouchableOpacity>
                </View>

                <Button
                  text={tipo === 'Aluno' ? 'Próximo' : isLoading ? 'Cadastrando...' : 'Cadastrar'}
                  onPress={
                    tipo === 'Aluno'
                      ? () => setStep(2)
                      : handleSubmit(create)
                  }
                  style={{ opacity: isLoading ? 0.7 : 1 }}
                />
              </>
            )}

            {step === 2 && tipo === 'Aluno' && (
              <>
                <Text style={{color: '#fff'}}>Escolha seu Personal</Text>
                {personals.length === 0 ? (
                  <Text style={{ textAlign: 'center', color: '#999' }}>
                    Carregando personais...
                  </Text>
                ) : (
                  <Select
                    value={selectedPersonalId ?? ''}
                    onChange={setSelectedPersonalId}
                    options={personals.map((personal) => ({
                      label: personal.name,
                      value: personal.id
                    }))}
                    placeholder="Selecione um personal"
                  />
                )}
                {usuarios.map(user => (
                  <Text key={user.id}>{user.name}</Text>
                ))}

                <Button
                  text={isLoading ? 'Cadastrando...' : 'Finalizar Cadastro'}
                  onPress={handleSubmit(create)}
                  disabled={!selectedPersonalId || isLoading}
                />
              </>
            )}

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
      </ScrollView>
    </Layout>
  );
};

export default RegisterScreen;