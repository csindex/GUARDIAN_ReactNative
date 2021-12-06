import * as React from 'react';
import {
    StatusBar,
    View,
    StyleSheet,
    Platform,
    BackHandler
} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import * as Constants from './../../core/utils/common/constants';
import styles from './../../core/utils/styles';
import { AuthHeader } from '../../core/utils/common/header';
import { 
    LandingScreen,
    LoginScreen,
    LoadingScreen,
    ForgotPassScreen,
    SignupScreen,
} from './../../core/utils/common/views';
// import { Snackbar } from 'react-native-paper';

function AuthWrapper({route, navigation}) {
    const isLogout = route.params?.isLogout;
    const [isLoading, setIsLoading] = React.useState(false);
    const [screen, setScreen] = React.useState('landing');
    handleSetScreen = (screenStr) => {
        // console.log(`${screen} x ${screenStr}`);
        if (screenStr !== screen) {
            setScreen(screenStr);
        }
    }
    const backAction = () => {
        // Alert.alert("Hold on!", "Are you sure you want to go back?", [
        //     {
        //         text: "Cancel",
        //         onPress: () => null,
        //         style: "cancel"
        //     },
        //     { text: "YES", onPress: () => BackHandler.exitApp() }
        // ]);
        handleSetScreen('landing');
        return true;
    };
    React.useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
        return () =>
        BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
    async function getIsAuthenticated() {
        const token = await SecureStore.getItemAsync(Constants.TOKEN_KEY);
        const email = await SecureStore.getItemAsync(Constants.EMAIL_KEY);
        const f = await SecureStore.getItemAsync(Constants.IS_AUTHENTICATED_KEY);
        // console.log('getIsAuthenticated-' + f + '-' + JSON.parse(f));
        console.log('token - ' + token);
        if (JSON.parse(f)) {
            // console.log('return true');
            // setIsAuthenticated(true);
            navigation.navigate('HomeScreen', {token: token, email: email});
        }
    }
    React.useEffect(() => {
        getIsAuthenticated();
    }, []);
    // React.useEffect(() => {
    //     if (isLogout) {
    //         console.log('logout auth' + isLogout);
    //         setSBText('Logged out successfully');
    //         setSBBGColor('green');
    //         setSBVisible(true);
    //     }
    // }, []);
    // const [sbVisible, setSBVisible] = React.useState(false);
    // const [sbText, setSBText] = React.useState('Logged out successfully');
    // const [sbBGColor, setSBBGColor] = React.useState('green');
    // const onDismissSnackbar = () => {
    //     setSBVisible(false);
    // }
    // console.log(`isLogout? ${isLogout}`);
    // if(isLogout) {
        // console.log('logout auth' + isLogout);
        // setSBText('Logged out successfully');
        // setSBBGColor('green');
        // setSBVisible(true);
        // React.useEffect(() => {
        //     console.log('logout auth 2');
        // }, []);
    // }
    const os = Platform.OS;
    handleLoading = (flag) => {
        setIsLoading(flag);
    }
    // if (isLogout) {
    //     console.log('logout');
    //     React.useEffect(() => {
    //         setSBText('Logged out successfully');
    //         setSBBGColor('green');
    //         setSBVisible(true);
    //     }, []);
    // }
    return (
        <View style={styles.mainContainer}>
            <StatusBar translucent
                barStyle='light-content'
                backgroundColor='#174052'
            />
            {isLoading ? <LoadingScreen/> :
            <View>
                {(
                    screen === 'landing' ? 
                        <LandingScreen handleSetScreen={handleSetScreen} isLogout={isLogout}/> : 
                    screen === 'forgotpass' ?
                        <ForgotPassScreen handleSetScreen={handleSetScreen} handleLoading={handleLoading}/> :
                    screen === 'signup' ?
                        <SignupScreen handleSetScreen={handleSetScreen} handleLoading={handleLoading}/> :
                        <LoginScreen handleSetScreen={handleSetScreen} handleLoading={handleLoading}/>
                )}
                <View style={{position: 'absolute'}}>
                    <View style={{height: (os === 'ios' ? 20 : StatusBar.currentHeight), backgroundColor: '#174052'}}/>
                    <AuthHeader handleSetScreen={handleSetScreen} screen={screen}/>
                </View>
            </View>}
            {/* <Snackbar
                visible={sbVisible}
                style={{backgroundColor: sbBGColor}}
                onDismiss={onDismissSnackbar}
                duration={4500}
            >{sbText}</Snackbar> */}
        </View>
    );
}

const awStyles = StyleSheet.create({
    header: {
        width: '100%',
        height: 56.0,
        color: '#215a75',
        flexDirection: 'row',
    },
});

export default AuthWrapper;