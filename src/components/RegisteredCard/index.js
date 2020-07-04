import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from "react-native-feather1s";
import moment from 'moment/min/moment-with-locales';
import moment_tz from 'moment-timezone';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function RegisteredCard({ alreadyRegistered }) {
    const [registerStatus, setRegisterStatus] = useState(alreadyRegistered);

    const navigation = useNavigation();

    function navigateToHome() {
        navigation.navigate('Home');
    }

    return (
        <>
            {!registerStatus ?
                <>
                    <View style={styles.modalCard}>
                        <Text style={styles.textCard}>Usuário foi cadastrado!</Text>
                        <Text style={styles.textCard}>Obrigado!</Text>
                    </View>
                </>
                :
                <>
                    <View style={styles.modalCard}>
                        <Text style={styles.textCard}>O usuário ja </Text>
                        <Text style={styles.textCard}>está cadastrado </Text>
                    </View>

                </>
            }
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