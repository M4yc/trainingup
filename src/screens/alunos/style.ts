import { StyleSheet } from 'react-native';

import Colors from '@constants/colors';

const styles = StyleSheet.create({
  containerTitle: {
    alignItems: 'center',
    padding: 10
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary
  },
  content: {
    gap: 10,
    paddingHorizontal: 15
  }
});

export default styles;
