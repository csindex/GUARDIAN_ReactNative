import { Dimensions, StyleSheet } from 'react-native';

const { width, height} = Dimensions.get("screen");

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
    },
});