import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from "react-native-feather1s";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import HomeHeader from '../../components/HomeHeader';

import styles, { paperTheme } from './styles';

import api from '../../services/api';

export default function Home() {
    const [registerNumber, setRegisterNumber] = useState(0);

    const navigation = useNavigation();

    async function navigateToQuestion() {
        await api.get('').then(response => {
            const user = response.data.users;
            
            const alreadyExist = user.some(user => user.id === registerNumber);

            if(alreadyExist) navigation.navigate('Access', { registerNumber });
            else navigation.navigate('Register', { registerNumber });
        });  
    }
    

    return (
        <>
            <StatusBar backgroundColor='#600' />
            <SafeAreaView style={styles.container}>
                <HomeHeader />
                <View style={styles.main}>
                    <View style={styles.card}>
                        <KeyboardAwareScrollView>
                            <Text style={styles.title}>Bem vindo!</Text>
                            <Text style={styles.subTitle}>Por favor, se identifique pelo número da matricula</Text>

                            <TextInput
                                label="Número da matricula"
                                style={styles.registerInput}
                                theme={paperTheme}
                                mode="outlined"
                                onChangeText={val => setRegisterNumber(val)}
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