import React, { useEffect, useRef, useState } from 'react';
import { TextInput, Text } from 'react-native-paper';
import { View } from 'react-native';
import { useField } from '@unform/core';

import styles, { paperTheme } from './styles';

function NumberInput({ name, question }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);
    const [value, setValue] = useState();
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        inputRef.current.value = defaultValue;
    }, [defaultValue]);

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

    function onTextChanged(e) {
        const val = e.replace(/[^0-9]/g, '');
        if (inputRef.current) {
            setValue(val);
            inputRef.current.value = val;
        }
    }

    return (
        <View style={styles.questionNumber}>
            <TextInput
                ref={inputRef}
                keyboardAppearance="dark"
                defaultValue={defaultValue}
                style={styles.inputText}
                theme={paperTheme}
                label={question}
                mode='outlined'
                value={value}
                keyboardType='numeric'
                onChangeText={e => onTextChanged(e)}
            />
            <Text>{errorMsg}</Text>
        </View>
    );
};

export default NumberInput;