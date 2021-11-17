import 'react-native-gesture-handler';
import * as React from 'react';
// import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Screens from './app/core/utils/common/screens';
import * as Header from './app/core/utils/common/header-logo';
import FontAwesome, {
    SolidIcons,
    RegularIcons,
    BrandIcons,
    parseIconFromClassName,
} from 'react-native-fontawesome';
import CustomMaterialMenu from './app/core/utils/common/custom-material-menu';

const Stack = createNativeStackNavigator();

function App() {
    // console.log('enter App');
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="LandingScreen"
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
                <Stack.Screen name="LandingScreen" component={Screens.LandingScreen} options={{headerShown: false}}/>
                <Stack.Screen name="LoginScreen" component={Screens.LoginScreen}/>
                <Stack.Screen 
                    name="PostScreen" 
                    component={Screens.PostScreen} 
                    options={{
                        headerStyle: {
                            backgroundColor: '#174052',
                        },
                        headerLeft: () => <Header.LogoTitle/>,
                        headerRight: ({route, navigation}) => <Header.ProfPicMenuIcon{...(route, navigation)}/>,
                        headerTitle: () => null,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
