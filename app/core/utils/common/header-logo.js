import * as React from 'react'
import { Image, StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserAlt, faSignInAlt } from '@fortawesome/free-solid-svg-icons';

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

function registerBtn() {
    return (
        <View style={logoStyle.btnContainer}>
            <FontAwesomeIcon icon={ faUserAlt }/>
            <Text>Register</Text>
        </View>
    );
}

function loginBtn() {
    return (
        <View style={logoStyle.btnContainer}>
            <FontAwesomeIcon icon={ faSignInAlt }/>
            <Text>Login</Text>
        </View>
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
    btnContainer: {
        flexDirection: 'row',
    },
});

export { LogoTitle, loginBtn, registerBtn };