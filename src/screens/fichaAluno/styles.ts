import { StyleSheet } from 'react-native';
import Colors from '@constants/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.fundo
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.fundo,
    borderBottomWidth: 1,
    borderBottomColor: Colors.auxiliar2
  },
  backButton: {
    padding: 8
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 16
  },
  content: {
    flex: 1
  },
  form: {
    padding: 16
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#2A2634',
    borderRadius: 12,
    padding: 16
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
    color: Colors.white,
    fontSize: 14,
    marginBottom: 8
  },
  input: {
    backgroundColor: Colors.fundo,
    borderRadius: 8,
    padding: 12,
    color: Colors.white,
    fontSize: 16
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  dateContainer: {
    flexDirection: 'row',
    marginTop: 16
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: 12,
    marginTop: 4
  },
  groupSection: {
    backgroundColor: '#2A2634',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white
  },
  removeButton: {
    padding: 8
  },
  exerciseCard: {
    backgroundColor: Colors.fundo,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  exerciseNumber: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold'
  },
  exerciseDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12
  },
  inputHalf: {
    flex: 1,
    marginHorizontal: 4
  },
  smallInput: {
    backgroundColor: Colors.auxiliar2,
    borderRadius: 8,
    padding: 12,
    color: Colors.white,
    fontSize: 16
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginTop: 8
  },
  addButtonText: {
    color: Colors.primary,
    fontSize: 16,
    marginLeft: 8
  },
  addGroupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFF',
    padding: 16,
    borderRadius: 8,
    marginTop: 16
  },
  addGroupButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 32
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
