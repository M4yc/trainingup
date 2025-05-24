import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function DetalhesExercício({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Detalhes do exercício</Text>

      <View style={styles.linha} />

      <View style={styles.card}>
        <Text style={styles.cardText}>Supino em aparelho</Text>
        <Text style={styles.cardText}>Músculo alvo: Peitoral</Text>
        <Text style={styles.cardText}>
          Séries: 4 / Repetições: 8 / Peso: 15kg / Intervalo: 30-60s
        </Text>
      </View>

      <View style={styles.linha} />

      <View style={styles.exercicioBox}>
        <Text style={styles.exercicioNome}>Exercício 1</Text>
        <Text style={styles.descricaoTitulo}>Descrição:</Text>
        <View style={styles.descricaoLista}>
          <Text style={styles.descricaoItem}>
            Este exercício é para ser feito de forma consicente na questão do
            peso. Não arrisque peso alto sem uma pessoa treinando contigo.
            Quando sentir que esse peso já está leve, pode ir aumentando aos
            poucos, COM SEGURANÇA!
          </Text>
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
  linha: {
    width: '100%',
    height: 2,
    backgroundColor: '#00908E',
    alignSelf: 'center'
  },
  header: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 8
  },
  card: {
    backgroundColor: '#1a1a1a',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center'
  },
  exercicioBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 10
  },
  exercicioNome: {
    marginTop: 5,
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  descricaoTitulo: {
    color: '#fff',
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 5
  },
  descricaoLista: {
    marginLeft: 10,
    marginBottom: 3
  },
  descricaoItem: {
    color: '#fff',
    fontSize: 16
  },
  imagemExercicio: {
    marginTop: 150,
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
    padding: 10,
    marginRight: 20
  },
  botaoVoltar: {
    marginTop: 10,
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
