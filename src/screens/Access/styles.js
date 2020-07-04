import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111'
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#600',
        paddingHorizontal: 20,
    },

    logo: {
        resizeMode: 'stretch',
        width: 95,
        height: 46, 
        marginBottom: 5
    },

    headerText: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '500'
    },

    main: {
        height: '92%',
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#111',
    },

    cardInput: {
        marginVertical: 20,
        width: '90%',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 16,
        backgroundColor: '#333',
        padding: 20,
        overflow: 'hidden'
    },

    loading: {
        marginTop: 100
    },

    cardTitle: {
        fontSize: 22,
        color: '#fff',
        marginBottom: 10,
    },

    button: {
        backgroundColor: '#600',
        borderRadius: 8,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    },

    questionAnswer: {
        color: '#fff',
        fontSize: 18,
        marginTop: 8,
        paddingLeft: 8,
        marginBottom: 8
    },

});

