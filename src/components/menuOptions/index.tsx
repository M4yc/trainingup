import React, { JSX } from 'react';
import { View, Text, TouchableOpacity, ViewStyle } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from './style';

type Props = {
  text: string;
  icon: JSX.Element;
  onPress: () => void;
  style?: ViewStyle;
};

const MenuOptions: React.FC<Props> = ({ text, icon, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.contentLeft}>
        {icon}
        <Text style={styles.text}>{text}</Text>
      </View>
      <Ionicons name="chevron-forward" color={'#fff'} size={20} />
    </TouchableOpacity>
  );
};

export default MenuOptions;
