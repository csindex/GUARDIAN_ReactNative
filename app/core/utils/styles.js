import { StyleSheet } from 'react-native';
import {
    heightPercentageToDP as hP,
    widthPercentageToDP as wP,
} from 'react-native-responsive-screen';

// const { width, height} = Dimensions.get("screen");

export default StyleSheet.create({
    mainContainer: {
        width: wP('100%'),
        height: hP('100%'),
    },
    landingScreenBgImage: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingStart: 56.0,
        paddingEnd: 56.0,
    },
    mainContainerBG: {
        width: wP('100%'),
        height: hP('100%'),
        backgroundColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        paddingTop: hP('4.5%'),
    },
    formContainer: {
        width: wP('100%'),
        margin: 56.0,
        backgroundColor: '#fff',
        padding: 24.0,
        borderRadius: 8.0,
    },
    iconStyle: {
        fontSize: 36.0,
        color: '#000',
    },
    mainBtnContainer: {
        height: hP('6%'),
        width: wP('24%'),
        marginTop: 8.0,
        borderRadius: 4.0,
        justifyContent: 'center',
        backgroundColor: '#215a75',
    },
    mainBtnText: {
        color: '#fff',
        textAlignVertical: 'center',
        textAlign: 'center',
        fontSize: hP('1.9%'),
        fontFamily: 'Inter',
        // ...Platform.select({
        //     ios: {
        //         lineHeight: 48.0, // same as height
        //     },
        //     android: {}
        // })
    },
    textBtnLabel1: {
        marginTop: hP('1.3%'),
        fontSize: hP('2.5%'),
    },
    textBtnLabel: {
        color: '#174052',
    },
});