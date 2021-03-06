import React from "react";
import { 
    Alert,
    ImageBackground, 
    StyleSheet,
    Text, 
    TouchableOpacity, 
    View 
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./../styles"
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import '@expo/match-media';
// import { useMediaQuery } from "react-responsive";
import {
    widthPercentageToDP as wP,
    heightPercentageToDP as hP,
} from 'react-native-responsive-screen';
import { Snackbar } from 'react-native-paper';

const LandingScreen = (props) => {
    // console.log('landing ' + props.isLogout);
    // const isTabletOrMobileDevice = useMediaQuery({
    //     query: "(max-device-width: 1224px)",
    // });
    // const isDeviceWidth295_359 = useMediaQuery({
    //     query: "(min-device-width:295) and (max-device-width:359)",
    // });
    // const isDeviceWidth375_811 = useMediaQuery({
    //     query: "(min-device-width:375) and (max-device-height:800)",
    // });
    // const isDeviceWidth360_374 = useMediaQuery({
    //     query: "(min-device-width:360) and (max-device-width:374)",
    // });
    // if (isTabletOrMobileDevice) {
    //     if (isDeviceWidth295_359) {
    //         console.log('295_359');
    //     } else if (isDeviceWidth360_374) {
    //         console.log('360_374');
    //     } else if (isDeviceWidth375_811) {
    //         console.log('375_811');
    //     } else {
    //         console.log('else');
    //     }
    // }
    const [sbVisible, setSBVisible] = React.useState(props.isLogout);
    const [sbText, setSBText] = React.useState('Logged out successfully');
    const [sbBGColor, setSBBGColor] = React.useState('green');
    const onDismissSnackbar = () => {
        setSBVisible(false);
    }
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
        // const isIOS = (props.os === 'ios');
        return (
            <View style={styles.mainContainer}>
                <ImageBackground source={require('../../assets/common/bg-auth.png')} style={styles.landingScreenBgImage}>
                    <View style={styles.overlay}>
                        <Text 
                            adjustsFontSizeToFit 
                            // style={[lsStyles.guardianLabel, {
                            //     fontSize: (isDeviceWidth375_811) ? 40.0 : 56.0,
                            //     // letterSpacing: (isDeviceWidth375_811) ? 4.0 : 8.0,
                            // }]}
                            style={lsStyles.guardianLabel}
                        >
                            GUARDIAN
                        </Text>
                        <Text style={lsStyles.emergencyLabel}>Emergency Response at your Fingertips</Text>
                        <Text style={lsStyles.gLabel}>Geographic Unified Assistanace and Response to Distress Incidents with Agile Networking</Text>
                        <View style={lsStyles.buttonContainer}>
                            <TouchableOpacity 
                                style={lsStyles.signupBtn} 
                                activeOpacity={0.6}
                                onPress={() => handleSetScreen('signup')}
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
                        {/* <Text style={lsStyles.mLabel}>Computer Aided Dispatch and Civilian</Text>
                        <Text style={lsStyles.mLabel}>Reporting System</Text> */}
                    </View>
                    <View style={lsStyles.footerContainer}>
                        
                        <Text style={[lsStyles.gLabel, {paddingTop: 80.0}]}>Developed by Sugbotek Inc, an affiliate of 7Core Communications, Inc.</Text>
                        <Text style={lsStyles.gLabel}>?? 2021 All Rights Reserved</Text>                    
                    </View>
                    <Snackbar
                        visible={sbVisible}
                        style={{backgroundColor: sbBGColor}}
                        onDismiss={onDismissSnackbar}
                        duration={4500}
                    >{sbText}</Snackbar>            
                </ImageBackground>
            </View>
        );
    }
}

const lsStyles = StyleSheet.create({
    guardianLabel: {
        fontSize: hP('6%'),
        color: '#fff',
        letterSpacing: wP('1.3%'),
        fontFamily: 'Inter-SemiBold',
    },
    emergencyLabel: {
        fontSize: hP('1.9%'),
        color: '#fff',
        letterSpacing : 1.5,
        fontFamily: 'Inter-Light',
        textAlign: 'center',
    },
    gLabel: {
        fontSize: hP('1%'),
        color: '#fff',
        letterSpacing: 1.7,
        fontFamily: 'Inter-Light',
        textAlign: 'center',
    },
    buttonContainer: {
        marginTop: 8.0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20.0,
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
        position: 'absolute',
        bottom: 36.0,
        alignSelf: 'center',
    },
});

export default LandingScreen;