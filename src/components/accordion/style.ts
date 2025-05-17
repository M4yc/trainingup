import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 8,
    borderRadius: 8,
    overflow: 'hidden'
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  arrow: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrowText: {
    fontSize: 16,
    color: '#666'
  },
  content: {
    padding: 16,
    position: 'absolute',
    width: '100%'
  }
});
