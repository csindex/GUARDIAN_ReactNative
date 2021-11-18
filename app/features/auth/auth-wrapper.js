import * as React from 'react';
import {
    StatusBar,
    View,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SecureStore from 'expo-secure-store';
import * as Constants from './../../core/utils/common/constants';
import styles from './../../core/utils/styles';
import { AuthHeader } from '../../core/utils/common/header-logo';

function AuthWrapper() {
    return (
        <SafeAreaView style={styles.mainContainer}>
            
            <StatusBar 
                barStyle='light-content'
                backgroundColor='#174052'
            />

            <AuthHeader/>

        </SafeAreaView>
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