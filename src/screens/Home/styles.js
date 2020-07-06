import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#111'
    },

    main: {
        height: '100%',
        width: '100%',
        alignItems: 'center'
    },

    card: {
        marginTop: 20,
        width: '90%',
        height: '50%',
        borderColor: '#666',
        borderWidth: 5,
        borderRadius: 10,
        backgroundColor: '#333',
        alignItems: 'center',
        padding: 20,
        paddingBottom: 60
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff'
    },

    subTitle: {
        marginTop: 10,
        fontSize: 16,
        color: '#fff'
    },

    button: {
        backgroundColor: '#600',
        borderRadius: 8,
        height: 50,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        flexDirection: 'row',
        marginBottom: 15
    },

    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10
    },

    inputText: {
        width: '100%',
        backgroundColor: '#333',
        color: '#fff',
    },

    registerInput: {
        marginVertical: 6,
        width: '100%',
        marginTop: 30,
        backgroundColor: '#333',
        color: '#fff'
    },
});

export const paperTheme = {
    colors: {
        primary: '#ddd',
        placeholder: '#ddd',
        text: '#fff'
    }
};