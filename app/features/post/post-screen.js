import * as React from 'react';
import {
    View,
    Text,
    StatusBar
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../core/utils/styles';

export default function PostScreen() {
    return (
        <SafeAreaView style={styles.mainContainerBG}>
            <StatusBar 
                barStyle='light-content'
                backgroundColor='#174052'
            />
            <View>
                <Text>Post Screen!</Text>
            </View>
        </SafeAreaView>
    );
};