import * as React from 'react';
import { Dimensions, PixelRatio } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from './app/core/utils/common/screens';
import * as Header from './app/core/utils/common/header';
// import FontAwesome, {
//     SolidIcons,
//     RegularIcons,
//     BrandIcons,
//     parseIconFromClassName,
// } from 'react-native-fontawesome';

const Stack = createNativeStackNavigator();

function App() {
    console.log(Dimensions.get('screen').width);
    console.log(Dimensions.get('window').width);
    console.log(Dimensions.get('screen').height);
    console.log(Dimensions.get('window').height);
    console.log(PixelRatio.getPixelSizeForLayoutSize(Dimensions.get('screen').width));
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName='LandingScreen'
                screenOptions={{
                    headerTransparent: true,
                    headerLeft: () => <Header.LogoTitle/>,
                    headerTitle: () => null,
                    headerRight: () => <Header.HeaderBtns/>,
                    title: null,
                }}
                headerMode='screen'
            >
                {/* <Stack.Screen name="LoginScreen" component={Screens.LoginScreen} options={{headerShown: false}}/> */}
                <Stack.Screen 
                    name="AuthWrapperScreen" 
                    component={Screens.AuthWrapper} 
                    options={{headerShown: false}}
                />
                {/* <Stack.Screen 
                    name="PostScreen" 
                    component={Screens.PostScreen} 
                    options={
                        ({route}) => ({
                            headerStyle: {
                                backgroundColor: '#174052',
                            },
                            headerLeft: () => <Header.LogoTitle/>,
                            headerRight: () => <Header.ProfPicMenuIcon {...route}/>,
                            headerTitle: () => null,
                        })
                    }
                /> */}
                <Stack.Screen 
                    name="LandingScreen" 
                    component={Screens.LandingScreen}
                    options={
                        ({route, navigation}) => ({
                            headerStyle: {
                                backgroundColor: '#17405280'
                            },
                        })
                    }
                />
                <Stack.Screen 
                    name="LoginScreen" 
                    component={Screens.LoginScreen}
                    options={
                        ({route}) => ({
                            // headerTransparent: true,
                            headerStyle: {
                                backgroundColor: '#174052'
                            },
                            // headerLeft: () => <Header.LogoTitle/>,
                            // headerTitle: () => null,
                            // headerRight: () => <Header.HeaderBtns/>,
                            // title: null,
                        })
                    }
                />
                <Stack.Screen 
                    name="SignupScreen" 
                    component={Screens.SignupScreen}
                    options={
                        ({route, navigation}) => ({
                            // headerTransparent: true,
                            headerStyle: {
                                backgroundColor: '#174052'
                            },
                            // headerLeft: () => <Header.LogoTitle/>,
                            // headerTitle: () => null,
                            // headerRight: () => <Header.HeaderBtns/>,
                            // title: null,
                        })
                    }
                />
                <Stack.Screen 
                    name="SignupOtpScreen" 
                    component={Screens.SignupOtpScreen}
                    options={
                        ({route}) => ({
                            // headerTransparent: true,
                            headerStyle: {
                                backgroundColor: '#174052'
                            },
                            // headerLeft: () => <Header.LogoTitle/>,
                            // headerTitle: () => null,
                            // headerRight: () => <Header.HeaderBtns/>,
                            // title: null,
                        })
                    }
                />
                <Stack.Screen 
                    name="ForgotPassScreen" 
                    component={Screens.ForgotPassScreen}
                    options={
                        ({route}) => ({
                            headerStyle: {
                                backgroundColor: '#174052'
                            },
                        })
                    }
                />
                <Stack.Screen 
                    name="ForgotPassOtpScreen" 
                    component={Screens.ForgotPassOtpScreen}
                    options={
                        ({route}) => ({
                            headerStyle: {
                                backgroundColor: '#174052'
                            },
                        })
                    }
                />
                <Stack.Screen 
                    name="HomeScreen" 
                    component={Screens.HomeScreen} 
                    options={{headerShown: false}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
