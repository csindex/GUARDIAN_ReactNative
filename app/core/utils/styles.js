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
        width: wP('98%'),
        backgroundColor: '#fff',
        padding: 24.0,
        borderRadius: 8.0,
    },
    formMainLabel: {
        fontSize: hP('4.5%'),
        color: '#215a75',
        fontFamily: 'Inter-Bold',
        letterSpacing: wP('0.5%'),
    },
    formLabelWithIconContainer: {
        flexDirection: 'row',
        paddingTop: hP('1.5%'),
        alignItems: 'center',
    },
    formLabelWithIconLabel: {
        fontSize: hP('2.5%'),
        letterSpacing: wP('0.1%'),
    },
    formLabelIcon: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlignVertical: 'center',
    },
    iconStyle: {
        fontSize: 36.0,
        color: '#000',
    },
    mainBtnContainer: {
        height: hP('5.5%'),
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
        fontSize: hP('2%'),
        fontFamily: 'Inter',
        letterSpacing: wP('0.2%'),
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
        letterSpacing: wP('0.1%'),
    },
    textBtnLabel: {
        color: '#174052',
    },
    baseFormInput: {
        height: hP('5%'),
        borderWidth: 1,
        padding: 10,
        borderRadius: 4.0,
        letterSpacing: wP('0.1%'),
        fontSize: hP('2.5%'),
    },
    formInput1: {
        height: hP('5%'),
        borderWidth: 1,
        padding: 10,
        borderRadius: 4.0,
        fontSize: hP('2%'),
        letterSpacing: wP('0.1%'),
        marginTop: 8.0,
    },
    formInputNote: {
        fontSize: hP('1.5%'), 
        color: '#1f1f1f', 
        marginTop: 4.0, 
        fontFamily: 'Inter',
        letterSpacing: wP('0.1%'),
    },
    formInputWithIconContainer: {
        flexDirection: 'row',
        marginTop: 8.0,
        justifyContent: 'flex-end',
    },
    formInputWithIcon: {
        height: hP('5%'),
        borderWidth: 1,
        padding: 10,
        borderRadius: 4.0,
        fontSize: hP('2%'),
        letterSpacing: wP('0.1%'),
        flex: 1,
    },
    formInputIconContainer: {
        height: 36.0,
        width: 36.0,
        position: 'absolute',
        right: 0.0,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    formInputIcon: {
        alignSelf: 'center',
    },
});