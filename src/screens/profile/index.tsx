/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather, Ionicons } from '@expo/vector-icons';

import Layout from '../../components/layout';

import styles from './style';
import { useUserService, Usuario } from '@/src/service/userService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/routes/types';
import { clearSession, getSession } from '@/src/service/session';
import AsyncStorage from '@react-native-async-storage/async-storage';

type MenuItem = {
  icon: keyof typeof Feather.glyphMap;
  text: string;
  onPress: () => void;
};

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Profile = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);
  const userService = useUserService();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        
        const session = await getSession();
        if (!session) {
          // console.log("Nenhuma sessão encontrada");
          navigation.reset;
          return;
        }
        
        const userData = await userService.getCurrentUser();
        // console.log("Dados do usuário:", userData);
        
        setUser(userData);
      } catch (error) {
        console.error("Erro ao carregar dados do perfil:", error);
        Alert.alert("Erro", "Não foi possível carregar os dados do perfil");
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleSignOut = async () => {
    try {
      await clearSession();
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userType');
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      Alert.alert("Erro", "Não foi possível fazer logout");
    }
  };

  if (loading) {
    return (
      <Layout>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <ActivityIndicator size="large" color="#44BF86" />
        </View>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text style={{ color: '#fff' }}>Usuário não encontrado</Text>
          <TouchableOpacity 
            style={{ marginTop: 20, padding: 10, backgroundColor: '#44BF86', borderRadius: 5 }}
            onPress={handleSignOut}
          >
            <Text style={{ color: '#fff' }}>Voltar para o Login</Text>
          </TouchableOpacity>
        </View>
      </Layout>
    );
  }

  const menuItems: MenuItem[] = [
    {
      icon: 'user',
      text: 'Editar Perfil',
      onPress: () => navigation.navigate('EditProfile', { userId: user.id })
    },
    {
      icon: 'settings',
      text: 'Configurações',
      onPress: () => null
    },
    {
      icon: 'help-circle',
      text: 'Ajuda e Suporte',
      onPress: () => null
    }
  ];

  return (
    <Layout>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../assets/imgs/profile.png')}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editAvatarButton}>
                <Feather name="camera" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{user.name || 'Nome não definido'}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{user.tipo}</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Menu</Text>
            <View style={styles.menuSection}>
              {menuItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.menuItem,
                    index === menuItems.length - 1 && styles.menuItemLast
                  ]}
                  onPress={item.onPress}
                >
                  <View style={styles.menuIcon}>
                    <Feather name={item.icon} size={24} color="#44BF86" />
                  </View>
                  <Text style={styles.menuText}>{item.text}</Text>
                  <Feather
                    name="chevron-right"
                    size={20}
                    color="#FFFFFF"
                    style={styles.chevronIcon}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.menuSection}>
              <TouchableOpacity
                style={[styles.menuItem, styles.menuItemDanger]}
                onPress={handleSignOut}
              >
                <View style={styles.menuIcon}>
                  <Feather name="log-out" size={24} color="#FF6B6B" />
                </View>
                <Text style={[styles.menuText, styles.menuTextDanger]}>
                  Sair da Conta
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Layout>
  );
};

export default Profile;
