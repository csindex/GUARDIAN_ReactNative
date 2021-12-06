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
<<<<<<< HEAD
import { 
    faUserAlt, 
    faEye, 
    faEyeSlash,
    faKey
} from '@fortawesome/free-solid-svg-icons';
import * as Constants from '../../core/utils/common/constants';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { 
    Snackbar,
    Paragraph
} from 'react-native-paper';
import {
    widthPercentageToDP as wP,
    heightPercentageToDP as hP,
} from 'react-native-responsive-screen';

const SignupScreen = (props) => {
    console.log('called again?');
    const navigation = useNavigation();
    const [isOTP, setIsOTP] = React.useState(false);
    const handleSetIsOTP = (flag) => setIsOTP(flag);
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setErrorFlag] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(true);
    const onTogglePassword = (f) => {
        setHidePassword(f);
    }
    // React.useEffect(() => {
    //     setIsOTP(false);
    // }, [isOTP]);
    // async function saveKeys(token) {
    //     await SecureStore.setItemAsync(Constants.EMAIL_KEY, email);
    //     await SecureStore.setItemAsync(Constants.TOKEN_KEY, token);
    //     await SecureStore.setItemAsync(Constants.IS_AUTHENTICATED_KEY, JSON.stringify(true));
    // }
    const [formData, setFormData] = React.useState({
        name : '',
        lname : '',
        number : '',
        email : '',
        password : '',
        password2 : '',
    });
    const { name, lname, number, email, password, password2 } = formData;
    const onChange = (text, name) => {
        // console.log(text, name, formData);
        setFormData({...formData, [name] : text});
    };
