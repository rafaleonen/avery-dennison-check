import React from 'react';
import { Text, Image, View } from 'react-native';

import logo from '../../assets/logo_m.png';
import styles from './styles';

export default function HeaderHome() {
    return (
        <View style={styles.header}>
            <Image source={logo} style={styles.logo} />
            <View style={styles.bottomBorder} />
            <Text style={styles.headerText}>COVID19 - Precheck</Text>
        </View>
    );
}