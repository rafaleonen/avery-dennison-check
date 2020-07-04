import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity, ActivityIndicator, FlatList, Modal, Alert } from 'react-native';
import Feather from "react-native-feather1s";
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import axios from 'axios';
import qs from 'qs';

import styles from './styles';
import logo from '../../assets/logo_m.png';

import NumberInput from '../../components/NumberInput';
import SingleInput from '../../components/SingleInput';
import CheckInput from '../../components/CheckInput';
import HomeHeader from '../../components/HomeHeader';
import AcessCard from '../../components/AcessCard';

import api from '../../services/api';

export default function Acess() {
    const formRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [entries, setEntries] = useState([]);
    const [sending, setSending] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [result, setResult] = useState({});
    const [accessState, setAccessStatus] = useState(true);
    const [errorList, setErrorList] = useState([]);
    const [hasError, setHasError] = useState(false);

    const navigation = useNavigation();


    function navigateToHome() {
        navigation.goBack();
    }

    async function handleSubmit() {
        entries.forEach(entry => {
            if(formRef.current.getFieldValue(entry) === undefined) {
                formRef.current.setFieldError(entry, 'Campo obrigatório');
                setHasError(true);
            }

            else if(formRef.current.getFieldValue(entry) === 'Sim') {
                setAccessStatus(false);
            }

            setResult(oldResult => ({ ...oldResult, [entry]: formRef.current.getFieldValue(entry) }));
        });

        setSending(true);
    }

    useEffect(() => {
        if(hasError) {
            Alert.alert('Atenção', 'Preencha os campos obrigatórios');
            setSending(false);
            setAccessStatus(true);
            setHasError(false);
        }
        else if (sending === true) {
            const serializedData = qs.stringify(result);
            console.log(serializedData);

            // axios.post(questions[0].action, serializedData);

            setShowModal(false);
        }
    }, [sending]);

    useEffect(() => {
        api.get('')
            .then(response => {
                const version = response.data.questions.filter(question => question.version);

                const filteredQuestions = response.data.questions.filter(question => question.ref === 'Acesso');

                const questionsEntries = filteredQuestions.map(question => question.entry);

                setEntries(questionsEntries);

                console.log(questionsEntries);

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
                        <AcessCard access={accessState}/>
                    </View>
                </SafeAreaView>
            </Modal>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={navigateToHome}>
                        <Feather name="arrow-left" size={28} color='#FFF' />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Acesso</Text>
                    <Image source={logo} style={styles.logo} />
                </View>
                <View style={styles.main}>
                    {isLoading
                        ?
                        <ActivityIndicator size={98} color='#600' style={styles.loading} />
                        :
                        <View style={styles.cardInput}>
                            <Form ref={formRef} onSubmit={handleSubmit}>
                                <FlatList
                                    data={questions}
                                    keyExtractor={question => question.entry}
                                    showsVerticalScrollIndicator={false}
                                    renderItem={({ item: question }) => {
                                        if (question.type === 'Number_Input') {
                                            return <NumberInput name={question.entry} question={question.question} />;
                                        }
                                        if (question.type === 'Single_Input') {
                                            const answers = question.answers.split('/');
                                            return <SingleInput name={question.entry} question={question.question} answers={answers} />;
                                        }
                                        if (question.type === 'Check_Input') {
                                            return <CheckInput name={question.entry} question={question.question} />;
                                        }
                                        if (question.type === 'renderButton') {
                                            return (
                                                <TouchableOpacity
                                                    style={styles.button}
                                                    onPress={() => formRef.current.submitForm()}
                                                >
                                                    <Text style={styles.buttonText}>Enviar</Text>
                                                </TouchableOpacity>
                                            );
                                        }
                                    }}
                                />
                            </Form>

                        </View>
                    }
                </View>
            </SafeAreaView>
        </>
    );
}