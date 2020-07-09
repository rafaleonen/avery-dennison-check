import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from "react-native-feather1s";
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function RegisteredCard() {

    const navigation = useNavigation();

    function navigateToHome() {
        navigation.navigate('Home');
    }

    return (
        <>
            <View style={styles.modalCard}>
                <Text style={styles.textCard}>Usuário foi cadastrado!</Text>
                <Text style={styles.textCard}>Obrigado!</Text>
            </View>
            <TouchableOpacity
                style={styles.buttonModal}
                onPress={navigateToHome}
            >
                <Text style={styles.buttonText}>Retornar</Text>
                <Feather name="corner-up-left" size={22} color="#fff" />
            </TouchableOpacity>
        </>
    );
}