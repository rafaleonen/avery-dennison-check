import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, ActivityIndicator, Modal, Alert } from 'react-native';
import Feather from "react-native-feather1s";
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import axios from 'axios';
import qs from 'qs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import styles from './styles';
import logo from '../../assets/logo_m.png';

import NumberInput from '../../components/NumberInput';
import SingleInput from '../../components/SingleInput';
import CheckInput from '../../components/CheckInput';
import TxtInput from '../../components/TxtInput';
import HomeHeader from '../../components/HomeHeader';
import RegisteredCard from '../../components/RegisteredCard';

import api from '../../services/api';

export default function Register({ route }) {
    const { registerNumber } = route.params;

    const [registerEntry, setRegisterEntry] = useState('');
    const formRef = useRef(null);

    const [formUrl, setFormUrl] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [entries, setEntries] = useState([]);
    const [sending, setSending] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [result, setResult] = useState({});
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();

    function navigateToHome() {
        navigation.goBack();
    }

    async function handleSubmit() {
        setResult({[registerEntry]: registerNumber});
        entries.forEach(entry => {
            if (formRef.current.getFieldValue(entry) === undefined) {
                formRef.current.setFieldError(entry, 'Campo obrigatório');
                setHasError(true);
            }
            
        setResult(oldResult => ({ ...oldResult, [entry]: formRef.current.getFieldValue(entry) }));   
        });
        setSending(true);
    }

    useEffect(() => {
        if (hasError) {
            Alert.alert('Atenção', 'Preencha os campos obrigatórios');
            setSending(false);
            setHasError(false);
        }
        else if (sending === true) {
            console.log(result);
            const serializedData = qs.stringify(result);

            axios.post(formUrl, serializedData);

            setShowModal(true);
        }
    }, [sending]);

    useEffect(() => {
        api.get('')
            .then(response => {
                setFormUrl(response.data.system[0].action1);

                const filteredQuestions = response.data.questions.filter(question => {
                    if(question.required === 'X' && question.ref === 'Cadastro') {
                        setRegisterEntry(question.entry);
                        return;
                    }
                    
                    return question.ref === 'Cadastro';
                });

                const questionsEntries = filteredQuestions.map(question => question.entry);

                setEntries(questionsEntries);

                filteredQuestions.push({ type: 'renderButton', entry: 'render' });
                setQuestions(filteredQuestions);
                setIsLoading(false);
            });
    }, []);

    return (
        <>
            <StatusBar backgroundColor='#600' />
            <Modal
                visible={showModal}
                animationType="fade"
            >
                <SafeAreaView style={styles.container}>
                    <HomeHeader />
                    <View style={styles.main}>
                        <RegisteredCard />
                    </View>
                </SafeAreaView>
            </Modal>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={navigateToHome}>
                        <Feather name="arrow-left" size={28} color='#FFF' />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Cadastro</Text>
                    <Image source={logo} style={styles.logo} />
                </View>
                <View style={styles.main}>
                    {isLoading
                        ?
                        <ActivityIndicator size={98} color='#600' style={styles.loading} />
                        :
                        <View style={styles.cardInput}>
                            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                                <Form ref={formRef} onSubmit={handleSubmit}>
                                    {questions.map(question => {
                                        if (question.type === 'Number_Input' && question.required !== 'X') {
                                            return <NumberInput key={question.entry} name={question.entry} question={question.question} />;
                                        }
                                        else if (question.type === 'Single_Input') {
                                            const answers = question.answers.split('/');
                                            return <SingleInput key={question.entry} name={question.entry} question={question.question} answers={answers} />;
                                        }
                                        else if (question.type === 'Check_Input') {
                                            return <CheckInput key={question.entry} name={question.entry} question={question.question} />;
                                        }
                                        else if (question.type === 'Text_Input') {
                                            return <TxtInput key={question.entry} name={question.entry} question={question.question} />;
                                        }
                                        else if (question.type === 'renderButton') {
                                            return (
                                                <TouchableOpacity
                                                    key={question.entry}
                                                    style={styles.button}
                                                    onPress={() => formRef.current.submitForm()}
                                                >
                                                    <Text style={styles.buttonText}>Enviar</Text>
                                                </TouchableOpacity>
                                            );
                                        }
                                    })}
                                </Form>
                            </KeyboardAwareScrollView>
                        </View>
                    }
                </View>
            </SafeAreaView>
        </>
    );
}