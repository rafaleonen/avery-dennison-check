import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    modalCard: {
        marginTop: 20,
        width: '90%',
        height: '55%',
        borderColor: '#050',
        borderWidth: 5,
        borderRadius: 10,
        backgroundColor: '#0a0',
        paddingHorizontal: 20,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    modalDeniedCard: {
        marginTop: 20,
        width: '90%',
        height: '55%',
        borderColor: '#500',
        borderWidth: 5,
        borderRadius: 10,
        backgroundColor: '#a00',
        paddingHorizontal: 20,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

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

    statusMessage: {
        fontSize: 32,
        color: '#fff'
    },

    icon: {
        marginVertical: 20
    },

    statusDescription: {
        color: '#fff',
        fontSize: 16
    },

    viewModal: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    dateModal: {
        backgroundColor: '#111',
        padding: 15,
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 8
    },

    statusDate: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600'
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },

    deniedDescription: {
        color: '#fff',
        fontSize: 24
    },
});