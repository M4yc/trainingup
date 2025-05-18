import React from 'react';
import { View, Text } from 'react-native';

import Layout from '../../components/layout';

const DashboardPersonal = () => {
  return (
    <Layout>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: '#fff', fontSize: 24, fontWeight: '500' }}>
          Tela Dashboard personal
        </Text>
      </View>
    </Layout>
  );
};

export default DashboardPersonal;
