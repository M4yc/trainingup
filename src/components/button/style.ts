import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    button:{
        width: '100%',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filled:{
        backgroundColor: '#44BF86',
    },
    outlined:{
        borderWidth: 2,
        borderColor: '#44BF86',
        backgroundColor: 'transparent',
    },
    textFilled:{
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    textOutlined:{
        fontSize: 16,
        color: '#44BF86',
        fontWeight: 'bold',
    },
});

export default styles;
