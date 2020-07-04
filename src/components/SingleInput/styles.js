import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    questionSingle: {
        marginVertical: 15,
    },

    questionTitle: {
        color: '#fff',
        fontSize: 22,
        paddingLeft: 5
    },
    
    rowView: {
        width: '80%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    rowInput: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    questionAnswer: {
        color: '#fff',
        fontSize: 18,
        marginTop: 8,
        paddingLeft: 8,
        marginBottom: 8
    },

    circleOption: {
        height: 20,
        width: 20,
        borderColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    circleChecked: {
        padding: 2,
        backgroundColor: '#d00',
        borderWidth: 2,
        height: 14,
        width: 14,
        borderRadius: 9,
        borderColor: '#d00'
    }
});