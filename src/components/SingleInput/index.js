import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useField } from '@unform/core';

import styles from './styles';

function SingleInput({ name, question, answers }) {
    const inputRef = useRef(null);
    const { fieldName, registerField, defaultValue, error } = useField(name);

    const [checkOne, setCheckOne] = useState(false);
    const [checkTwo, setCheckTwo] = useState(false);

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

    function handleCheckOne() {
        inputRef.current.value = answers[0];
        setCheckOne(true);
        setCheckTwo(false);
    }

    function handleCheckTwo() {
        inputRef.current.value = answers[1];
        setCheckOne(false);
        setCheckTwo(true);
    }

    return (
        <View style={styles.questionSingle}>
            <Text style={styles.questionTitle}>- {question}</Text>
            <View style={styles.rowView}>
                <View style={styles.rowInput}>
                    <TouchableOpacity 
                        ref={inputRef}
                        style={styles.circleOption}
                        onPress={handleCheckOne}
                    >
                        {checkOne && <View style={styles.circleChecked}/>}
                    </TouchableOpacity>
                    <Text style={styles.questionAnswer}>{answers[0]}</Text>
                </View>
                <View style={styles.rowInput}>
                    <TouchableOpacity 
                        ref={inputRef}
                        style={styles.circleOption}
                        onPress={handleCheckTwo}
                    >
                        {checkTwo && <View style={styles.circleChecked}/>}
                    </TouchableOpacity>
                    <Text style={styles.questionAnswer}>{answers[1]}</Text>
                </View>
            </View>
        </View>
    );
};

export default SingleInput;