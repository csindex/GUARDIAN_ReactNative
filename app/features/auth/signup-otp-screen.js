import axios from 'axios';
import * as React from 'react';
import { 
    StatusBar, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,
    TextInput,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../core/utils/styles';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faUserAlt, 
    faEye, 
    faEyeSlash,
    faKey
} from '@fortawesome/free-solid-svg-icons';
import * as Constants from '../../core/utils/common/constants';
import * as SecureStore from 'expo-secure-store';
import { 
    Snackbar,
    Paragraph
} from 'react-native-paper';
import {
    widthPercentageToDP as wP,
    heightPercentageToDP as hP,
} from 'react-native-responsive-screen';
import LoadingScreen from './../../core/utils/common/loading-screen';

function SignupOtpScreen({route, navigation}) {
    const { data } = route.params;
    // console.log(data);
    const hideHeader = (flag) => {
        navigation.setOptions({
            headerShown: !flag,
        });
        setIsLoading(flag);
    };
    const [isLoading, setIsLoading] = React.useState(false);
    const [timer, setShowTimer] = React.useState({
        flag: false,
        sec: 5,
    });
    const generate = Math.floor(Math.random() * (772881 - 111181 + 1) + 111181);
    const [otp, setOTP] = React.useState(generate);
    const msg = `Hi ${data.name} ${data.lname}, Proceed with your registration for GUARDIAN Account.` +
        `Your One-Time PIN is ${otp}. OTP will expire in 15 minutes. If you did not initiate` +
        ' this request, please call your Operation Center Administrator.';
    // console.log(msg, ' timer ', timer);
    React.useEffect(() => {
        hideHeader(true);
        const id = 1;
        sendOTP(data.name, data.number, msg, otp, id);
    }, [otp]);
    const [formData, setFormData] = React.useState({
        sent_otp : '',
    });
    const { sent_otp } = formData;
    const onChange = (text, name) => {
        setFormData({...formData, [name] : text});
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
    React.useEffect(() => {
        setSBVisible({
            flag: false,
            sbText: '',
            sbBGColor: 'green',
        });
    }, []);
    const [isOTP, setIsOTP] = React.useState(false);
    const handleSetIsOTP = (flag) => setIsOTP(flag);
    const [hasError, setErrorFlag] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(true);
    const onTogglePassword = (f) => {
        setHidePassword(f);
    }
    const handleLoading = (flag) => {
        setIsLoading(flag);
    }
    React.useEffect(() => {
        // console.log('timer? ', timer);
        let xTimer;
        if(timer.sec > 0 & timer.flag) {
            xTimer = setTimeout(() => setShowTimer({flag: true, sec: timer.sec - 1}), 1000);
        } else {
            setShowTimer({flag: false, sec: -1});
        }
        return () => clearTimeout(xTimer);
    }, [timer.sec]);
    // React.useEffect(() => {
    //     setIsOTP(false);
    // }, [isOTP]);
    async function saveKeys(token) {
        await SecureStore.setItemAsync(Constants.EMAIL_KEY, data.email);
        await SecureStore.setItemAsync(Constants.TOKEN_KEY, token);
        await SecureStore.setItemAsync(Constants.IS_AUTHENTICATED_KEY, JSON.stringify(true));
    }
    const resendOtp = () => {
        setOTP(generate);
    };
    const proceedRegistration = () => {
        if (sent_otp === '' || sent_otp.length < 6) {
            setSBVisible({
                flag: true,
                sbText: 'Invalid OTP (6 digits)',
                sbBGColor: 'red',
            });
        } else {
            hideHeader(true);
            onMatch(data, sent_otp);
        }
    };
    const sendOTP = async (name, number, msg, otp, id) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
            };
            const body = JSON.stringify({number, name, msg, otp, id});
            await axios.post(Constants.BASE_URL + '/api/sms/sendOtpReg', body, config)
                .then(response => {
                    console.log('Response ', response.data);
                    if (!(JSON.stringify(response.data).includes('error'))) {
                        console.log('OTP Success!');
                        hideHeader(false);
                        setShowTimer({flag: true, sec: 300});
                    }
                })
                .catch(err => {
                    console.log('otp error - ', err);
                    try {
                        const errors = err.response.data.errors;
                        console.log(errors);
                        if (errors) {
                            errors.forEach(error => console.log(`try error ${error}`));
                        }
                    } catch (error) {
                        console.log(`catch error ${error}`);
                    }
                });
        } catch (error) {
            console.log(`catch 2 error ${error}`);
        }
    };
    const onMatch = async (d, sent_otp) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
            };
            const number = d.number;
            const body = JSON.stringify({number, sent_otp});
            // console.log('onMatch body ', body);
            await axios.post(Constants.BASE_URL + '/api/sms/onMatch', body, config)
                .then(response => {
                    // console.log('Response ', response.data);
                    if (!(JSON.stringify(response.data).includes('error'))) {
                        // console.log('OTP Success!');
                        // hideHeader(false);
                        registerUser(d.name, d.lname, d.number, d.email, d.password);
                    }
                })
                .catch(err => {
                    console.log('onMatch error - ', err)
                    hideHeader(false);
                    try {
                        const errors = err.response.data.errors;
                        console.log('onMatch error2 - ', errors)
                        if (errors) {
                            errors.forEach(error => setSBVisible({
                                flag: true,
                                sbText: error.msg,
                                sbBGColor: 'red',
                            }));
                        }
                    } catch (error) {
                        console.log(`catch error ${error}`);
                    }
                });
        } catch (error) {
            hideHeader(false);
            console.log(`catch 2 error ${error}`);
        }
    };
    const registerUser = async (name, lname, number, email, password) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
            };
            const body = JSON.stringify({name, lname, number, email, password});
            console.log('register body ', body);
            await axios.post(Constants.BASE_URL + '/api/users', body, config)
                .then(response => {
                    console.log('Response ', response.data);
                    if (!(JSON.stringify(response.data).includes('error'))) {
                        const newToken = JSON.stringify(response.data.token);
                        saveKeys(newToken);
                        console.log('OTP Success!');
                        hideHeader(false);
                        navigation.navigate('HomeScreen', {
                            token: newToken,
                            email: email,
                        });
                    }
                })
                .catch(err => {
                    console.log('onMatch error ', err, ' ', err.response.data);
                    hideHeader(false);
                    try {
                        const errors = err.response.data.errors;
                        if (errors) {
                            errors.forEach(error => navigation.navigate('SignupScreen', {
                                sb: JSON.stringify({
                                    flag: true,
                                    sbText: error.msg,
                                    sbBGColor: 'red',
                                }),
                            }));
                        }
                    } catch (error) {
                        console.log(`catch error ${error}`);
                    }
                });
        } catch (error) {
            hideHeader(false);
            console.log(`catch 2 error ${error}`);
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
                {isLoading ? 
                <LoadingScreen/> :
                <View style={styles.mainContainerBG}>
                    <View style={styles.formContainer}>
                        <Text style={lsStyles.mainLabel}>Register</Text>
                        <Paragraph style={lsStyles.iconLabelContainer}>
                            <Text style={{fontSize: 16.0, }}> </Text>
                            <FontAwesomeIcon
                                style={lsStyles.icon} 
                                icon={ faKey }
                            />
                            <Text style={lsStyles.label}> You will receive a One-Time PIN (OTP) 
                            on your registered mobile number.</Text>
                        </Paragraph>
                        <TextInput 
                            style={lsStyles.otpInput}
                            value={sent_otp}
                            keyboardType='phone-pad'
                            name='sent_otp'
                            onChangeText={t => onChange(t, 'sent_otp')}
                            placeholder='XXXXXX'
                            maxLength={6}
                        />
                        <Text style={[lsStyles.formInputNote, {alignSelf: 'center'}]}>Did you receive an OTP?</Text>
                        {timer.flag ?
                            <Text style={[lsStyles.formInputNote, {alignSelf: 'center', textAlign: 'center'}]}>
                                Resend OTP after {timer.sec} seconds
                            </Text> :
                            <TouchableOpacity
                                style={lsStyles.resendBtnContainer}
                                activeOpacity={0.6}
                                onPress={resendOtp}
                            >
                                <Text style={lsStyles.resendBtnText}>Resend OTP</Text>
                            </TouchableOpacity>
                        }
                        <Text style={[lsStyles.formInputNote, {alignSelf: 'center', textAlign: 'center'}]}>
                            If you need to change your mobile number, you may do so through Update Profile, or by reaching out to your Operation Center Administrator at admin@guardian.ph
                        </Text>
                        <TouchableOpacity
                            style={{alignSelf:'baseline'}}
                            activeOpacity={0.6}
                            onPress={proceedRegistration}
                        >
                            <View style={lsStyles.loginBtnContainer}>
                                    <Text style={lsStyles.loginBtnText}>Proceed</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>}
                {snackbar.flag && <Snackbar
                    visible={snackbar.flag}
                    style={{backgroundColor: snackbar.sbBGColor}}
                    onDismiss={onDismissSnackbar}
                    duration={1500}
                >{snackbar.sbText}</Snackbar>}
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
        // marginStart: 12.0
    },
    icon: {
        // marginStart: 12.0,
    },
    label: {
        fontSize: 20.0,
        marginStart: 4.0,
    },
    loginBtnContainer: {
        marginTop: 8.0,
        alignContent: 'center',
        justifyContent: 'center',
    },
    loginBtnText: {
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
                lineHeight: 48.0, // same as height
            },
            android: {}
        })
    },
    normalInput: {
        height: 48.0,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4.0,
        marginTop: 10.0,
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
        // backgroundColor: '#1f1f1f'
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
    formInputNote: {
        fontSize: hP('1.7%'), 
        color: '#1f1f1f', 
        marginTop: 4.0, 
        fontFamily: 'Inter',
    },
    otpInput: {
        height: 64.0,
        borderWidth: 1,
        padding: 10,
        borderRadius: 4.0,
        marginTop: 10.0,
        fontSize: hP('2.5%'),
        textAlign: 'center',
        textAlignVertical: 'center',
        letterSpacing: wP('1.5%'),
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    resendBtnContainer: {
        marginTop: 4.0,
        alignContent: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    resendBtnText: {
        width: 116.0,
        height: 36.0,
        borderRadius: 2.0,
        borderColor: '#000',
        borderWidth: 1.0,
        backgroundColor: '#dddddd',
        color: '#000',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: 16.0,
        fontFamily: 'Inter',
        justifyContent: 'center',
    },
});

export default SignupOtpScreen;