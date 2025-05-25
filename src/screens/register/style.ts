import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#171717'
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    gap: 16
  },
  input: {
    width: '100%',
    minWidth: 300,
    height: 50,
    backgroundColor: '#37343D',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#00908E',
    paddingHorizontal: 16,
    color: '#fff',
    fontSize: 16
  },
  errorText: {
    color: '#ff4d4d',
    marginTop: 4,
    fontSize: 12
  },
  userTypeContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    justifyContent: 'center',
    marginVertical: 8
  },
  userTypeButton: {
    flex: 1,
    height: 44,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4be381',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userTypeButtonActive: {
    backgroundColor: '#4be381'
  },
  userTypeText: {
    color: '#4be381',
    fontSize: 16,
    fontWeight: '500'
  },
  userTypeTextActive: {
    color: '#000'
  },
  loginLink: {
    marginTop: 16,
    alignItems: 'center'
  },
  loginLinkText: {
    color: '#4be381',
    fontSize: 14
  },
  personalItem: {
  padding: 12,
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 10,
  marginBottom: 10
},
personalItemSelected: {
  backgroundColor: '#007bff',
  borderColor: '#007bff'
}
});

export default styles;
