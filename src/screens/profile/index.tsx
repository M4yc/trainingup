/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';

import Layout from '../../components/layout';

import styles from './style';
import { auth, db } from '@/src/config/FirebaseConfig';
import { doc, getDoc } from "firebase/firestore";

type MenuItem = {
  icon: keyof typeof Feather.glyphMap;
  text: string;
  onPress: () => void;
};

interface Usuario {
  name?: string;
  email: string;
  tipo: "Aluno" | "Personal";
}

const Perfil = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  function signOut() {
    auth.signOut();
  }

  useEffect(() => {
    const carregarPerfil = async () => {
      try {
        const user = auth.currentUser;

        if (user) {
          const docRef = doc(db, "usuarios", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const data = docSnap.data();
            setUsuario({
              name: data.name,
              email: data.email,
              tipo: data.tipo
            });
          } else {
            console.warn("Documento do usuário não encontrado");
          }
        }
      } catch (error) {
        console.error("Erro ao buscar dados do perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    carregarPerfil();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text>Usuário não encontrado</Text>
      </View>
    );
  }


 
  const stats = [
    { value: '45', label: 'Alunos Ativos' },
    { value: '152', label: 'Treinos' },
    { value: '12', label: 'Anos Exp.' }
  ];

  const menuItems: MenuItem[] = [
    {
      icon: 'user',
      text: 'Editar Perfil',
      onPress: () => null
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
                source={require('../../assets/imgs/userProfile.jpg')}
                style={styles.avatar}
              />
              <TouchableOpacity style={styles.editAvatarButton}>
                <Feather name="camera" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{usuario?.name}</Text>
            <Text style={styles.userEmail}>{usuario?.email}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{usuario?.tipo}</Text>
            </View>
          </View>

          <View style={styles.content}>
            {usuario?.tipo === 'Personal' && (
              <View style={styles.statsContainer}>
                {stats.map((stat, index) => (
                  <View key={index} style={styles.statItem}>
                    <Text style={styles.statValue}>{stat.value}</Text>
                    <Text style={styles.statLabel}>{stat.label}</Text>
                  </View>
                ))}
              </View>
            )}

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
                onPress={signOut}
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

export default Perfil;
