import * as React from 'react';
import {
    View,
    Text,
    Pressable,
    StyleSheet,
    Image,
    Dimensions,
    TextInput,
    ScrollView,
    Platform
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './../../core/utils/styles';
import { useFonts } from '@expo-google-fonts/inter';
import AppLoading from 'expo-app-loading';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { 
    faUserAlt, 
    faCamera,
    faAddressBook
} from '@fortawesome/free-solid-svg-icons';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet } from 'react-native-btr';
import MapView from 'react-native-maps';
import { Picker, PickerIOS } from '@react-native-picker/picker';

export default function EditProfile() {
    const [visible, setVisible] = React.useState(false);
    const toggleBottomNavigationView = () => {
      //Toggling the visibility state of the bottom sheet
      setVisible(!visible);
    };
    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = React.useState('');
    // This function is triggered when the "Select an image" button pressed
    const openImagePicker = async () => {
        // Ask the user for the permission to access the media library 
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your photos!");
        return;
        }
        const result = await ImagePicker.launchImageLibraryAsync();
        // Explore the result
        console.log(result);
        if (!result.cancelled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
        }
    }
    // This function is triggered when the "Open camera" button pressed
    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
        if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
        }
        const result = await ImagePicker.launchCameraAsync();
        // Explore the result
        console.log(result);

        if (!result.cancelled) {
        setPickedImagePath(result.uri);
        console.log(result.uri);
        }
    }
    const [gender, setGender] = React.useState('* Gender');
    const handleGenderChange = (g) => {
        console.log(`${g} x ${gender}`);
        if (g !== gender) {
            setGender(g);
        }
    }
    const [civilStatus, setCivilStatus] = React.useState();
    let [fontsLoaded] = useFonts({
        'Inter-Black': require('./../../core/assets/fonts/Inter-Black.otf'),
        'Inter': require('./../../core/assets/fonts/Inter-Regular.otf'),
        'Inter-Bold': require('./../../core/assets/fonts/Inter-Bold.otf'),
        'Inter-Light': require('./../../core/assets/fonts/Inter-Light.otf'),
        'Inter-Medium': require('./../../core/assets/fonts/Inter-Medium.otf'),
        'Inter-SemiBold': require('./../../core/assets/fonts/Inter-SemiBold.otf'),
        'Inter-Thin': require('./../../core/assets/fonts/Inter-Thin.otf'),
        'Solid-Icons': require('./../../core/assets/fonts/fa-solid-900.ttf'),
    });
    if (!fontsLoaded) {
        return <AppLoading/>;
    } else {
        return(
            <SafeAreaView style={[
                styles.mainContainer, 
                epStyles.mainBG
            ]}>

                <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
                <View>
                    <Text style={epStyles.header}>Update Your Profile</Text>

                    <View style={epStyles.header2Container}>
                        <FontAwesomeIcon
                            style={epStyles.header2Icon} 
                            icon={faUserAlt}
                        />
                        <Text style={epStyles.header2}>
                            Update Information to make your profile stand out. * = required field.
                        </Text>
                    </View>

                    <View style={epStyles.imageContainer}>
                        <Image
                            source={(pickedImagePath !== '' ? {uri: pickedImagePath} : require('./../../core/assets/common/spotter.png'))}
                            style={epStyles.image}
                        />
                        <View style={epStyles.cameraIconContainer}>
                            <Pressable
                                activeOpacity={0.6}
                                onPress={toggleBottomNavigationView}>
                                <FontAwesomeIcon
                                    style={epStyles.cameraIcon}
                                    icon={faCamera}
                                    size={32.0}
                                />
                            </Pressable>
                        </View>
                    </View>

                    <View style={epStyles.formContainer}>
                        <Pressable>
                            <View style={epStyles.formBtnPrimary}>
                                <FontAwesomeIcon 
                                    style={epStyles.formBtnIcon}
                                    icon={faAddressBook}
                                />
                                <Text style={epStyles.formBtnText}>Personal Information</Text>
                            </View>
                        </Pressable>
                        <View>
                            <View style={epStyles.mapContainer}>
                                <MapView style={epStyles.map}/>
                            </View>
                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='Sample Address, Sample City, Sample, Sample'
                            />
                            <Text style={epStyles.label}>New Home Address</Text>

                            <View style={epStyles.pickerContainer}>
                                <PickerIOS
                                    // mode='dropdown'
                                    selectedValue={gender}
                                    onValueChange={(itemValue, itemIndex) => {
                                        handleGenderChange(itemValue);
                                        console.log(`anyare? ${itemValue}`);
                                    }}
                                    itemStyle={epStyles.pickerItem}
                                    style={epStyles.picker}
                                >
                                    <Picker.Item label='* Gender' value='0'/>
                                    <Picker.Item label='Male' value='Male'/>
                                    <Picker.Item label='Female' value='Female'/>
                                    <Picker.Item label='LGBTQ+' value='LGBT'/>
                                </PickerIOS>
                            </View>
                            <Text style={epStyles.label}>Choose your gender</Text>
                        </View>
                    </View>
                </View>
                </ScrollView>
                <BottomSheet
                    visible={visible}
                    onBackButtonPress={toggleBottomNavigationView}
                    onBackdropPress={toggleBottomNavigationView}
                >
                    <View style={epStyles.bottomNavigationView}>
                        <Text style={epStyles.bottomSheetHeader}>Upload profile picture...</Text>
                        <View style={epStyles.bottomSheetDivider}/>
                        <Pressable onPress={openImagePicker}>
                            <Text style={epStyles.bottomSheetButtons}>Select from Gallery</Text>
                        </Pressable>
                        <Pressable onPress={openCamera}>
                            <Text style={epStyles.bottomSheetButtons}>Take a Photo</Text>
                        </Pressable>
                    </View>
                </BottomSheet>

            </SafeAreaView>
        );
    }
};

