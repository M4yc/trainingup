import { StyleSheet } from 'react-native';

import Colors from '@constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211d28'
  },
  headerContainer: {
    marginBottom: 20,
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  subtitle: {
    fontSize: 16,
    color: '#cfcfcf',
    textAlign: 'center'
  },
  linha: {
    width: '100%',
    height: 2,
    backgroundColor: '#44bf86',
    marginVertical: 10,
    borderRadius: 4
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4
  },
  card: {
    backgroundColor: '#2b2836',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4
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
    gap: 6,
    marginVertical: 4
  },
  infoText: {
    color: '#ccc',
    fontSize: 14,
    marginLeft: 4
  },
  cardText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10
  },
  exercicioBox: {
    marginTop: 16
  },
  exercicioNome: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8
  },
  descricaoTitulo: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 5
  },
  descricaoLista: {
    paddingLeft: 8
  },
  descricaoItem: {
    color: '#ccc',
    fontSize: 14,
    lineHeight: 20
  },
  imagemExercicio: {
    marginTop: 16,
    width: '100%',
    height: 200,
    borderRadius: 12,
    resizeMode: 'cover'
  },
  botaoVoltar: {
    marginTop: 24,
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
  },
  infoGroup: {
    marginTop: 10,
    marginBottom: 12,
    gap: 6
  },
  musculoAlvoText: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12
  },
  videoPlaceholder: {
    marginTop: 16,
    width: '100%',
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#555',
    backgroundColor: '#1e1e2e',
    justifyContent: 'center',
    alignItems: 'center'
  },
  videoPlaceholderText: {
    color: '#888',
    fontSize: 14,
    marginTop: 8
  }
});

export default styles;
