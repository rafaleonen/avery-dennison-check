import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#600'
    },

    logo: {
        resizeMode: 'stretch',
        width: 320,
        height: 142
    },

    bottomBorder: {
        width: '80%',
        borderColor: '#fff',
        borderBottomWidth: 2
    },

    headerText: {
        marginVertical: 15,
        fontSize: 28,
        fontWeight: '500',
        color: '#fff'
    },
});