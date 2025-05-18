import React, { useState } from 'react';
import {
  Text,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  DimensionValue,
  ViewStyle
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import styles from './style';

type ButtonProps = {
  onPress: () => void;
};

const ButtonFloating: React.FC<ButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Ionicons name="add" size={32} color={'#000'} />
    </TouchableOpacity>
  );
};

export default ButtonFloating;
