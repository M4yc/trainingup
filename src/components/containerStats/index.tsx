import React from 'react';
import { View,  Text} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ContainerStats: React.FC = () => {
    
    return (
        <View style={styles.container}>
            <View style={styles.stepsBox}>
                <Icon name="walking" size={50} color="#4be381" />
                <Text style={styles.value}>360</Text>
                <Text style={styles.label}>Passos</Text>
            </View>

            <View style={styles.sideBoxes}>
                <View style={styles.infoBox}>
                    <Icon name="fire" size={30} color="#4be381" />
                    <Text style={styles.value}>630</Text>
                    <Text style={styles.labelSmall}>kcal</Text>
                </View>

                <View style={styles.infoBox}>
                    <Icon name="weight" size={30} color="#4be381" />
                    <Text style={styles.value}>78</Text>
                    <Text style={styles.labelSmall}>kg</Text>
                </View>
            </View>
        </View>
    );
};

export default ContainerStats;
