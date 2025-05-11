import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    padding: 16,
    },
    stepsBox: {
        flex: 1,
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },
    sideBoxes: {
        flex: 1,
        justifyContent: 'space-between',
    },
    infoBox: {
        backgroundColor: '#1e1e1e',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginBottom: 8,
    },
    value: {
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        marginTop: 8,
    },
    label: {
        fontSize: 16,
        color: '#bbb',
    },
    labelSmall: {
        fontSize: 14,
        color: '#bbb',
    },
});

export default styles;
