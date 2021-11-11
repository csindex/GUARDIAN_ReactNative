import * as React from 'react'
import { Image, StyleSheet, View } from 'react-native';

function LogoTitle() {
    return (
        <View style={logoStyle.logoContainer}>
            <Image
                style={logoStyle.logo}
                source={require('./../../assets/common/small-logo.png')}
            />
        </View>
    );
}

function LoginBtn() {
    return (
        <View></View>
    );
}

const logoStyle = StyleSheet.create({
    logoContainer: {
        width: 36.0,
        height: 36.0,
        backgroundColor: '#215a75',
        borderRadius: 4.0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 32.0,
        height: 32.0,
    },
    registerBtnContainer: {

    },
});

export default LogoTitle;