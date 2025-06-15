import React from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

import styles from './style';

export default function DetalhesExercício() {
  const navigation = useNavigation();
  const route = useRoute();
  const { exercicio } = route.params as any;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do exercício</Text>

      <View style={styles.linha} />

      <View style={styles.card}>
        <Text style={styles.cardText}>{exercicio.nome}</Text>
        <View style={styles.infoRow}>
          <FontAwesome5 name="dumbbell" size={16} color="#44BF86" />
          <Text style={styles.infoText}>
            Músculo alvo: Peito{exercicio.musculoAlvo}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <MaterialIcons name="repeat" size={16} color="#44BF86" />
          <Text style={styles.infoText}>
            Séries: {exercicio.series} | Repetições: {exercicio.repeticoes} |
            Peso: {exercicio.peso}kg | Intervalo: {exercicio.intervalo}s
          </Text>
        </View>
        <View style={styles.linha} />

        <View style={styles.exercicioBox}>
          <Text style={styles.exercicioNome}>
            Exercício #{exercicio.numero || '-'}
          </Text>
          <Text style={styles.descricaoTitulo}>Descrição:</Text>
          <View style={styles.descricaoLista}>
            <Text style={styles.descricaoItem}>{exercicio.descricao}</Text>
          </View>
          {exercicio.imagem && (
            <Image
              source={{ uri: exercicio.imagem }}
              style={styles.imagemExercicio}
            />
          )}
        </View>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.textoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
