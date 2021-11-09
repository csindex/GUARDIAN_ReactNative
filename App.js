import * as React from 'react';
// import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from './app/core/utils/common/screens';
import LogoTitle from './app/core/utils/common/header-logo';

const Stack = createNativeStackNavigator();

function App() {
    // console.log('enter App');
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="LandingScreen"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#174052',
                    },
                    headerTintColor: '#fff',
                    headerTitle: (props) => <LogoTitle {...props} />
                }}
            >
                <Stack.Screen name="LandingScreen" component={Screens.LandingScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
