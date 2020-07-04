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
import RegisteredCard from '../../components/RegisteredCard';

import api from '../../services/api';

export default function Register() {
    const formRef = useRef(null);

    const [isLoading, setIsLoading] = useState(true);
    const [questions, setQuestions] = useState([]);
    const [entries, setEntries] = useState([]);
    const [sending, setSending] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [result, setResult] = useState({});
    const [registeredID, setRegisteredID] = useState(false);
    const [hasError, setHasError] = useState(false);

    const [users, setUsers] = useState([]);

    const navigation = useNavigation();

    function navigateToHome() {
        navigation.goBack();
    }

    function handleSubmit() {
        entries.forEach(entry => {
            if(formRef.current.getFieldValue(entry) === undefined) {
                formRef.current.setFieldError(entry, 'Campo obrigatório');
                setHasError(true);
            }
            else {
                const registered = users.some(user => user == formRef.current.getFieldValue(entry));
                
                if(registered) setRegisteredID(true);
            }

            setResult(oldResult => ({ ...oldResult, [entry]: formRef.current.getFieldValue(entry) }));
        });
        setSending(true);
    }

    useEffect(() => {
        if(hasError) {
            Alert.alert('Atenção', 'Preencha os campos obrigatórios');
            setSending(false);
            setRegisteredID(false);
            setHasError(false);
        }
        else if (sending === true && registeredID === false) {
            const serializedData = qs.stringify(result);

            axios.post(questions[0].action, serializedData);

            setShowModal(true);
        }
    }, [sending]);

    useEffect(() => {
        api.get('')
            .then(response => {
                const version = response.data.questions.filter(question => question.version);

                const filteredQuestions = response.data.questions.filter(question => question.ref === 'Cadastro');

                const usersID = response.data.users.map(user => user.id);

                setUsers(usersID);

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
                        <RegisteredCard alreadyRegistered={registeredID} />
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