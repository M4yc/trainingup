import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function DetalhesExercício({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style>
        <Text>TOPBARRA</Text>
        <TouchableOpacity>
          <Text styles={styles.menu}>=</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Detalhes do exercício</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardText}>Supino em aparelho</Text>
        <Text style={styles.cardText}>Músculo alvo: Peitoral</Text>
      </View>
      <View style={styles.exercicioBox}>
        <Text style={styles.exercicioNome}>Exercício 1</Text>
        <Text style={styles.descricaoTitulo}>Descrição:</Text>
        <View style={styles.descricaoLista}>
          <Text style={styles.descricaoItem}>3 séries de 12 repetições</Text>
          <Text style={styles.descricaoItem}>Cuidado com a postura</Text>
          <Text style={styles.descricaoItem}>Desça até 90 graus</Text>
        </View>
        <Image
          source={{
            uri: 'https://dicasef.com.br/wp-content/uploads/2024/08/supino-reto-1.jpg'
          }}
          style={styles.imagemExercicio}
        />
      </View>
      <TouchableOpacity
        style={styles.botaoVoltar}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoVoltar}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    padding: 10
  },
  menu: {
    fontSize: 24,
    color: '#fff'
  },
  card: {
    backgroundColor: '#2e2e2e',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5
  },
  cardText: {
    color: '#fff',
    fontSize: 16
  },
  exercicioBox: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10
  },
  exercicioNome: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  descricaoTitulo: {
    fontSize: 16,
    marginBottom: 5
  },
  descricaoLista: {
    marginLeft: 10,
    marginBottom: 3
  },
  descricaoItem: {
    fontSize: 14
  },
  imagemExercicio: {
    marginTop: 200,
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    marginRight: 20
  },
  botaoVoltar: {
    backgroundColor: '#cccccc',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10
  },
  textoVoltar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333'
  }
});
