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
    faUserAlt,
    faEye, 
    faEyeSlash 
} from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import * as Constants from '../../core/utils/common/constants';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';

const ForgotPassScreen = (props) => {
    const navigation = useNavigation();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setErrorFlag] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(true);
    const onChangeEmailHandler = (e) => {
        setEmail(e);
    };
    const onChangePasswordHandler = (p) => {
        setPassword(p);
    };
    const onTogglePassword = (f) => {
        setHidePassword(f);
    }
    async function saveKeys(token) {
        await SecureStore.setItemAsync(Constants.EMAIL_KEY, email);
        await SecureStore.setItemAsync(Constants.TOKEN_KEY, token);
        await SecureStore.setItemAsync(Constants.IS_AUTHENTICATED_KEY, JSON.stringify(true));
    }
    async function getEmail() {
        const e = await SecureStore.getItemAsync(Constants.EMAIL_KEY);
        if (e) {
            setEmail(e);
        }
    }
    React.useEffect(() => {
        getEmail();
    }, []);
    const getCircularReplacer = () => {
        const seen = new WeakSet();
        return (key, value) => {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
        };
    };
    const login = async () => {
        if (email === '' || password === '') {
            // alert("Email or Password is invalid");
            setSBText('Email or Password is invalid');
            setSBBGColor('red');
            setSBVisible(true);
            return;
        } else if (password.length < 8) {
            setSBText('Password is too short');
            setSBBGColor('red');
            setSBVisible(true);
            return;
        }
        setIsLoading(true);
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
            // alert('aaa' + response.data);
            // if (response.status === 201) {
            //     alert('You have created: ${JSON.stringify(response.data, getCircularReplacer())}');
            //     setIsLoading(false);
            //     setFullName('');
            //     setEmail('');
            // } else {
            //     throw new Error("An error has occurred");
            // }
        } catch (error) {
            props.handleLoading(false);
            alert('oyy' + error);
            // setIsLoading(false);
        }
    };
    const logout = async () => {
        try {
            const config = {
                headers: {
                    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBiNGRiNmU1ZWRjOTIyMDg4YjAwNDJhIn0sImlhdCI6MTYzNjcwNzg4NH0.qjlOssnIzLOuIQmbVdZY1HzDqX3GjkNkBiIE2AXjkNU',
                },
            };
            console.log(`${Constants.BASE_URL}/api/users/online/${email}`);
            await axios.delete(Constants.BASE_URL + '/api/users/online/' + email, config)
                .then(res => {
                    alert('logout successful: ' + res.data.msg);
                }).catch(err => console.log('error logout ' + err.response.data.msg));
        } catch (error) {
            alert('oyy ' + error);
        }
    };
    const [sbVisible, setSBVisible] = React.useState(false);
    const [sbText, setSBText] = React.useState('');
    const [sbBGColor, setSBBGColor] = React.useState('green');
    const onDismissSnackbar = () => {
        setSBVisible(false);
    }
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
                        <View style={lsStyles.iconLabelContainer}>
                            <FontAwesomeIcon
                                style={lsStyles.icon} 
                                icon={ faEnvelope }
                            />
                            <Text style={lsStyles.label}>Enter your email address, for verification</Text>
                        </View>
                        <TextInput 
                            style={lsStyles.emailInput}
                            onChangeText={onChangeEmailHandler}
                            value={email}
                            placeholder='Email Address'
                        />
                        {/* <View style={lsStyles.passInputContainer}>
                            <TextInput 
                                style={lsStyles.passInput}
                                onChangeText={onChangePasswordHandler}
                                value={password}
                                placeholder='Password'
                                secureTextEntry={hidePassword}
                            />
                            <FontAwesomeIcon
                                style={lsStyles.eyeIcon} 
                                icon={hidePassword ? faEye : faEyeSlash}
                                onPress={() => onTogglePassword(!hidePassword)}
                            />
                        </View> */}
                        <TouchableOpacity
                            style={lsStyles.forgotPassBtnContainer}
                            activeOpacity={0.6}
                            onPress={() => {Alert.alert('Send OTP!!!')}}
                        >
                            <Text style={lsStyles.forgotPassBtnText}>Send OTP</Text>
                        </TouchableOpacity>
                        <Text style = {lsStyles.noAccount}>Don't have an account?
                            <Text onPress={()=> handleSetScreen('signup')} style = {lsStyles.signupLabel}> Sign Up</Text>
                        </Text>
                        {/* <Text style = {lsStyles.forgotPass}>Forgot Password?
                            <Text onPress={()=> someAction()} style = {lsStyles.forgotLabel}> Forgot</Text>
                        </Text> */}
                    </View>
                </View>
                <Snackbar
                    visible={sbVisible}
                    style={{backgroundColor: sbBGColor}}
                    onDismiss={onDismissSnackbar}
                    duration={4500}
                >{sbText}</Snackbar>
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
        marginStart: 16.0,
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