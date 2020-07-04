import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    checkOption: {
        height: 20,
        width: 20,
        borderColor: '#fff',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    questionTitle: {
        color: '#fff',
        fontSize: 22,
        paddingLeft: 5
    },

    questionSelectTitle: {
        color: '#d00',
        fontSize: 22,
        paddingLeft: 5
    },

    questionCheck: {
        marginVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    checkQuestionView: {
        width: '80%'
    },

    checkedOption: {
        height: 16,
        width: 16,
        backgroundColor: '#d00'
    }
});