import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    topBar:{
        flexDirection: 'row', 
        padding: 20, 
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textWelcome:{
        color: '#c4c4c4', 
        fontSize: 14
    },
    textName:{
        color: 'white', 
        fontSize: 20, 
        fontWeight: '500'
    }
});

export default styles;
