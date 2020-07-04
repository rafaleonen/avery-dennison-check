import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    buttonModal: {
        backgroundColor: '#600',
        borderRadius: 8,
        height: 50,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row'
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },

    modalCard: {
        marginTop: 20,
        width: '90%',
        height: '55%',
        borderColor: '#666',
        borderWidth: 5,
        borderRadius: 10,
        backgroundColor: '#333',
        paddingHorizontal: 20,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },

    textCard: {
        fontSize: 28,
        color: '#fff'
    }
});