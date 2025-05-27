/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';

import Layout from '../../components/layout';

import styles from './style';
import { auth } from '@/src/config/FirebaseConfig';
import { userService, Usuario } from '@/src/service/userService';

type MenuItem = {
  icon: keyof typeof Feather.glyphMap;
  text: string;
  onPress: () => void;
};

const Profile = () => {
  const [user, setUser] = useState<Usuario | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await userService.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Error loading profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>User not found</Text>
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

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

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
            <Text style={styles.userName}>{user.name || 'Name not set'}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{user.tipo}</Text>
            </View>
          </View>

          <View style={styles.content}>
            {user.tipo === 'Personal' && (
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
