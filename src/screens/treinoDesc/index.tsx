import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import styles from './style';
import Layout from '@/src/components/layout';

export default function DetalhesExercicio() {
  const navigation = useNavigation();
  const route = useRoute();
  const { exercicio } = route.params as any;

  return (
    <Layout>
      <View style={styles.container}>
        <LinearGradient
          colors={['#2c2a37', '#211d28']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.headerContainer}
        >
          <Text style={styles.header}>Detalhes do exercício</Text>
          <Text style={styles.subtitle}>
            Veja abaixo as informações completas
          </Text>
        </LinearGradient>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        >
          <View style={styles.card}>
            <Text style={styles.cardText}>{exercicio.nome}</Text>
            <Text style={styles.musculoAlvoText}>
              Músculo alvo: {exercicio.musculoAlvo || '---'}
            </Text>

            {/* Linha 1: Séries e Repetições */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12,
                marginBottom: 10
              }}
            >
              <View style={styles.infoRow}>
                <FontAwesome5 name="dumbbell" size={16} color="#44BF86" />
                <Text style={styles.infoText}>Séries: {exercicio.series}</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="sync-alt" size={16} color="#44BF86" />
                <Text style={styles.infoText}>
                  Repetições: {exercicio.repeticoes}
                </Text>
              </View>
            </View>

            {/* Linha 2: Peso e Intervalo */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                gap: 12
              }}
            >
              <View style={styles.infoRow}>
                <MaterialIcons
                  name="fitness-center"
                  size={16}
                  color="#44BF86"
                />
                <Text style={styles.infoText}>Peso: {exercicio.peso}kg</Text>
              </View>

              <View style={styles.infoRow}>
                <MaterialIcons name="timer" size={16} color="#44BF86" />
                <Text style={styles.infoText}>
                  Intervalo: {exercicio.intervalo}s
                </Text>
              </View>
            </View>

            <View style={styles.linha} />

            <View style={styles.exercicioBox}>
              <Text style={styles.exercicioNome}>Descrição:</Text>
              <View style={styles.descricaoLista}>
                <Text style={styles.descricaoItem}>{exercicio.descricao}</Text>
              </View>

              {exercicio.imagem ? (
                <Image
                  source={{ uri: exercicio.imagem }}
                  style={styles.imagemExercicio}
                />
              ) : (
                <View style={styles.videoPlaceholder}>
                  <FontAwesome5 name="play-circle" size={64} color="#888" />
                  <Text style={styles.videoPlaceholderText}>
                    Vídeo ou imagem do exercício
                  </Text>
                </View>
              )}
            </View>

            <TouchableOpacity
              style={styles.botaoVoltar}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.textoVoltar}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
}
