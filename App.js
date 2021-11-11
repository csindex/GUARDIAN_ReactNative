import * as React from 'react';
// import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from './app/core/utils/common/screens';
import LogoTitle from './app/core/utils/common/header-logo';
import FontAwesome, {
    SolidIcons,
    RegularIcons,
    BrandIcons,
    parseIconFromClassName,
} from 'react-native-fontawesome';

const Stack = createNativeStackNavigator();

function App() {
    // console.log('enter App');
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="LandingScreen"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#174052', //'rgba(23, 64, 82, 0.8)'
                    },
                    headerTintColor: '#fff',
                    headerTitle: (props) => <LogoTitle {...props} />,
                    headerLeft: () => null,
                    headerBackVisible: false,
                }}
            >
                <Stack.Screen name="LandingScreen" component={Screens.LandingScreen}/>
                <Stack.Screen name="LoginScreen" component={Screens.LoginScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

function registerBtn({navigation}) {
    return (
        <View></View>
    );
}

export default App;