const epStyles = StyleSheet.create({
    mainBG: {
        backgroundColor: '#ddd',
        paddingTop: 56.0,
        paddingHorizontal: 8.0,
        paddingBottom: 16.0,
    },
    header: {
        marginTop: 36.0,
        marginStart: 16.0,
        fontFamily: 'Inter',
        fontSize: 16.0,
    },
    header2Container: {
        flexDirection: 'row',
        marginTop: 16.0,
        alignContent: 'center',
        alignItems: 'center',
    },
    header2Icon: {
    },
    header2: {
        fontFamily: 'Inter',
        marginStart: 8.0,
    },
    imageContainer: {
        padding: 16.0,
        alignSelf: 'center',
    },
    image: {
        width: 160.0,
        height: 160.0,
        resizeMode: 'cover',
        borderRadius: 80.0,
        overflow: 'hidden',
        borderColor: '#ddd',
        borderWidth: 2.0,
    },
    cameraIcon: {
        color: '#174052af',
        ...Platform.select({
            ios: {
                shadowColor: '#fff',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,    
            },
            android: {
                elevation: 4,
                // shadowColor: '#fff',
                // shadowRadius: 2.0,
            },
        }),
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        flexBasis: 'auto',
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingBottom: 8.0,
    },
    cameraIconContainer: {
        position: 'absolute',
        bottom: 36.0,
        end: 24.0,
    },
    bottomSheetHeader: {
        fontFamily: 'Inter-SemiBold',
        fontSize: 16.0,
        paddingStart: 16.0,
        paddingTop: 16.0,
    },
    bottomSheetDivider: {
        marginStart: 16.0,
        width: '70%',
        borderBottomWidth: StyleSheet.hairlineWidth,
        marginBottom: 8.0,
    },
    bottomSheetButtons: {
        paddingVertical: 8.0,
        paddingHorizontal: 16.0,
        fontFamily: 'Inter',
        color: '#1f1f1f',
    },
    formContainer: {
        backgroundColor: '#fff',
        paddingVertical: 16.0,
        flexBasis: 'auto',
        flexShrink: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        padding: 16.0,
        borderRadius: 4.0,
    },
    formBtnPrimary: {
        backgroundColor: '#174052',
        paddingVertical: 8.0,
        paddingHorizontal: 24.0,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        alignContent: 'center',
        alignSelf: 'flex-start',
        borderRadius: 4.0,
    },
    formBtnIcon: {
        color: '#fff',
        alignSelf: 'center',
    },
    formBtnText: {
        color: '#fff',
        fontFamily: 'Inter',
        marginStart: 4.0,
    },
    mapContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 8.0,
        borderRadius: 4.0,
        overflow: 'hidden',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.3,
    },
    formInput: {
        marginTop: 8.0,
        paddingHorizontal: 8.0,
        paddingVertical: 8.0,
        borderColor: 'grey',
        borderWidth: 1.0,
        borderRadius: 4.0,
        alignSelf: 'stretch',
        alignItems: 'stretch',
        alignContent: 'stretch',
    },
    label: {
        fontFamily: 'Inter',
        color: '#aaa',
        marginTop: 4.0,
    },
    pickerContainer: {
        marginTop: 16.0,
        backgroundColor: '#ddd',
        borderRadius: 4.0,
        paddingStart: 8.0,
        borderWidth: StyleSheet.hairlineWidth,
        overflow: 'hidden',
        fontFamily: 'Inter'
    },
    picker: {
        fontFamily: 'Inter',
        ...Platform.select({
            ios: {
                paddingTop: 0.0,
                height: 56.0,
            },
            android: {},
        })
    },
    pickerItem: {
        paddingHorizontal: 16.0,
        fontFamily: 'Inter',
    },
});