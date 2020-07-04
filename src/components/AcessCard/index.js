import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from "react-native-feather1s";
import moment from 'moment/min/moment-with-locales';
import moment_tz from 'moment-timezone';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function AcessCard({ access }) {
    const navigation = useNavigation();

    const [dayOfWeek, setDayOfWeek] = useState('');
    const [dayOfMonth, setDayOfMonth] = useState('');
    const [currentTime, setCurrentTime] = useState('');

    const [accessStatus, setAccessStatus] = useState(access);


    function navigateToHome() {
        navigation.navigate('Home');
    }

    useEffect(() => {
        moment.locale('pt-br');

        setDayOfWeek(moment().format('dddd'));
        setDayOfMonth(moment().format('L'));

        const timeNow = moment_tz(moment()).tz('America/Sao_Paulo').format('LTS');

        setCurrentTime(timeNow);
    }, []);

    return (
        <>
            {accessStatus ?
                <>
                    <View style={styles.modalCard}>
                        <View style={styles.viewModal}>
                            <Text style={styles.statusMessage}>ENTRADA LIBERADA</Text>
                        </View>

                        <View style={styles.viewModal}>
                            <Feather name="check-square" color='#fff' size={58} style={styles.icon} />
                            <Text style={styles.statusDescription}>Apresente essa tela para entrar</Text>
                        </View >

                        <View style={styles.dateModal}>
                            <Text style={styles.statusDate}>Gerada em : {dayOfWeek}</Text>
                            <Text style={styles.statusDate}>Horário : {currentTime}</Text>
                            <Text style={styles.statusDate}>Data : {dayOfMonth}</Text>
                        </View>
                    </View>
                </>
                :
                <>
                    <View style={styles.modalDeniedCard}>
                        <View style={styles.viewModal}>
                            <Text style={styles.statusMessage}>ENTRADA NÃO</Text>
                            <Text style={styles.statusMessage}>AUTORIZADA</Text>
                        </View>

                        <View style={styles.viewModal}>
                            <Feather name="alert-triangle" color='#fff' size={58} style={styles.icon} />
                        </View >
                        <View style={styles.viewModal}>
                            <Text style={styles.deniedDescription}>Informe o seu Líder sobre</Text>
                            <Text style={styles.deniedDescription}>o ocorrido ou ligue para :</Text>
                            <Text style={styles.deniedDescription}>0800 xxx xxxx</Text>
                        </View>
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