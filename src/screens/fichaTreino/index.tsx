import React from 'react';
import { View, Text } from 'react-native';

import ButtonExe from '@components/buttonExe';
import Layout from '@components/layout';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from 'src/routes/types';

import styles from './style';

type NavigationProp = NativeStackNavigationProp<AppStackParamList>;

const TreinosScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  return (
    <Layout>
      <View style={styles.containerTitle}>
        <Text style={styles.titleText}>Segunda-Feira</Text>
      </View>
      <View style={styles.content}>
        <ButtonExe
          nameExe="Costas"
          icon={
            <MaterialIcons name="sports-handball" size={32} color="orange" />
          }
          repticoes={15}
          serie={4}
          onPress={() => navigation.navigate('TreinoDesc')}
        />
      </View>
    </Layout>
  );
};

export default TreinosScreen;
