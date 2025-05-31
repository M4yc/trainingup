import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../routes/types';
import { useUserDatabase } from '../../database/useUserDatabase';
import { editProfileSchema } from '../../validations/schemas';
import Input from '../../components/input';
import Button from '../../components/button';
import styles from './style';

type FormData = {
  name: string;
  email: string;
};

type EditProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'EditProfile'>;

const EditProfileScreen = () => {
  const navigation = useNavigation<EditProfileScreenNavigationProp>();
  const route = useRoute();
  const { userId } = route.params as { userId: number };
  const [loading, setLoading] = useState(false);
  const userDatabase = useUserDatabase();

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(editProfileSchema)
  });

  useEffect(() => {
    loadUserData();
  }, []);

  async function loadUserData() {
    try {
      const user = await userDatabase.getUserById(userId);
      if (user) {
        setValue('name', user.name);
        setValue('email', user.email);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error);
      Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
    }
  }

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);
      await userDatabase.updateUser(userId, {
        name: data.name,
      });
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Editar Perfil</Text>
        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nome"
                placeholder="Nome"
                onChangeText={onChange}
                value={value}
                error={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                label="E-mail"
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                error={errors.email?.message}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={false}
              />
            )}
          />

          <View style={styles.buttonContainer}>
            <Button
              text="Salvar"
              onPress={handleSubmit(onSubmit)}
              disabled={loading}
            />
            {loading && <ActivityIndicator color="#fff" style={{ marginLeft: 10 }} />}
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditProfileScreen; 