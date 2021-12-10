import axios from 'axios';
import * as React from 'react';
import {
    StatusBar,
    View,
    Text
} from 'react-native';
import styles from './../styles';
import { DashboardHeader } from './../common/header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { EditProfile } from './views';
import * as Constants from './constants';
import { Snackbar } from 'react-native-paper';

function HomeScreen({route, navigation}) {
    const { email, token } = route.params;
    const [screen, setScreen] = React.useState('home');
    handleSetScreen = (screenStr) => {
        console.log(`${screen} x ${screenStr}`);
        if (screenStr !== screen) {
            setScreen(screenStr);
        }
    }
    const [profileObj, setProfileObject] = React.useState(null);
    React.useEffect(async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    'x-auth-token': JSON.parse(token),
                },
            };
            // const body = JSON.stringify({email, password});
            // console.log(config);
            await axios.get(Constants.BASE_URL + '/api/auth', config)
                .then(response => {
                    console.log('auth get - ', response.data);
                })
                .catch(err => {
                    console.log(err);
                    const errors = err.response.data.errors;
                    if (errors) {
                        errors.forEach(error => alert(error.msg));
                    }
                });
        } catch (error) {
            alert('oyy ' + error);
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json, text/plain, */*',
                    'x-auth-token': JSON.parse(token),
                },
            };
            // const body = JSON.stringify({email, password});
            console.log(config);
            await axios.get(Constants.BASE_URL + '/api/profile/me', config)
                .then(response => {
                    console.log('profile get - ', JSON.stringify(response.data));
                    setProfileObject(response.data);
                })
                .catch(err => {
                    console.log(err.response.data);
                    const errors = err.response.data.errors;
                    if (errors) {
                        errors.forEach(error => alert(error.msg));
                    }
                });
        } catch (error) {
            alert('oyy ' + error);
        }
    }, []);
    const [sbVisible, setSBVisible] = React.useState(true);
    const [sbText, setSBText] = React.useState('Logged in successfully');
    const [sbBGColor, setSBBGColor] = React.useState('green');
    const onDismissSnackbar = () => {
        setSBVisible(false);
    }
    handleLogout = (flag) => {
        console.log('home logout ' + flag);
        if (flag) {
            setSBText('Logged out successfully');
            setSBVisible(true);
        }
    }
    return (
        <View style={styles.mainContainer}>
            <StatusBar 
                barStyle='light-content'
                backgroundColor='#174052'
            />
            {(
                screen === 'home' ?
                    <SafeAreaView style={{backgroundColor: '#fff'}}>
                        <View style={{alignItems: 'center', alignContent: 'center', alignSelf: 'center', justifyContent:'flex-end', marginTop: 56.0,}}>
                            <Text style={{color: '#000', fontSize: 30.0}}>Blank Dash board screen. Replace with different views (e.g. Posts, Profile, Messages, Incidents, etc.).</Text>
                        </View>
                    </SafeAreaView> : 
                    <EditProfile token={token} profileObject={profileObj} handleSetScreen={handleSetScreen}/>
            )}
            <Snackbar
                visible={sbVisible}
                style={{backgroundColor: sbBGColor}}
                onDismiss={onDismissSnackbar}
                duration={4500}
            >{sbText}</Snackbar>
            <DashboardHeader 
                token={token} 
                email={email} 
                handleSetScreen={handleSetScreen} 
                profileObject={profileObj}
                handleLogout={handleLogout}
            />
        </View>
    );
}

export default HomeScreen;