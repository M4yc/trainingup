import React from 'react';
import { View,  Text, Image} from 'react-native';
import styles from './style';
import Colors from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

const TopBarDashboard: React.FC = () => {
    
    return (
        <View style={styles.topBar}>
                <View >
                    <Text style={styles.textWelcome}>Bem vindo de volta!</Text>
                    <Text style={styles.textName}>Edson Rodrigues</Text>
                </View>
                <View>
                    <Image 
                        source={require('../../assets/imgs/userProfile.jpg')} 
                        style={{width: 48, height: 48, borderRadius: 999}}/>
                    {/* <Ionicons name='menu' size={24} color={'white'}/> */}
                </View>
                
            </View>
    );
};

export default TopBarDashboard;
