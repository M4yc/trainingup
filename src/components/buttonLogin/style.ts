import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#D9D9D9', 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'flex-start',
        width: '100%',
        height: 40,
        borderRadius: 5
    },
    leftContainer:{
        backgroundColor: '#FFF', 
        height: '100%', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 5,
        paddingVertical: 4,
        paddingHorizontal: 6
    },
    rightContainer:{
        alignItems: 'center', 
        justifyContent: 'center', 
        flex: 1, 
        height: '100%'
    },
    text:{
        fontWeight: '500'
    }
});

export default styles;
