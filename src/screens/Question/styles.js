import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111'
    },

    main: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
    },

    cardInput: {
        marginVertical: 20,
        width: '90%',
        height: 120,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 16,
        backgroundColor: '#333',
        flexDirection: 'row'
    },

    inputIcon: {
        width: '20%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: '#fff'
    },

    inputDescription: {
        padding: 15,
        width: '75%',
    },

    inputTitle: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold'
    },

    inputText: {
        paddingTop: 3,
        color: '#fff',
    }
});