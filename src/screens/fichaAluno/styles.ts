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
  header: {
    padding: 16,
    backgroundColor: Colors.auxiliar2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bordas,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 16
  },
  backButton: {
    marginRight: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white
  },
  content: {
    flex: 1,
    padding: 16
  },
  form: {
    flex: 1
  },
  section: {
    backgroundColor: Colors.auxiliar2,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 16
  },
  inputContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 14,
    color: Colors.white,
    marginBottom: 8
  },
  input: {
    backgroundColor: Colors.fundo,
    borderRadius: 8,
    padding: 12,
    color: Colors.white,
    fontSize: 16
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4
  },
  dateContainer: {
    flexDirection: 'row',
    marginBottom: 16
  },
  exerciseContainer: {
    backgroundColor: Colors.auxiliar2,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  exerciseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 12
  },
  exerciseDetailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },
  exerciciosContainer: {
    marginTop: 8
  },
  exercicioCard: {
    backgroundColor: Colors.fundo,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12
  },
  exercicioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8
  },
  exercicioNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white
  },
  exercicioActions: {
    flexDirection: 'row',
    gap: 12
  },
  exercicioDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8
  },
  exercicioInfo: {
    backgroundColor: Colors.auxiliar2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  exercicioInfoText: {
    color: Colors.white,
    fontSize: 12,
    marginLeft: 4
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 32
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  },
  // Estilos específicos para visualização
  alunoInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  alunoFoto: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16
  },
  alunoNome: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4
  },
  alunoObjetivo: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8
  },
  diaContainer: {
    marginBottom: 24
  },
  diaTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 12,
    backgroundColor: Colors.auxiliar2,
    padding: 12,
    borderRadius: 8
  },
  exercicioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.bordas
  },
  exercicioNumero: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  exercicioNumeroText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold'
  },
  exercicioContent: {
    flex: 1
  },
  exercicioSeries: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8
  },
  serieTag: {
    backgroundColor: Colors.auxiliar2,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  },
  serieTagText: {
    color: Colors.white,
    fontSize: 12
  },
  observacoes: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.8,
    fontStyle: 'italic',
    marginTop: 4
  }
});
