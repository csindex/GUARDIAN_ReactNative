import React from "react";
import { 
    Alert,
    ImageBackground, 
    StatusBar, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./../styles"
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import * as SecureStore from 'expo-secure-store';
import * as Constants from './constants';

const LandingScreen = (props) => {
    let [fontsLoaded] = useFonts({
        'Inter-Black': require('./../../assets/fonts/Inter-Black.otf'),
        'Inter': require('./../../assets/fonts/Inter-Regular.otf'),
        'Inter-Bold': require('./../../assets/fonts/Inter-Bold.otf'),
        'Inter-Light': require('./../../assets/fonts/Inter-Light.otf'),
        'Inter-Medium': require('./../../assets/fonts/Inter-Medium.otf'),
        'Inter-SemiBold': require('./../../assets/fonts/Inter-SemiBold.otf'),
        'Inter-Thin': require('./../../assets/fonts/Inter-Thin.otf'),
    });
    // async function getIsAuthenticated() {
    //     const token = await SecureStore.getItemAsync(Constants.TOKEN_KEY);
    //     const f = await SecureStore.getItemAsync(Constants.IS_AUTHENTICATED_KEY);
    //     console.log('getIsAuthenticated-' + f + '-' + JSON.parse(f));
    //     if (JSON.parse(f)) {
    //         console.log('return true');
    //         // setIsAuthenticated(true);
    //         navigation.navigate('PostScreen', {token: token});
    //     }
    // }
    // React.useEffect(() => {
    //     console.log('useEffect');
    //     getIsAuthenticated();
    // }, []);
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <View style={styles.mainContainer}>
                <ImageBackground source={require('../../assets/common/bg-auth.png')} style={styles.landingScreenBgImage}>
                    <View style={styles.overlay}>
                        <Text adjustsFontSizeToFit style={lsStyles.guardianLabel}>GUARDIAN</Text>
                        <Text style={lsStyles.emergencyLabel}>Emergency Response at your Fingertips</Text>
                        <Text style={lsStyles.gLabel}>Geographic Unified Assistanace and Response to Distress Incidents with Agile Networking</Text>
                        <View style={lsStyles.buttonContainer}>
                            <TouchableOpacity 
                                style={lsStyles.signupBtn} 
                                activeOpacity={0.6}
                                onPress={() => Alert.alert('Signup!!!')}
                            >
                                <Text style={lsStyles.signupBtnText}>Sign-up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={lsStyles.loginBtn} 
                                activeOpacity={0.6}
                                onPress={() => props.handleSetScreen('login')}
                            >
                                <Text style={lsStyles.loginBtnText}>Login</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={lsStyles.footerContainer}>
                            <Text style={lsStyles.mLabel}>Computer Aided Dispatch and Civilian Reporting System</Text>
                            <Text style={lsStyles.gLabel}>Developed by Sugbotek Inc, an affiliate of 7Core Communications, Inc.</Text>
                            <Text style={lsStyles.gLabel}>© 2021 All Rights Reserved</Text>                    
                        </View>
                    </View>            
                </ImageBackground>
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

export default LandingScreen;