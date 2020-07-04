import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useField } from '@unform/core';

import styles from './styles';

function CheckInput({ name, question }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    const [questionValue, setQuestionValue] = useState('Não');

    useEffect(() => {
        inputRef.current.value = questionValue;
    }, [questionValue]);


    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputRef.current,
            path: 'value',
            clearValue(ref) {
                ref.value = '';
                ref.clear();
            },
            setValue(ref, value) {
                ref.setNativeProps({ text: value });
                inputRef.current.value = value;
            },
            getValue(ref) {
                return ref.value;
            },
        });
    }, [fieldName, registerField]);


    return (
        <View style={styles.questionCheck}>
            <View style={styles.checkQuestionView}>
                <Text style={styles.questionTitle}>- {question}</Text>
            </View>
            <TouchableOpacity
                ref={inputRef}
                style={styles.checkOption}
                onPress={() => {
                    if(questionValue === 'Sim') setQuestionValue('Não');
                    else if(questionValue === 'Não') setQuestionValue('Sim');
                }}
            >
                {questionValue === 'Sim' && <View style={styles.checkedOption} /> }
            </TouchableOpacity>
        </View>
    );
};

export default CheckInput;