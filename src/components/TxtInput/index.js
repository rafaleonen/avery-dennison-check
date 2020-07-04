import React, { useEffect, useRef, useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { useField } from '@unform/core';

import styles, { paperTheme } from './styles';

function TxtInput({ name, question }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

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
                onChangeText={value => {
                    if (inputRef.current) {
                    inputRef.current.value = value;
                }}}
            />
        </View>
    );
};

export default TxtInput;