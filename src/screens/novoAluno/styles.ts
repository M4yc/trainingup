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
  row: {
    flexDirection: 'row',
    marginHorizontal: -8
  },
  col: {
    flex: 1,
    paddingHorizontal: 8
  },
  errorText: {
    color: Colors.error,
    fontSize: 12,
    marginTop: 4
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    marginBottom: 8
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  radioSelected: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primary
  },
  radioLabel: {
    color: Colors.white,
    fontSize: 14
  },
  submitButton: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
