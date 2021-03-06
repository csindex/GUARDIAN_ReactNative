import * as React from 'react'
import axios from 'axios';
import { 
    Image, 
    StyleSheet, 
    View,
    Text,
    TouchableOpacity,
    Platform,
    Pressable,
    StatusBar
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
import * as SecureStore from 'expo-secure-store';
import {
    widthPercentageToDP as wP,
    heightPercentageToDP as hP,
} from 'react-native-responsive-screen';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';

function LogoTitle() {
    const navigation = useNavigation();
    return (
        <View style={headerStyles.logoContainer}>
            <Pressable onPress={() => navigation.navigate('LandingScreen', {})}>
            <Image
                style={headerStyles.logo}
                source={require('./../../assets/common/small-logo.png')}
            />
            </Pressable>
        </View>
    );
}

const ProfPicMenuIcon = (props) => {
    const [visible, setVisible] = React.useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    const navigation = useNavigation();
    async function saveKeys() {
        await SecureStore.deleteItemAsync(Constants.TOKEN_KEY);
        await SecureStore.setItemAsync(Constants.IS_AUTHENTICATED_KEY, JSON.stringify(false));
    }
    console.log(`pic - ${props.profPicUrl}`);
    const logout = async () => {
        // const token = JSON.parse(route.params.token);
        // const email = route.params.email;
        console.log(`${props.token} x ${JSON.parse(props.token)}`);
        const token = JSON.parse(props.token);
        const email = props.email;
        try {
            const config = {
                headers: {
                    'x-auth-token': token,
                },
            };
            console.log(`${Constants.BASE_URL}/api/users/online/${email} x\n${token}`);
            await axios.delete(`${Constants.BASE_URL}/api/users/online/${email}`, config)
                .then(res => {
                    saveKeys();
                    // alert('logout successful: ' + res.data.msg);
                    props.handleLogout(true);
                    navigation.navigate('LandingScreen', {
                        sb: JSON.stringify({
                            flag: true,
                            sbText: 'Logged out successfully',
                            sbBGColor: 'green',
                        }),
                    });
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
                    <Pressable onPress={() => {
                        showMenu();
                        console.log('pressed');
                        }}>
                        <Image
                            style={headerStyles.profPic}
                            source={(props.profPicUrl !== '') ? 
                            {uri: `${Constants.BASE_URL_IMG}/${props.profPicUrl}`} : 
                            require('./../../assets/common/spotter.png')}
                        />
                    </Pressable>
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

// function BtnRegister() {
//     let [fontsLoaded] = useFonts({
//         'Inter-Black': require('./../../assets/fonts/Inter-Black.otf'),
//         'Inter': require('./../../assets/fonts/Inter-Regular.otf'),
//         'Inter-Bold': require('./../../assets/fonts/Inter-Bold.otf'),
//         'Inter-Light': require('./../../assets/fonts/Inter-Light.otf'),
//         'Inter-Medium': require('./../../assets/fonts/Inter-Medium.otf'),
//         'Inter-SemiBold': require('./../../assets/fonts/Inter-SemiBold.otf'),
//         'Inter-Thin': require('./../../assets/fonts/Inter-Thin.otf'),
//     });
//     if (!fontsLoaded) {
//         return <AppLoading/>;
//     } else {
//         return (
//             <Pressable onPress={() => props.handleSetScreen('signup')}>
//                 <View style={headerStyles.btnContainer}>
//                     <FontAwesomeIcon size={12.0} color={'white'} styles={headerStyles.btnIcon} icon={ faUserAlt }/>
//                     <Text style={headerStyles.btnText}>  Register</Text>
//                 </View>
//             </Pressable>
//         );
//     }
// }

function HeaderBtns() {
    const navigation = useNavigation();
    // console.log('Screen ' + props.screen);
    let [fontsLoaded] = useFonts({
        'Inter-Black': require('./../../assets/fonts/Inter-Black.otf'),
        'Inter': require('./../../assets/fonts/Inter-Regular.otf'),
        'Inter-Bold': require('./../../assets/fonts/Inter-Bold.otf'),
        'Inter-Light': require('./../../assets/fonts/Inter-Light.otf'),
        'Inter-Medium': require('./../../assets/fonts/Inter-Medium.otf'),
        'Inter-SemiBold': require('./../../assets/fonts/Inter-SemiBold.otf'),
        'Inter-Thin': require('./../../assets/fonts/Inter-Thin.otf'),
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <View style={[headerStyles.btnContainer2, {marginEnd: 0.0}]}>
                <Pressable onPress={() => navigation.navigate('SignupScreen', {})}>
                    <View style={headerStyles.btnContainer}>
                        <FontAwesomeIcon size={12.0} color={'white'} styles={headerStyles.btnIcon} icon={ faUserAlt }/>
                        <Text style={headerStyles.btnText}>  Register</Text>
                    </View>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('LoginScreen', {})}>
                    <View style={headerStyles.btnContainer}>
                        <FontAwesomeIcon color={'white'} icon={ faSignInAlt } styles={headerStyles.btnIcon}/>
                        <Text style={headerStyles.btnText}>  Login</Text>
                    </View>
                </Pressable>
            </View>
        );
    }
}

const AuthHeader = (props) => {
    let [fontsLoaded] = useFonts({
        'Inter-Black': require('./../../assets/fonts/Inter-Black.otf'),
        'Inter': require('./../../assets/fonts/Inter-Regular.otf'),
        'Inter-Bold': require('./../../assets/fonts/Inter-Bold.otf'),
        'Inter-Light': require('./../../assets/fonts/Inter-Light.otf'),
        'Inter-Medium': require('./../../assets/fonts/Inter-Medium.otf'),
        'Inter-SemiBold': require('./../../assets/fonts/Inter-SemiBold.otf'),
        'Inter-Thin': require('./../../assets/fonts/Inter-Thin.otf'),
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return (
            <View style={[headerStyles.headerContainer, {backgroundColor: (props.screen === 'landing' ? '#17405299' : '#174052')}]}>
                <Pressable onPress={() => props.handleSetScreen('landing')}>
                    <LogoTitle/>
                </Pressable>
                <View style={headerStyles.btnContainer2}>
                    <Pressable onPress={() => props.handleSetScreen('signup')}>
                        <View style={headerStyles.btnContainer}>
                            <FontAwesomeIcon size={12.0} color={'white'} styles={headerStyles.btnIcon} icon={ faUserAlt }/>
                            <Text style={headerStyles.btnText}>  Register</Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={() => props.handleSetScreen('login')}>
                        <View style={headerStyles.btnContainer}>
                            <FontAwesomeIcon color={'white'} icon={ faSignInAlt } styles={headerStyles.btnIcon}/>
                            <Text style={headerStyles.btnText}>  Login</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        );
    }
}

const DashboardHeader = (props) => {
    // console.log(`email - ${props.email}`);
    return (
        <View style={{position: 'absolute'}}>
            <View style={{...Platform.select({ios:{height: 20},android:{height: StatusBar.currentHeight}}), backgroundColor: '#174052'}}/>
            <View style={[headerStyles.headerContainer, {backgroundColor: '#174052'}]}>
                <Pressable onPress={() => props.handleSetScreen('home')}>
                    <LogoTitle/>
                </Pressable>
                <View style={headerStyles.btnContainer2}>
                    <View style={{marginEnd: 16.0, textAlignVertical: 'center', alignContent: 'center', paddingBottom: 10.0}}>
                        <Pressable onPress={() => {
                            props.handleSetScreen('edit-profile');
                        }}>
                            <Text style={headerStyles.btnText}>Profile</Text>
                        </Pressable>
                    </View>
                    <ProfPicMenuIcon 
                        token={props.token} 
                        email={props.email} 
                        profPicUrl={props.profileObject?.profilepic}
                        handleLogout={props.handleLogout}
                    />
                </View>
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
        // ...Platform.select({
            // ios: {},
            // android: {
                marginLeft: 12.0,
            // },
        // }),
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
        fontSize: 13.0,
        textAlignVertical: 'center',
        alignSelf: 'center',
        fontFamily: 'Inter-Thin',
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
        resizeMode: 'cover',
        borderRadius: 20.0,
        overflow: 'hidden',
        borderColor: '#ddd',
        // borderWidth: 2.0,
    },
    menuItem: {
        flexDirection: 'row',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        ...Platform.select({
            ios: {
                paddingStart: 16.0,
            },
            android: {},
        }),
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
        width: wP('100%'),
        height: 56.0,
        backgroundColor: '#17405299',
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 8.0,
        // ...Platform.select({
        //     ios: {
        //         paddingEnd: '17%',
        //     },
        //     android: {
        //         paddingEnd: '23%',
        //     }
        // }),
        justifyContent: 'space-between',
        // position: 'absolute',
    },
});

export { 
    LogoTitle,
    ProfPicMenuIcon, 
    AuthHeader,
    DashboardHeader,
    HeaderBtns,
};