=======
import { faUserAlt, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import * as Constants from '../../core/utils/common/constants';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';
import { Snackbar } from 'react-native-paper';

const SignupScreen = (props) => {
    const navigation = useNavigation();
    const [fName, setFName] = React.useState('');
    const [lName, setLName] = React.useState('');
    const [mobile, setMobile] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [cPassword, setCPassword] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [hasError, setErrorFlag] = React.useState(false);
    const [hidePassword, setHidePassword] = React.useState(true);
    const onChangeFNameHandler = (f) => {
        setFName(f);
    };
    const onChangeLNameHandler = (l) => {
        setLName(l);
    };
    const onChangeMobileHandler = (m) => {
        setMobile(m);
    };
    const onChangeEmailHandler = (e) => {
        setEmail(e);
    };
    const onChangePasswordHandler = (p) => {
        setPassword(p);
    };
    const onChangeCPasswordHandler = (cp) => {
        setCPassword(cp);
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
>>>>>>> 0626ad1a9d091c2dcf639a120fbc7a8455d85d6f
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
<<<<<<< HEAD
=======
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
>>>>>>> 0626ad1a9d091c2dcf639a120fbc7a8455d85d6f
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
<<<<<<< HEAD
                    {isOTP ? 
                    <RegisterOTPForm
                        formData={formData}
                        name={name}
                        lname={lname}
                        number={number}
                        handleLoading={props.handleLoading}
                        handleSetIsOTP={handleSetIsOTP}
                    /> : 
                    <RegisterForm 
                        name={name}
                        lname={lname}
                        number={number}
                        email={email}
                        password={password}
                        password2={password2}
                        hidePassword={hidePassword}
                        onTogglePassword={onTogglePassword}
                        onChange={onChange}
                        handleSetIsOTP={handleSetIsOTP}
                        formData={formData}
                    />}
=======
                    <View style={styles.formContainer}>
                        <Text style={lsStyles.mainLabel}>Register</Text>
                        <View style={lsStyles.iconLabelContainer}>
                            <FontAwesomeIcon
                                style={lsStyles.icon} 
                                icon={ faUserAlt }
                            />
                            <Text style={lsStyles.label}>Create Your Account</Text>
                        </View>
                        <TextInput 
                            style={lsStyles.normalInput}
                            onChangeText={onChangeFNameHandler}
                            value={fName}
                            placeholder='First Name'
                        />
                        <TextInput 
                            style={lsStyles.normalInput}
                            onChangeText={onChangeLNameHandler}
                            value={lName}
                            placeholder='Last Name'
                        />
                        <TextInput 
                            style={lsStyles.normalInput}
                            onChangeText={onChangeMobileHandler}
                            value={mobile}
                            placeholder='Mobile Number'
                        />
                        <Text style={{fontSize: 16.0, color: '#1f1f1f', marginTop: 4.0, fontFamily: 'Inter'}}>
                            This site uses your mobile number for authentication, sending alerts and other communication.
                        </Text>
                        <TextInput 
                            style={lsStyles.normalInput}
                            onChangeText={onChangeEmailHandler}
                            value={email}
                            placeholder='Email Address'
                        />
                        <View style={lsStyles.passInputContainer}>
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
                        </View>
                        <View style={lsStyles.passInputContainer}>
                            <TextInput 
                                style={lsStyles.passInput}
                                onChangeText={onChangeCPasswordHandler}
                                value={cPassword}
                                placeholder='Confirm Password'
                                secureTextEntry={hidePassword}
                            />
                            <FontAwesomeIcon
                                style={lsStyles.eyeIcon} 
                                icon={hidePassword ? faEye : faEyeSlash}
                                onPress={() => onTogglePassword(!hidePassword)}
                            />
                        </View>
                        <TouchableOpacity
                            style={lsStyles.loginBtnContainer}
                            activeOpacity={0.6}
                            onPress={() => {Alert.alert('Sign Up!!!')}}
                        >
                            <Text style={lsStyles.loginBtnText}>Register</Text>
                        </TouchableOpacity>
                        <Text style = {lsStyles.noAccount}>Already have an account?
                            <Text onPress={()=> handleSetScreen('login')} style = {lsStyles.signupLabel}> Sign In</Text>
                        </Text>
                    </View>
>>>>>>> 0626ad1a9d091c2dcf639a120fbc7a8455d85d6f
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

<<<<<<< HEAD
const RegisterForm = (props) => {
    const submit = async c => {
        c.preventDefault();
        if (props.formData.password === props.formData.password2) {
            console.log('EQUALS!!!!');
            props.handleSetIsOTP(true);
        } else {
            console.log('ESHI!!!!');
        }
    }
    return(
        <View style={styles.formContainer}>
            <Text style={lsStyles.mainLabel}>Register</Text>
            <View style={lsStyles.iconLabelContainer}>
                <FontAwesomeIcon
                    style={lsStyles.icon} 
                    icon={ faUserAlt }
                />
                <Text style={lsStyles.label}>Create Your Account</Text>
            </View>
            <TextInput
                style={lsStyles.normalInput}
                value={props.name}
                name='name'
                placeholder='First Name'
                onChangeText={t => props.onChange(t, 'name')}
            />
            <TextInput 
                style={lsStyles.normalInput}
                // onChangeText={onChangeLNameHandler}
                value={props.lname}
                name='lname'
                onChangeText={t => props.onChange(t, 'lname')}
                placeholder='Last Name'
            />
            <TextInput 
                style={lsStyles.normalInput}
                // onChangeText={onChangeMobileHandler}
                value={props.number}
                keyboardType='phone-pad'
                name='number'
                onChangeText={t => props.onChange(t, 'number')}
                placeholder='Mobile Number'
            />
            <Text style={lsStyles.formInputNote}>
                This site uses your mobile number for authentication, sending alerts and other communication.
            </Text>
            <TextInput 
                style={lsStyles.normalInput}
                // onChangeText={onChangeEmailHandler}
                value={props.email}
                name='email'
                onChangeText={t => props.onChange(t, 'email')}
                keyboardType='email-address'
                placeholder='Email Address'
            />
            <View style={lsStyles.passInputContainer}>
                <TextInput 
                    style={lsStyles.passInput}
                    // onChangeText={onChangePasswordHandler}
                    value={props.password}
                    onChangeText={t => props.onChange(t, 'password')}
                    placeholder='Password'
                    secureTextEntry={props.hidePassword}
                />
                <FontAwesomeIcon
                    style={lsStyles.eyeIcon} 
                    icon={props.hidePassword ? faEye : faEyeSlash}
                    onPress={() => props.onTogglePassword(!props.hidePassword)}
                />
            </View>
            <View style={lsStyles.passInputContainer}>
                <TextInput 
                    style={lsStyles.passInput}
                    // onChangeText={onChangeCPasswordHandler}
                    value={props.password2}
                    name='password2'
                    onChangeText={t => props.onChange(t, 'password2')}
                    placeholder='Confirm Password'
                    secureTextEntry={props.hidePassword}
                />
                <FontAwesomeIcon
                    style={lsStyles.eyeIcon} 
                    icon={props.hidePassword ? faEye : faEyeSlash}
                    onPress={() => props.onTogglePassword(!props.hidePassword)}
                />
            </View>
            <TouchableOpacity
                style={lsStyles.loginBtnContainer}
                activeOpacity={0.6}
                onPress={
                    (c) => /**{Alert.alert('Sign Up!!!')}*/{
                        submit(c);
                    }
                }
            >
                <Text style={lsStyles.loginBtnText}>Register</Text>
            </TouchableOpacity>
            <Text style = {lsStyles.noAccount}>Already have an account?
                <Text onPress={()=> handleSetScreen('login')} style = {lsStyles.signupLabel}> Sign In</Text>
            </Text>
        </View>
    );
};

const RegisterOTPForm = (props) => {
    const [showTimer, setShowTimer] = React.useState(true);
    const [s, setSeconds] = React.useState(300);
    const generate = Math.floor(Math.random() * (772881 - 111181 + 1) + 111181);
    const [otp, setOTP] = React.useState(generate);
    const msg = `Hi ${props.name} ${props.lname}, Proceed with your registration for GUARDIAN Account.` +
        `Your One-Time PIN is ${otp}. OTP will expire in 15 minutes. If you did not initiate` +
        ' this request, please call your Operation Center Administrator.';
    React.useEffect(() => {
        // console.log(msg);
        sendOTP(`${props.name} ${props.lname}`, props.number, msg, otp, 'register');
    }, []);
    const [formData, setFormData] = React.useState({
        sent_otp : '',
    });
    const { sent_otp } = formData;
    const onChange = async (text, name) => setFormData({...formData, [name] : text});
    const startTimer = () => {
        if (s > 0) {
            setTimeout(() => setSeconds(s - 1), 1000);
        } else {
            setShowTimer(false);
        }
    }
    // React.useEffect(() => {
    //     if(s > 0) {
    //         setTimeout(() => setSeconds(s - 1), 1000);
    //     } else {
    //         setShowTimer(false);
    //     }
    // }, [s]);
    const resend = () => {

    };
    const sendOTP = async (name, number, msg, otp, user) => {
        try {
            props.handleLoading(true);
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
            };
            const body = JSON.stringify({number, name, msg, otp, user});
            let mounted = true;
            await axios.post(Constants.BASE_URL + '/api/sms/sendOtp', body, config)
                .then(response => {
                    console.log(response.data);
                    if (!(JSON.stringify(response.data).includes('error'))) {
                        // console.log('aww');
                        props.handleLoading(false);
                        props.handleSetIsOTP(true);
                        startTimer();
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
    return(
        <View style={styles.formContainer}>
            <Text style={lsStyles.mainLabel}>Register</Text>
            <Paragraph style={lsStyles.iconLabelContainer}>
                <FontAwesomeIcon
                    style={lsStyles.icon} 
                    icon={ faKey }
                />
                <Text style={lsStyles.label}> You will receive a One-Time PIN (OTP) on your registered mobile number.</Text>
            </Paragraph>
            <TextInput 
                style={lsStyles.otpInput}
                // onChangeText={onChangeMobileHandler}
                value={sent_otp}
                keyboardType='phone-pad'
                name='sent_otp'
                onChangeText={t => onChange(t, 'sent_otp')}
                placeholder='XXXXXX'
                maxLength={6}
            />
            <Text style={[lsStyles.formInputNote, {alignSelf: 'center'}]}>Did you receive an OTP?</Text>
            {showTimer ?
                <Text style={[lsStyles.formInputNote, {alignSelf: 'center', textAlign: 'center'}]}>
                    Resend OTP after {s} seconds
                </Text> :
                <TouchableOpacity
                    style={lsStyles.resendBtnContainer}
                    activeOpacity={0.6}
                    onPress={
                        (c) => /**{Alert.alert('Sign Up!!!')}*/{
                            submit(c);
                        }
                    }
                >
                    <Text style={lsStyles.resendBtnText}>Resend OTP</Text>
                </TouchableOpacity>
            }
            <Text style={[lsStyles.formInputNote, {alignSelf: 'center', textAlign: 'center'}]}>
                If you need to change your mobile number, you may do so through Update Profile, or by reaching out to your Operation Center Administrator at admin@guardian.ph
            </Text>
            <TouchableOpacity
                style={lsStyles.loginBtnContainer}
                activeOpacity={0.6}
                onPress={resend}
            >
                <Text style={lsStyles.loginBtnText}>Proceed</Text>
            </TouchableOpacity>
        </View>
    );
};

=======
>>>>>>> 0626ad1a9d091c2dcf639a120fbc7a8455d85d6f
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
<<<<<<< HEAD
        marginStart: 12.0
=======
>>>>>>> 0626ad1a9d091c2dcf639a120fbc7a8455d85d6f
    },
    icon: {
        marginStart: 16.0,
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
<<<<<<< HEAD
                lineHeight: 48.0, // same as height
=======
                lineHeight: 48.0, // as same as height
>>>>>>> 0626ad1a9d091c2dcf639a120fbc7a8455d85d6f
            },
            android: {}
        })
    },
    normalInput: {
        height: 48.0,
        borderWidth: 1,
        padding: 10,
<<<<<<< HEAD
        borderRadius: 4.0,
=======
        borderRadius: 8.0,
>>>>>>> 0626ad1a9d091c2dcf639a120fbc7a8455d85d6f
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
<<<<<<< HEAD
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
=======
>>>>>>> 0626ad1a9d091c2dcf639a120fbc7a8455d85d6f
});

export default SignupScreen;