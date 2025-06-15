import { StyleSheet } from 'react-native';

import Colors from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    paddingHorizontal: 16,
    paddingTop: 20
  },
  linha: {
    width: '100%',
    height: 2,
    backgroundColor: '#00908E',
    marginVertical: 10,
    borderRadius: 4
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10
  },
  card: {
    backgroundColor: '#211d28',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  name: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center'
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4
  },
  infoText: {
    color: '#ccc',
    fontSize: 16,
    marginLeft: 8
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20
  },
  exercicioBox: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20
  },
  exercicioNome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  descricaoTitulo: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    marginLeft: 5
  },
  descricaoLista: {
    marginLeft: 10,
    marginBottom: 3
  },
  descricaoItem: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 22
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
    backgroundColor: '#00908E',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center'
  },
  textoVoltar: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  }
});

export default styles;
