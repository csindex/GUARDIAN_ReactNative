import React from "react";
import { ImageBackground, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./../styles"
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

function LandingScreen() {
    let [fontsLoaded] = useFonts({
        'Inter-Black': require('./../../assets/fonts/Inter-Black.otf'),
        'Inter': require('./../../assets/fonts/Inter-Regular.otf'),
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
            <ImageBackground source={require('../../assets/common/bg-auth.png')} style={styles.landingScreenBgImage}>
                <View style={styles.overlay}/>
                <Text style={lsStyles.guardianLabel}>GUARDIAN</Text>
            </ImageBackground>
            </SafeAreaView>
        );
    }
}

const lsStyles = StyleSheet.create({
    guardianLabel: {
        fontSize: 56.0,
        color: '#fff',
        alignItems: 'center',
        letterSpacing: 8.0,
        fontFamily: 'Inter',
        fontWeight: '700',
        justifyContent: 'center',
    },
});

export default LandingScreen;