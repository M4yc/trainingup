import React, { useState } from 'react';
import { View,  Alert, Text, Dimensions, TextInput, Image, TouchableOpacity, DimensionValue, ViewStyle} from 'react-native';
import styles from './style';
import { Ionicons } from '@expo/vector-icons';
import IconGoogle from '../../assets/icons/icon-google.svg'

type ButtonProps={
    onPress: () => void;
    variant: 'Google' | 'Apple';
} 

const ButtonLogin: React.FC<ButtonProps> = ({
    onPress,
    variant = 'Google'
    })=>{
        const isGoogle = variant === 'Google';
    return (
        <TouchableOpacity 
                style={styles.container}
                    onPress={onPress}>
                <View style={styles.leftContainer}>
                    {isGoogle ? (
                        <IconGoogle width={24} height={24}/>
                    ):(
                        <Ionicons name='logo-apple' size={24}></Ionicons>
                    )}
                    
                </View>
                <View style={styles.rightContainer}>
                    {isGoogle ? (
                        <Text style={styles.text}>Continuar com o Google</Text>
                    ):(
                        <Text style={styles.text}>Continuar com a Apple</Text>
                    )}
                </View>
            </TouchableOpacity>
    );
};

export default ButtonLogin;
