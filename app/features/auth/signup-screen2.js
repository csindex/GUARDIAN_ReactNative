import axios from 'axios';
import * as React from 'react';
import { 
    StatusBar, 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,
    TextInput,
    ScrollView,
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
import { 
    Snackbar,
    Paragraph
} from 'react-native-paper';
import {
    widthPercentageToDP as wP,
    heightPercentageToDP as hP,
} from 'react-native-responsive-screen';

function SignupScreen({route, navigation}) {
    const sb = route.params?.sb;
    const [hidePassword, setHidePassword] = React.useState(true);
    const onTogglePassword = (f) => {
        setHidePassword(f);
    }
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
        setFormData({...formData, [name] : text});
    };
    const [snackbar, setSBVisible] = React.useState({
        flag: false,
        sbText: '',
        sbBGColor: 'green',
    });
    // console.log(snackbar, route.params.snackbar);
    React.useEffect(() => {
        if (sb) {
            // console.log(JSON.parse(sb), snackbar);
            const newSb = JSON.parse(sb);
            setSBVisible({
                flag: newSb.flag,
                sbText: newSb.sbText,
                sbBGColor: newSb.sbBGColor,
            });
        }
    }, [route]);
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
    const validatePhone = (number) => {
        var re = /^(09)\d{9}$/;
        return re.test(number);
    }
    const submit = () => {
        if (name === '' || lname === '' || number === '' || 
            email === '' || password === '') {
                setSBVisible({
                    flag: true,
                    sbText: 'Please input necessary details',
                    sbBGColor: 'red',
                });
        } else {
            if (password !== password2) {
                setSBVisible({
                    flag: true,
                    sbText: 'Passwords do not match',
                    sbBGColor: 'red',
                });
            } else if (password.length < 8) {
                setSBVisible({
                    flag: true,
                    sbText: 'Password is too short (atleast 8 characters)',
                    sbBGColor: 'red',
                });
            } else {
                if (validatePhone(number)) {
                    if (validateEmail(email)) {
                        navigation.navigate('SignupOtpScreen', {
                            data: formData,
                        })
                    } else {
                        setSBVisible({
                            flag: true,
                            sbText: 'Please provide a valid email address',
                            sbBGColor: 'red',
                        }); 
                    }
                } else {
                    setSBVisible({
                        flag: true,
                        sbText: 'Please provide a valid Philippines mobile number starting with \"09\"',
                        sbBGColor: 'red',
                    });
                }
            }
        }
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
                <ScrollView>
                    <View style={styles.mainContainerBG}>
                        <View style={styles.formContainer}>
                            <Text style={styles.formMainLabel}>Register</Text>
                            <Paragraph style={styles.formLabelWithIconContainer}>
                                <Text style={styles.formLabelWithIconLabel}>  </Text>
                                <FontAwesomeIcon
                                    style={styles.formLabelIcon} 
                                    icon={ faUserAlt }
                                />
                                <Text style={styles.formLabelWithIconLabel}> Create Your Account</Text>
                            </Paragraph>
                            <TextInput
                                style={styles.formInput1}
                                value={name}
                                name='name'
                                placeholder='First Name'
                                onChangeText={t => onChange(t, 'name')}
                            />
                            <TextInput 
                                style={styles.formInput1}
                                // onChangeText={onChangeLNameHandler}
                                value={lname}
                                name='lname'
                                onChangeText={t => onChange(t, 'lname')}
                                placeholder='Last Name'
                            />
                            <TextInput 
                                style={styles.formInput1}
                                // onChangeText={onChangeMobileHandler}
                                value={number}
                                keyboardType='phone-pad'
                                name='number'
                                onChangeText={t => onChange(t, 'number')}
                                placeholder='Mobile Number'
                                maxLength={11}
                            />
                            <Text style={styles.formInputNote}>
                                This site uses your mobile number for authentication, sending alerts and other communication.
                            </Text>
                            <TextInput 
                                style={styles.formInput1}
                                // onChangeText={onChangeEmailHandler}
                                value={email}
                                name='email'
                                onChangeText={t => onChange(t, 'email')}
                                keyboardType='email-address'
                                placeholder='Email Address'
                            />
                            <View style={styles.formInputWithIconContainer}>
                                <TextInput 
                                    style={styles.formInputWithIcon}
                                    // onChangeText={onChangePasswordHandler}
                                    value={password}
                                    onChangeText={t => onChange(t, 'password')}
                                    placeholder='Password'
                                    secureTextEntry={hidePassword}
                                />
                                <View style={styles.formInputIconContainer}>
                                    <TouchableOpacity onPress={() => onTogglePassword(!hidePassword)}>
                                        <FontAwesomeIcon
                                            style={styles.formInputIcon} 
                                            icon={hidePassword ? faEye : faEyeSlash}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={styles.formInputWithIconContainer}>
                                <TextInput 
                                    style={styles.formInputWithIcon}
                                    // onChangeText={onChangeCPasswordHandler}
                                    value={password2}
                                    name='password2'
                                    onChangeText={t => onChange(t, 'password2')}
                                    placeholder='Confirm Password'
                                    secureTextEntry={hidePassword}
                                />
                                <View style={styles.formInputIconContainer}>
                                    <TouchableOpacity onPress={() => onTogglePassword(!hidePassword)}>
                                        <FontAwesomeIcon
                                            style={styles.formInputIcon} 
                                            icon={hidePassword ? faEye : faEyeSlash}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <TouchableOpacity
                                style={{alignSelf:'baseline'}}
                                activeOpacity={0.6}
                                onPress={submit}
                            >
                                <View style={styles.mainBtnContainer}>
                                        <Text style={styles.mainBtnText}>Register</Text>
                                </View>
                            </TouchableOpacity>
                            <Text style={styles.textBtnLabel1}>Already have an account?
                                <Text 
                                    style={styles.textBtnLabel}
                                    onPress={() => navigation.navigate('LoginScreen', {})} 
                                > Sign In</Text>
                            </Text>
                        </View>
                    </View>
                </ScrollView>
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
});

export default SignupScreen;