import { StyleSheet } from 'react-native';

import Colors from '@constants/colors';

const styles = StyleSheet.create({
  containerTitle: {
    backgroundColor: '#000',
    marginLeft: 8,
    padding: 4
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: 10
  }
});

export default styles;
