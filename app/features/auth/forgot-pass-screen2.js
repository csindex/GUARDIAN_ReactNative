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
import LoadingScreen from '../../core/utils/common/loading-screen';

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
        hideHeader(true);
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
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                },
            };
            const body = JSON.stringify({email});
            // console.log(body);
            /*const response = */await axios.post(Constants.BASE_URL + '/api/auth/forgot', body, config)
                .then(response => {
                    console.log(response.data);
                    if (!(JSON.stringify(response.data).includes('error'))) {
                    }
                    hideHeader(false);
                })
                .catch(err => {
                    console.log(err)
                    try {
                        const errors = err.response.data.errors;
                        if (errors) {
                            hideHeader(false);
                            errors.forEach(error => setSBVisible({
                                flag: true,
                                sbText: error.msg,
                                sbBGColor: 'red',
                            }));
                        }
                    } catch (error) {
                        console.log(error);
                    }
                });
        } catch (error) {
            alert('oyy' + error);
            hideHeader(false);
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
                        <Text style={styles.formMainLabel}>Forgot Password</Text>
                        <Paragraph style={styles.formLabelWithIconContainer}>
                            <Text style={styles.formLabelWithIconLabel}>  </Text>
                            <FontAwesomeIcon
                                style={styles.formLabelIcon} 
                                icon={ faEnvelope }
                            />
                            <Text style={styles.formLabelWithIconLabel}> Enter your email address, for verification</Text>
                        </Paragraph>
                        <TextInput 
                            style={styles.formInput1}
                            onChangeText={onChangeEmailHandler}
                            value={email}
                            placeholder='Email Address'
                        />
                        <TouchableOpacity
                            style={{alignSelf:'baseline'}}
                            activeOpacity={0.6}
                            onPress={getDetails}
                        >
                            <View style={styles.mainBtnContainer}>
                                <Text style={styles.mainBtnText}>Send OTP</Text>
                            </View>
                        </TouchableOpacity>
                        <Text style = {styles.textBtnLabel1}>Don't have an account?
                            <Text onPress={()=> navigation.navigate('SignupScreen', {})} style = {styles.textBtnLabel}> Sign Up</Text>
                        </Text>
                    </View>
                </View>}
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

export default ForgotPassScreen;