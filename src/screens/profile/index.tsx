/* eslint-disable @typescript-eslint/no-require-imports */
import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';

import Layout from '../../components/layout';
import { useAuth } from '../../contexts/Auth';
import styles from './style';

type MenuItem = {
  icon: keyof typeof Feather.glyphMap;
  text: string;
  onPress: () => void;
};

const Perfil = () => {
  const { signOut, authData } = useAuth();

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
            <Text style={styles.userName}>{authData?.name}</Text>
            <Text style={styles.userEmail}>{authData?.email}</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{authData?.userType}</Text>
            </View>
          </View>

          <View style={styles.content}>
            {authData?.userType === 'personal' && (
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
