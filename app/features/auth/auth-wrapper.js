import * as React from 'react';
import {
    StatusBar,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform,
    BackHandler
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import * as Constants from './../../core/utils/common/constants';
import styles from './../../core/utils/styles';
import { AuthHeader } from '../../core/utils/common/header';
import { 
    LandingScreen,
    LoginScreen,
} from './../../core/utils/common/views';

function AuthWrapper({navigation}) {
    const [screen, setScreen] = React.useState('landing');
    handleSetScreen = (screenStr) => {
        console.log(`${screen} x ${screenStr}`);
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
    // React.useEffect(() => {
    //     handleSetScreen('landing');
    // }, []);
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
    const os = Platform.OS;
    // console.log('StatusBar height: ' + StatusBar.currentHeight);
    return (
        <View style={styles.mainContainer}>
            <StatusBar translucent
                barStyle='light-content'
                backgroundColor='#174052'
            />
            {(screen === 'landing' ? <LandingScreen handleSetScreen={this.handleSetScreen} os={os}/> : <LoginScreen/>)}
            <View style={{position: 'absolute'}}>
                <View style={{height: (os === 'ios' ? 20 : StatusBar.currentHeight), backgroundColor: '#174052'}}/>
                <AuthHeader handleSetScreen={this.handleSetScreen} screen={screen}/>
            </View>
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