import React from "react";
import { 
    Image,
    StyleSheet, 
    View 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./../styles"
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

const LoadingScreen = () => {
    let [fontsLoaded] = useFonts({
        'Inter-Black': require('./../../assets/fonts/Inter-Black.otf'),
        'Inter': require('./../../assets/fonts/Inter-Regular.otf'),
        'Inter-Bold': require('./../../assets/fonts/Inter-Bold.otf'),
        'Inter-Light': require('./../../assets/fonts/Inter-Light.otf'),
        'Inter-Medium': require('./../../assets/fonts/Inter-Medium.otf'),
        'Inter-SemiBold': require('./../../assets/fonts/Inter-SemiBold.otf'),
        'Inter-Thin': require('./../../assets/fonts/Inter-Thin.otf'),
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <View style={[styles.mainContainer, {backgroundColor: '#215a75', justifyContent: 'center'}]}>
                <Image 
                    style={{alignSelf: 'center', height: 200.0, width: 200.0}}
                    source={require('./../../assets/common/small-logo.png')}
                />
            </View>
        );
    }
}

const lsStyles = StyleSheet.create({
    guardianLabel: {
        fontSize: 56.0,
        color: '#fff',
        letterSpacing: 8.0,
        fontFamily: 'Inter-SemiBold',
    },
    emergencyLabel: {
        fontSize: 16.0,
        color: '#fff',
        letterSpacing : 1.5,
        fontFamily: 'Inter-Light',
        textAlign: 'center',
    },
    gLabel: {
        fontSize: 8.0,
        color: '#fff',
        letterSpacing: 1.5,
        fontFamily: 'Inter-Thin',
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 8.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    signupBtn: {
        width: 144.0,
        height: 36.0,
        marginStart: 8.0,
        marginEnd: 4.0,
        borderRadius: 4.0,
        backgroundColor: '#215a75',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupBtnText: {
        color: '#fff',
        fontFamily: 'Inter',
    },
    loginBtn: {
        width: 144.0,
        height: 36.0,
        marginStart: 4.0,
        marginEnd: 8.0,
        borderRadius: 4.0,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginBtnText: {
        color: '#000',
        fontFamily: 'Inter',
    },
    mLabel: {
        color: '#fff',
        letterSpacing : 1.5,
        fontFamily: 'Inter-Light',
        textAlign: 'center',
    },
    footerContainer: {
        marginTop: 200.0,
    },
});

export default LoadingScreen;