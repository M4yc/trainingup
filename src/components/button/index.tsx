import React, { useState } from 'react';
import {
  View,
  Alert,
  Text,
  Dimensions,
  TextInput,
  Image,
  TouchableOpacity,
  DimensionValue,
  ViewStyle
} from 'react-native';

import styles from './style';

type ButtonProps = {
  text: string;
  onPress: () => void;
  variant?: 'filled' | 'outlined';
  width?: DimensionValue;
  height?: DimensionValue;
  style?: ViewStyle;
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  variant = 'filled',
  width = '100%',
  height = 48,
  style,
  disabled = false
}) => {
  const isFilled = variant === 'filled';
  return (
    <TouchableOpacity
      style={[
        styles.button,
        isFilled ? styles.filled : styles.outlined,
        { width, height, opacity: disabled ? 0.5 : 1 }, // opacidade
        style
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={isFilled ? styles.textFilled : styles.textOutlined}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
