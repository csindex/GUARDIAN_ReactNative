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

function HomeScreen({route, navigation}) {
    const { email, token } = route.params;
    const [screen, setScreen] = React.useState('home');
    handleSetScreen = (screenStr) => {
        console.log(`${screen} x ${screenStr}`);
        if (screenStr !== screen) {
            setScreen(screenStr);
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
                    <EditProfile/>
            )}
            <DashboardHeader token={token} email={email} handleSetScreen={handleSetScreen}/>
        </View>
    );
}

export default HomeScreen;