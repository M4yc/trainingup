import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171717',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
    paddingTop: 120,
    paddingBottom: 40
  },
  content: {
    flex: 1,
    width: '100%',
    padding: 20,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 40
  },
  inputUser: {
    width: '100%',
    padding: 12,
    backgroundColor: '#37343D',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#00908E',
    fontSize: 16,
    color: '#fff'
  },
  inputPass: {
    width: '100%',
    padding: 12,
    backgroundColor: '#37343D',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#00908E',
    fontSize: 16,
    color: '#fff'
  },
  text: {
    color: 'white'
  },
  containerEscSenha: {
    width: '100%',
    alignItems: 'flex-end',
    marginVertical: 24
  },
  textEscSenha: {
    color: '#FFF'
  }
});

export default styles;
