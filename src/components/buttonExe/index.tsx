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

import { Feather, Ionicons } from '@expo/vector-icons';

import styles from './style';

type Props = {
  nameExe: string;
  icon: any;
  serie: number;
  repticoes: number;
  onPress: () => void;
  style?: ViewStyle;
};

const ButtonExe: React.FC<Props> = ({
  nameExe,
  onPress,
  serie,
  style,
  repticoes,
  icon
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {icon}
      <View>
        <Text style={styles.nameExe}>{nameExe}</Text>
        <View style={styles.containerInner}>
          <Feather name="target" size={14} color="orange" />
          <Text style={{ color: 'white' }}>
            {serie} x {repticoes} Reps.
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonExe;
