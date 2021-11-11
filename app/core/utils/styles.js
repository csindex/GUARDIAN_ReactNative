import { Dimensions, StyleSheet } from 'react-native';

// const { width, height} = Dimensions.get("screen");

export default StyleSheet.create({
    mainContainer: {
        width: "100%",
        height: "100%",
    },
    landingScreenBgImage: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingStart: 56.0,
        paddingEnd: 56.0,
    },
    mainContainerBG: {
        width: '100%',
        height: '100%',
        padding: 8.0,
        backgroundColor: '#dddddd',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#fff',
        padding: 24.0,
    },
});