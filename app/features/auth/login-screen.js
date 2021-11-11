import axios from 'axios';
import * as React from 'react';

import { 
    Alert,
    ImageBackground, 
    StatusBar, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './../../core/utils/styles';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

const baseUrl = 'http://10.128.50.136:3000';

export default function LoginScreen() {
    let [fontsLoaded] = useFonts({
        'Inter-Black': require('./../../core/assets/fonts/Inter-Black.otf'),
        'Inter': require('./../../core/assets/fonts/Inter-Regular.otf'),
        'Inter-Bold': require('./../../core/assets/fonts/Inter-Bold.otf'),
        'Inter-Light': require('./../../core/assets/fonts/Inter-Light.otf'),
        'Inter-Medium': require('./../../core/assets/fonts/Inter-Medium.otf'),
        'Inter-SemiBold': require('./../../core/assets/fonts/Inter-SemiBold.otf'),
        'Inter-Thin': require('./../../core/assets/fonts/Inter-Thin.otf'),
    });

    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <SafeAreaView style={styles.mainContainer}>
                <StatusBar 
                    barStyle='light-content'
                    backgroundColor='#174052'
                />
                <View style={styles.mainContainerBG}>
                    <Text style={{fontSize:36.0}}>GUARDIAN</Text>
                </View>
            </SafeAreaView>
        );
    }
}