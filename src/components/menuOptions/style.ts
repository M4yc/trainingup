import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    borderRadius: 8
  },
  contentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  text: {
    fontSize: 18,
    color: '#fff'
  }
});

export default styles;
