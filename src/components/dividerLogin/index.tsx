import React from "react";
import { View, Text, ViewStyle } from "react-native";
import styles from './style';

type Props={
    style?: ViewStyle;
} 

const DividerLogin: React.FC<Props> =({
  style
})=>{return (
    <View style={[styles.container, style]}>
        <View style={styles.line}></View>
        <View style={styles.textContiner}><Text style={styles.text}>Or</Text></View>
        <View style={styles.line}></View>
    </View>
  );
};

export default DividerLogin;