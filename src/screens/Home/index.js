import React, { useState, useEffect } from 'react';
import { TextInput } from 'react-native-paper';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from "react-native-feather1s";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import HomeHeader from '../../components/HomeHeader';

import styles, { paperTheme } from './styles';

import api from '../../services/api';

export default function Home() {
    const currentVersion = '01.00';

    const [registerNumber, setRegisterNumber] = useState('');
    const [users, setUsers] = useState([]);
    const [descriptionMessage, setDescriptionMessage] = useState('');

    const [outdated, setOutdated] = useState(false);
    const [showModal, setShowModal] = useState(true);

    const [count, setCount] = useState(0);

    const navigation = useNavigation();

    function navigateToQuestion() {
        if(!registerNumber) {
            Alert.alert('Atenção', 'Preencha os campos obrigatórios');
        }
        else {
            setShowModal(true);
            setCount(count + 1);
    
            if(count < 1) {
                const alreadyExist = users.some(user => user.id === registerNumber);
        
                if (alreadyExist) {
                    setShowModal(false);
                    navigation.navigate('Access', { registerNumber });
                }
                else {
                    setShowModal(false);
                    navigation.navigate('Register', { registerNumber });
                }
            }
        }
    }

    function onTextChanged(e) {
        const val = e.replace(/[^0-9]/g, '');
        setRegisterNumber(val);
    }

    useEffect(() => {
        api.get('').then(response => {
            setDescriptionMessage(response.data.system[0].home);
            setUsers(response.data.users);
            setShowModal(false);
            if (response.data.system[0].version != currentVersion) {
                setOutdated(true);
                setShowModal(true);
            }
        });
    }, []);

    useEffect(() => {
        if (count > 1) {
            api.get('').then(response => {
                setUsers(response.data.users);

                const alreadyExist = response.data.users.some(user => user.id === registerNumber);

                if (alreadyExist) {
                    setShowModal(false);
                    navigation.navigate('Access', { registerNumber });
                }
                else {
                    setShowModal(false);
                    navigation.navigate('Register', { registerNumber });
                }
            });
        }
    }, [count]);


    return (
        <>
            <StatusBar backgroundColor='#600' />
            <Modal
                visible={showModal}
                animationType="fade"
            >
                {outdated ?
                    <SafeAreaView style={styles.container}>
                        <HomeHeader />
                        <View style={styles.mainCard}>
                            <Text style={styles.cardTitle}>Aplicativo Desatualizado</Text>
                            <Text style={styles.cardDescription}>Por favor contate o desenvolvedor!</Text>
                        </View>
                    </SafeAreaView>
                    :
                    <SafeAreaView style={styles.container}>
                        <HomeHeader />
                        <View style={styles.mainCard}>
                            <ActivityIndicator size={120} color='#FFF' />
                        </View>
                    </SafeAreaView>
                }
            </Modal>
            <SafeAreaView style={styles.container}>
                <HomeHeader />
                <View style={styles.main}>
                    <View style={styles.card}>
                        <KeyboardAwareScrollView>
                            <Text style={styles.title}>Bem vindo!</Text>
                            <Text style={styles.subTitle}>{descriptionMessage}</Text>

                            <TextInput
                                label="Número da matricula"
                                style={styles.registerInput}
                                theme={paperTheme}
                                mode="outlined"
                                value={registerNumber}
                                onChangeText={val => onTextChanged(val)}
                            />
                        </KeyboardAwareScrollView>
                    </View>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={navigateToQuestion}
                    >
                        <Text style={styles.buttonText}>Responder questões</Text>
                        <Feather name="arrow-right" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

        </>
    );
}