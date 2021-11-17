import * as React from 'react'
import axios from 'axios';
import { 
    Image, 
    StyleSheet, 
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faUserAlt, 
    faSignInAlt,
    faChild,
    faIdBadge,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { 
    Menu,
    MenuItem 
} from 'react-native-material-menu';
import { NavigationContainer } from '@react-navigation/native';

function LogoTitle() {
    return (
        <View style={headerStyles.logoContainer}>
            <Image
                style={headerStyles.logo}
                source={require('./../../assets/common/small-logo.png')}
            />
        </View>
    );
}

const ProfPicMenuIcon = (route, navigation) => {
    const [visible, setVisible] = React.useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    const baseUrl = 'http://10.128.50.136:3000';
    // const { token } = route.params;
    const logout = async () => {
        console.log('token - ' + JSON.stringify(route));
        try {
            const config = {
                headers: {
                    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBiNGRiNmU1ZWRjOTIyMDg4YjAwNDJhIn0sImlhdCI6MTYzNjcwNzg4NH0.qjlOssnIzLOuIQmbVdZY1HzDqX3GjkNkBiIE2AXjkNU',
                },
            };
            // console.log(`${baseUrl}/api/users/online/${email}`);
            await axios.delete(baseUrl + '/api/users/online/cfj@abc.com', config)
                .then(res => {
                    alert('logout successful: ' + res.data.msg);
                    navigation.navigate('LandingScreen');
                }).catch(err => console.log('error logout ' + err));
        } catch (error) {
            alert('oyy ?' + error);
        }
    };
    return (
        <View style={headerStyles.profPicMenuIconContainer}>
            <Menu
                style={{top: 56.0, backgroundColor: '#215a75'}}
                visible={visible}
                onRequestClose={hideMenu}
                anchor={
                    <TouchableOpacity
                        activeOpacity={0.6}
                        onPress={showMenu}
                    >
                        <Image
                            style={headerStyles.profPic}
                            source={require('./../../assets/common/spotter.png')}
                        />
                    </TouchableOpacity>
                }
            >
                <MenuItem>
                    <View style={headerStyles.menuItem}>
                        <FontAwesomeIcon style={headerStyles.menuIcon} icon={ faChild }/>
                        <Text style={headerStyles.menuText}> Volunteer</Text>
                    </View>
                </MenuItem>
                <MenuItem>
                    <View style={headerStyles.menuItem}>
                        <FontAwesomeIcon style={headerStyles.menuIcon} icon={ faIdBadge }/>
                        <Text style={headerStyles.menuText}> Responder</Text>
                    </View>
                </MenuItem>
                <MenuItem onPress={logout}>
                    <View style={headerStyles.menuItem}>
                        <FontAwesomeIcon style={headerStyles.menuIcon} icon={ faSignOutAlt }/>
                        <Text style={headerStyles.menuText}> Logout</Text>
                    </View>
                </MenuItem>
            </Menu>
        </View>
    );
}

function registerBtn() {
    return (
        <View style={headerStyles.btnContainer}>
            <FontAwesomeIcon icon={ faUserAlt }/>
            <Text>Register</Text>
        </View>
    );
}

function loginBtn() {
    return (
        <View style={headerStyles.btnContainer}>
            <FontAwesomeIcon icon={ faSignInAlt }/>
            <Text>Login</Text>
        </View>
    );
}

const headerStyles = StyleSheet.create({
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
    profPicMenuIconContainer: {
        width: 44.0,
        height: 44.0,
        borderRadius: 48.0,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profPic: {
        width: 40.0,
        height: 40.0,
    },
    menuItem: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    menuIcon: {
        alignSelf: 'center',
        color: '#fff',
    },
    menuText: {
        textAlign: 'center',
        alignSelf: 'center',
        color: '#fff',
    }
});

export { LogoTitle, loginBtn, registerBtn, ProfPicMenuIcon };