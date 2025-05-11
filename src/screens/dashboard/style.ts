import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'black', 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    text:{
        color: 'white'
    },
    topBar:{
        flexDirection: 'row', 
        padding: 20, 
        justifyContent: 'space-between'
    }
});

export default styles;
