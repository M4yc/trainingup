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
  name: string;
  idade: number;
  objetivo: string;
  frequencia: string;
  userIcon?: any;
  onPress: () => void;
  style?: ViewStyle;
};

const containerAluno: React.FC<Props> = ({
  name,
  idade,
  objetivo,
  frequencia,
  userIcon,
  onPress,
  style
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {userIcon ? (
        userIcon
      ) : (
        <Ionicons name="person-circle" size={60} color={'#fff'} />
      )}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flex: 1
        }}
      >
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textTitle}>Nome: </Text>
            <Text style={styles.text}>{name}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textTitle}>Idade: </Text>
            <Text style={styles.text}>{idade}</Text>
          </View>
        </View>
        <View style={{ gap: 8 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textTitle}>Objetivo: </Text>
            <Text style={styles.text}>{objetivo}</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.textTitle}>Frequencia: </Text>
            <Text style={styles.text}>{frequencia}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default containerAluno;
