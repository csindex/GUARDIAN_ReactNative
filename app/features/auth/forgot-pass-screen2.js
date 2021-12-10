import axios from 'axios';
import * as React from 'react';
import { 
    StatusBar, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,
    TextInput,
    Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../core/utils/styles';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faEye, 
    faEyeSlash 
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import * as Constants from '../../core/utils/common/constants';
import * as SecureStore from 'expo-secure-store';
import { Snackbar, Paragraph } from 'react-native-paper';

function ForgotPassScreen({route, navigation}) {
    const [email, setEmail] = React.useState("");
    const hideHeader = (flag) => {
        navigation.setOptions({
            headerShown: !flag,
        });
        setIsLoading(flag);
    };
    const [isLoading, setIsLoading] = React.useState(false);
    const onChangeEmailHandler = (e) => {
        setEmail(e);
    };
    const [snackbar, setSBVisible] = React.useState({
        flag: false,
        sbText: '',
        sbBGColor: 'green',
    });
    const onDismissSnackbar = () => {
        setSBVisible({
            flag: false,
            sbText: '',
            sbBGColor: 'green',
        });
    }
    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    const getDetails = async () => {
        if (email === '') {
            setSBVisible({
                flag: true,
                sbText: 'Please enter email address',
                sbBGColor: 'red',
            });
            return;
        } else if (!validateEmail(email)) {
            setSBVisible({
                flag: true,
                sbText: 'Email Address is invalid',
                sbBGColor: 'red',
            });
            return;
        }
        try {
            props.handleLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
            };
            const body = JSON.stringify({email, password});
            let mounted = true;
            // console.log(body);
            /*const response = */await axios.post(Constants.BASE_URL + '/api/auth', body, config)
                .then(response => {
                    // console.log(response.data);
                    if (!(JSON.stringify(response.data).includes('error'))) {
                        const newToken = JSON.stringify(response.data.token);
                        saveKeys(newToken);
                        if (mounted) {
                            // setPassword('');
                            props.handleLoading(false);
                            // props.handleSetScreen('landing');
                            navigation.navigate('HomeScreen', {
                                token: newToken,
                                email: email
                            });
                        }
                    }
                })
                .catch(err => {
                    props.handleLoading(false);
                    console.log(`${err}`)
                    try {
                        const errors = err.response.data.errors;
                        if (errors) {
                            errors.forEach(error => alert(error.msg));
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
            return () => mounted = false;
        } catch (error) {
            props.handleLoading(false);
            alert('oyy' + error);
        }
    };
    let [fontsLoaded] = useFonts({
        'Inter-Black': require('./../../core/assets/fonts/Inter-Black.otf'),
        'Inter': require('./../../core/assets/fonts/Inter-Regular.otf'),
        'Inter-Bold': require('./../../core/assets/fonts/Inter-Bold.otf'),
        'Inter-Light': require('./../../core/assets/fonts/Inter-Light.otf'),
        'Inter-Medium': require('./../../core/assets/fonts/Inter-Medium.otf'),
        'Inter-SemiBold': require('./../../core/assets/fonts/Inter-SemiBold.otf'),
        'Inter-Thin': require('./../../core/assets/fonts/Inter-Thin.otf'),
        'Solid-Icons': require('./../../core/assets/fonts/fa-solid-900.ttf'),
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
                    <View style={styles.formContainer}>
                        <Text style={lsStyles.mainLabel}>Forgot Password</Text>
                        <Paragraph style={lsStyles.iconLabelContainer}>
                            <FontAwesomeIcon
                                style={lsStyles.icon} 
                                icon={ faEnvelope }
                            />
                            <Text style={lsStyles.label}> Enter your email address, for verification</Text>
                        </Paragraph>
                        <TextInput 
                            style={lsStyles.emailInput}
                            onChangeText={onChangeEmailHandler}
                            value={email}
                            placeholder='Email Address'
                        />
                        <TouchableOpacity
                            style={{alignSelf:'baseline'}}
                            activeOpacity={0.6}
                            onPress={getDetails}
                        >
                            <View style={lsStyles.loginBtnContainer}>
                                <Text style={lsStyles.forgotPassBtnText}>Send OTP</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style = {lsStyles.noAccount}>Don't have an account?
                            <Text onPress={()=> navigation.navigate('SignupScreen', {})} style = {lsStyles.signupLabel}> Sign Up</Text>
                        </Text>
                    </View>
                </View>
                <Snackbar
                    visible={snackbar.flag}
                    style={{backgroundColor: snackbar.sbBGColor}}
                    onDismiss={onDismissSnackbar}
                    duration={1500}
                >{snackbar.sbText}</Snackbar>
            </SafeAreaView>
        );
    }
};

const lsStyles = StyleSheet.create({
    mainLabel: {
        fontSize: 36.0,
        color: '#215a75',
        fontFamily: 'Inter-Bold',
        letterSpacing: 1.5,
    },
    iconLabelContainer: {
        flexDirection: 'row',
        marginTop: 16.0,
        alignItems: 'center',
    },
    icon: {
        // marginStart: 12.0,
    },
    label: {
        fontSize: 20.0,
        marginStart: 4.0,
    },
    forgotPassBtnContainer: {
        marginTop: 8.0,
        alignContent: 'center',
        justifyContent: 'center',
    },
    forgotPassBtnText: {
        width: 116.0,
        height: 48.0,
        borderRadius: 4.0,
        backgroundColor: '#215a75',
        color: '#fff',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 16.0,
        fontFamily: 'Inter',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                lineHeight: 48.0, // as same as height
            },
            android: {}
        })
    },
    emailInput: {
        height: 48.0,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8.0,
        marginTop: 16.0,
        fontSize: 16.0,
    },
    passInputContainer: {
        flexDirection: 'row',
        marginTop: 8.0,
        justifyContent: 'flex-end',
    },
    passInput: {
        flex: 1, 
        height: 48.0,
        borderWidth: 1,
        padding: 10,
        borderRadius: 8.0,
        fontSize: 16.0,
    },
    eyeIcon: {
        marginEnd: 8.0,
        alignSelf: 'center',
        position: 'absolute',
        right: 4.0,
    },
    noAccount: {
        marginTop: 16.0,
        fontSize: 20.0,
    },
    signupLabel: {
        marginStart: 8.0,
        color: '#215a75',
    },
    forgotPass: {
        marginTop: 8.0,
        fontSize: 20.0,
    },
    forgotLabel: {
        marginStart: 8.0,
        color: '#215a75',
    },
});

export default ForgotPassScreen;