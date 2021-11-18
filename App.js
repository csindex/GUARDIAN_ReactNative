import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from './app/core/utils/common/screens';
import * as Header from './app/core/utils/common/header-logo';
// import FontAwesome, {
//     SolidIcons,
//     RegularIcons,
//     BrandIcons,
//     parseIconFromClassName,
// } from 'react-native-fontawesome';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName='AuthWrapperScreen'
                // screenOptions={{
                //     headerStyle: {
                //         backgroundColor: '#174052', //'rgba(23, 64, 82, 0.8)'
                //     },
                //     headerTintColor: '#fff',
                //     headerTitle: (props) => <LogoTitle {...props} />,
                //     headerBackVisible: false,
                //     headerMode='screen'
                // }}
                headerMode='screen'
            >
                <Stack.Screen name="AuthWrapperScreen" component={Screens.AuthWrapper} options={{headerShown: false}}/>
                <Stack.Screen 
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
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
