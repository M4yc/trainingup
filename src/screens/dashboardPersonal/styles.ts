import { StyleSheet } from 'react-native';

const Colors = {
  fundo: '#211d28',
  primary: '#44BF86',
  auxiliar: '#00908E',
  white: '#FFFFFF',
  bordas: '#333333',
  auxiliar2: '#2A2634',
  error: '#FF6B6B'
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundo
  },
  scrollContent: {
    padding: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.white
  },
  notificationButton: {
    position: 'relative',
    padding: 8
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: Colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold'
  },
  cardsContainer: {
    paddingBottom: 16
  },
  card: {
    backgroundColor: Colors.auxiliar2,
    borderRadius: 12,
    padding: 16,
    marginRight: 16,
    width: 160,
    borderLeftWidth: 4,
    elevation: 2
  },
  cardTitle: {
    color: Colors.white,
    fontSize: 14,
    marginTop: 8
  },
  cardValue: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8
  },
  section: {
    marginTop: 24
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white
  },
  verTodosText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '500'
  },
  alunoCard: {
    backgroundColor: Colors.auxiliar2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  alunoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  alunoNome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white
  },
  alunoObjetivo: {
    fontSize: 14,
    color: Colors.white,
    marginBottom: 12
  },
  alunoObjetivoValor: {
    color: Colors.primary,
    fontWeight: '500'
  },
  alunoTreinos: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  treinoInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  treinoTexto: {
    color: Colors.white,
    fontSize: 14,
    marginLeft: 8
  },
  addButton: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 24
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  }
});
