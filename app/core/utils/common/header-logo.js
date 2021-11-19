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
import { useNavigation } from '@react-navigation/native';
import * as Constants from './constants';
import { back } from 'react-native/Libraries/Animated/Easing';

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

const ProfPicMenuIcon = (route) => {
    const [visible, setVisible] = React.useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    // const { token } = route.params;
    const navigation = useNavigation();
    async function saveKeys() {
        await SecureStore.delete(Constants.TOKEN_KEY);
        await SecureStore.setItemAsync(Constants.IS_AUTHENTICATED_KEY, JSON.stringify(false));
    }
    const logout = async () => {
        console.log('token - ' + route.params.token);
        try {
            const config = {
                headers: {
                    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjBiNGRiNmU1ZWRjOTIyMDg4YjAwNDJhIn0sImlhdCI6MTYzNjcwNzg4NH0.qjlOssnIzLOuIQmbVdZY1HzDqX3GjkNkBiIE2AXjkNU',
                },
            };
            // console.log(`${baseUrl}/api/users/online/${email}`);
            await axios.delete(Constants.BASE_URL + '/api/users/online/cfj@abc.com', config)
                .then(res => {
                    saveKeys();
                    alert('logout successful: ' + res.data.msg);
                    navigation.navigate('AuthWrapperScreen');
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

function BtnRegister() {
    return (
        <TouchableOpacity>
            <View style={headerStyles.btnContainer}>
                <FontAwesomeIcon size={12.0} color={'white'} styles={headerStyles.btnIcon} icon={ faUserAlt }/>
                <Text style={headerStyles.btnText}>  Register</Text>
            </View>
        </TouchableOpacity>
    );
}

const AuthHeader = (props) => {
    console.log('Screen ' + props.screen);
    return (
        <View style={[headerStyles.headerContainer, {backgroundColor: (props.screen === 'landing' ? '#17405299' : '#174052')}]}>
            <LogoTitle/>
            <View style={headerStyles.btnContainer2}>
                <BtnRegister/>
                <TouchableOpacity onPress={() => props.handleSetScreen('login')}>
                    <View style={headerStyles.btnContainer}>
                        <FontAwesomeIcon color={'white'} icon={ faSignInAlt } styles={headerStyles.btnIcon}/>
                        <Text style={headerStyles.btnText}>  Login</Text>
                    </View>
                </TouchableOpacity>
            </View>
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
        alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16.0,
        paddingVertical: 8.0,
    },
    btnContainer2: {
        flexDirection: 'row',
        alignContent: 'flex-end',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginEnd: 8.0,
    },
    btnIcon: {
        alignSelf: 'center',
        color: '#fff',
    },
    btnText: {
        color: '#fff',
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
    },
    headerContainer: {
        width: "100%",
        height: 56.0,
        backgroundColor: '#17405299',
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 8.0,
        justifyContent: 'space-between',
        position: 'absolute',
    },
});

export { 
    LogoTitle,
    ProfPicMenuIcon, 
    AuthHeader,
};