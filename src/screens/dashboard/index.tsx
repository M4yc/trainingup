import React from 'react';
import styles from './style';

import Layout from '../../components/layout';
import ListWeek from '../../components/listWeek';
import TopBarDashboard from '../../components/topBarDashboard';
import ContainerStats from '../../components/containerStats';
import { View,  Text, ImageBackground, Touchable, TouchableOpacity} from 'react-native';

const Dashboard = () => {

    return (
        <Layout>
            <TopBarDashboard/>
            <ListWeek/>
            <ContainerStats/>
            <View>
                <Text style={{color: '#fff', fontSize: 24, fontWeight: '500'}}>Treino</Text>
                <TouchableOpacity>
                    <ImageBackground 
                        source={require('../../assets/imgs/bg_musc.png')}
                        style={{width: '100%', height:200}}
                        imageStyle={{opacity: 0.4}}
                    >
                        <Text style={{color: '#fff', paddingLeft: 10, paddingTop: 10,fontSize: 24}}>Ficha de treino</Text>
                        <Text style={{color: '#fff', paddingLeft: 10}}>Foco: Hipertrofia</Text>
                    </ImageBackground>
                </TouchableOpacity>
                
            </View>
        </Layout>
    );
};

export default Dashboard;
