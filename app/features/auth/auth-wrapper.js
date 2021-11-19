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
import { AuthHeader } from '../../core/utils/common/header-logo';
import LandingScreen from '../../core/utils/common/landing-screen';
import LoginScreen from '../../features/auth/login-screen';

function AuthWrapper() {
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
    return (
        <View style={styles.mainContainer}>
            <SafeAreaView>
                <StatusBar translucent
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    backgroundColor='#174052'
                />
            </SafeAreaView>
            {(screen === 'landing' ? <LandingScreen handleSetScreen={this.handleSetScreen}/> : <LoginScreen/>)}
            <AuthHeader handleSetScreen={this.handleSetScreen} screen={screen}/>
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