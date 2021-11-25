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
    faAddressBook,
    faBuilding,
    faDesktop
} from '@fortawesome/free-solid-svg-icons';
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet } from 'react-native-btr';
import MapView from 'react-native-maps';
import DatePicker from 'react-native-date-picker';

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
    };
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
    };
    const [pInfoVisible, setPInfoVisible] = React.useState(true);
    const togglePInfoVisibility = () => {
        setPInfoVisible(!pInfoVisible);
    }
    const [oInfoVisible, setOInfoVisible] = React.useState(true);
    const toggleOInfoVisibility = () => {
        setOInfoVisible(!oInfoVisible);
    }
    const [eInfoVisible, setEInfoVisible] = React.useState(true);
    const toggleEInfoVisibility = () => {
        setEInfoVisible(!eInfoVisible);
    }
    const [sInfoVisible, setSInfoVisible] = React.useState(true);
    const toggleSInfoVisibility = () => {
        setSInfoVisible(!sInfoVisible);
    }
    // const [gOpen, setGOpen] = React.useState(false);
    // const [gender, setGender] = React.useState(null);
    // const [gItems, setGItems] = React.useState([
        // {label: '* Gender', value: '0'},
        // {label: 'Male', value: 'Male'},
        // {label: 'Female', value: 'Female'},
        // {label: 'LGBTQ+', value: 'LGBT'},
    // ]);
    // const onGOpen = React.useCallback(() => {
        // setCSOpen(false);
    // }, []);
    // const [cSOpen, setCSOpen] = React.useState(false);
    // const [civilStatus, setCivilStatus] = React.useState();
    // const [cSItems, setCSItems] = React.useState([
    //     {label: 'Single', value: 'Single'},
    //     {label: 'Married', value: 'Married'},
    //     {label: 'Widowed', value: 'Widowed'},
    //     {label: 'Separated', value: 'Separated'},
    // ]);
    // const onCSOpen = React.useCallback(() => {
    //     setGOpen(false);
    // }, []);
    const [gVisible, setGVisible] = React.useState(false);
    const toggleGView = () => {
      //Toggling the visibility state of the bottom sheet
      setGVisible(!gVisible);
    };
    const [gender, setGender] = React.useState('* Gender')
    const handleSetGender = (g) => {
        // console.log(`handleSetGender ${gender} x ${g}`);
        if (gender !== g) {
            setGender(g);
        }
    };
    const [cSVisible, setCSVisible] = React.useState(false);
    const toggleCSView = () => {
      //Toggling the visibility state of the bottom sheet
      setCSVisible(!cSVisible);
    };
    const [cStatus, setCStatus] = React.useState('* Civil Status')
    const handleSetCStatus = (cs) => {
        // console.log(`handleSetGender ${gender} x ${g}`);
        if (cStatus !== cs) {
            setCStatus(cs);
        }
    };
    const [bDate, setBDate] = React.useState(new Date());
    const [bDateOpen, setBDateOpen] = React.useState(false);
    const [rSVisible, setRSVisible] = React.useState(false);
    const toggleRSView = () => {
      //Toggling the visibility state of the bottom sheet
      setRSVisible(!rSVisible);
    };
    const [rStatus, setRStatus] = React.useState('* Responder Status')
    const handleSetRStatus = (rs) => {
        if (rStatus !== rs) {
            setRStatus(rs);
        }
    };
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
                        <Pressable onPress={togglePInfoVisibility}>
                            <View style={epStyles.formBtnPrimary}>
                                <FontAwesomeIcon 
                                    style={epStyles.formBtnIcon}
                                    icon={faAddressBook}
                                />
                                <Text style={epStyles.formBtnText}>Personal Information</Text>
                            </View>
                        </Pressable>
                        {pInfoVisible && <View>
                            <View style={epStyles.mapContainer}>
                                <MapView style={epStyles.map}/>
                            </View>
                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='Sample Address, Sample City, Sample, Sample'
                            />
                            <Text style={epStyles.label}>New Home Address</Text>

                            <Pressable onPress={toggleGView}>
                                <Text style={[epStyles.formInput, {color: (gender !== '* Gender') ? '#000': '#aaa'}]}>{gender}</Text>
                            </Pressable>
                            <Text style={epStyles.label}>Choose your gender</Text>

                            <Pressable onPress={toggleCSView}>
                                <Text style={[epStyles.formInput, {color: (cStatus !== '* Civil Status') ? '#000': '#aaa'}]}>{cStatus}</Text>
                            </Pressable>
                            <Text style={epStyles.label}>Choose your civil status</Text>

                            <Pressable onPress={() => {setBDateOpen(true)}}>
                                <Text style={[epStyles.formInput, {color: (cStatus !== 'mm/dd/yyyy') ? '#000': '#aaa'}]}>{JSON.stringify(bDate)}</Text>
                            </Pressable>
                            <DatePicker
                                modal
                                open={bDateOpen}
                                date={bDate}
                                onConfirm={(date) => {
                                    setBDateOpen(false);
                                    setBDate(date);
                                }}
                                onCancel={() => {
                                    setBDateOpen(false);
                                }}
                            />
                            <Text style={epStyles.label}>Birthdate (mm/dd/yyyy)</Text>

                            <TextInput
                                multiline
                                style={[epStyles.formInput, {height: 120.0, textAlignVertical: 'top'}]} 
                                placeholder='A short bio of yourself'
                            />
                            <Text style={epStyles.label}>Tell us a little about yourself</Text>
                        </View>}

                        <Pressable onPress={toggleOInfoVisibility}>
                            <View style={[epStyles.formBtnPrimary, {marginTop: (pInfoVisible ? 8.0 : 4.0),}]}>
                                <FontAwesomeIcon 
                                    style={epStyles.formBtnIcon}
                                    icon={faBuilding}
                                />
                                <Text style={epStyles.formBtnText}>Organization/Company</Text>
                            </View>
                        </Pressable>
                        {oInfoVisible && <View>
                            <Pressable onPress={toggleRSView}>
                                <Text style={[epStyles.formInput, {color: (rStatus !== '* Responder Status') ? '#000': '#aaa'}]}>{rStatus}</Text>
                            </Pressable>
                            <Text style={epStyles.label}>Give us an idea of where you are at in your emergency response career</Text>

                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='Organization'
                            />
                            <Text style={epStyles.label}>Organization you are an affiliated/member</Text>

                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='Website'
                            />
                            <Text style={epStyles.label}>Organization website</Text>

                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='Organization Address'
                            />
                            <Text style={epStyles.label}>City or Municipality where organization is located</Text>

                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='* Skills'
                            />
                            <Text style={epStyles.label}>Please use comma separated values (eg. Patient Care, EMS, EMT, CPR, Hazardous Materials, Trauma)</Text>
                        </View>}
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
                <BottomSheet
                    visible={gVisible}
                    onBackButtonPress={toggleGView}
                    onBackdropPress={toggleGView}
                >
                    <View style={epStyles.bottomNavigationView}>
                        <Text style={epStyles.bottomSheetHeader}>* Gender</Text>
                        <View style={epStyles.bottomSheetDivider}/>
                        <Pressable onPress={() => {
                            toggleGView();
                            handleSetGender('Male');
                        }}>
                            <Text style={epStyles.bottomSheetButtons}>Male</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            toggleGView();
                            handleSetGender('Female');
                        }}>
                            <Text style={epStyles.bottomSheetButtons}>Female</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            toggleGView();
                            handleSetGender('LGBT');
                        }}>
                            <Text style={epStyles.bottomSheetButtons}>LGBTQ+</Text>
                        </Pressable>
                    </View>
                </BottomSheet>
                <BottomSheet
                    visible={cSVisible}
                    onBackButtonPress={toggleCSView}
                    onBackdropPress={toggleCSView}
                >
                    <View style={epStyles.bottomNavigationView}>
                        <Text style={epStyles.bottomSheetHeader}>* Civil Status</Text>
                        <View style={epStyles.bottomSheetDivider}/>
                        <Pressable onPress={() => {
                            toggleCSView();
                            handleSetCStatus('Single');
                        }}>
                            <Text style={epStyles.bottomSheetButtons}>Single</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            toggleCSView();
                            handleSetCStatus('Married');
                        }}>
                            <Text style={epStyles.bottomSheetButtons}>Married</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            toggleCSView();
                            handleSetCStatus('Widowed');
                        }}>
                            <Text style={epStyles.bottomSheetButtons}>Widowed</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                            toggleCSView();
                            handleSetCStatus('Separated');
                        }}>
                            <Text style={epStyles.bottomSheetButtons}>Separated</Text>
                        </Pressable>
                    </View>
                </BottomSheet>
                <BottomSheet
                    visible={rSVisible}
                    onBackButtonPress={toggleRSView}
                    onBackdropPress={toggleRSView}
                >
                    <View style={epStyles.bottomNavigationView}>
                        <Text style={epStyles.bottomSheetHeader}>* Responder Status</Text>
                        <View style={epStyles.bottomSheetDivider}/>
                        <View style={epStyles.bottomSheetDualButtonContainer}>
                            <Pressable onPress={() => {
                                toggleRSView();
                                handleSetRStatus('Dispatch');
                            }}>
                                <Text style={epStyles.bottomSheetButton1}>Emergency Dispatch Operator</Text>
                            </Pressable>
                            <View style={epStyles.bottomSheetDualButtonDivider}/>
                            <Pressable onPress={() => {
                                toggleRSView();
                                handleSetRStatus('QRT');
                            }}>
                                <Text style={epStyles.bottomSheetButton2}>Quick Response</Text>
                            </Pressable>
                        </View>
                        <View style={epStyles.bottomSheetDualButtonContainer}>
                            <Pressable onPress={() => {
                                toggleRSView();
                                handleSetRStatus('EMS');
                            }}>
                                <Text style={epStyles.bottomSheetButton1}>Emergency Medical Service</Text>
                            </Pressable>
                            <View style={epStyles.bottomSheetDualButtonDivider}/>
                            <Pressable onPress={() => {
                                toggleRSView();
                                handleSetRStatus('Traffic Dept.');
                            }}>
                                <Text style={epStyles.bottomSheetButton2}>Traffic Enforcer</Text>
                            </Pressable>
                        </View>
                        <View style={epStyles.bottomSheetDualButtonContainer}>
                            <Pressable onPress={() => {
                                toggleRSView();
                                handleSetRStatus('Fireman');
                            }}>
                                <Text style={epStyles.bottomSheetButton1}>Firefighter</Text>
                            </Pressable>
                            <View style={epStyles.bottomSheetDualButtonDivider}/>
                            <Pressable onPress={() => {
                                toggleRSView();
                                handleSetRStatus('LGU Frontliner');
                            }}>
                                <Text style={epStyles.bottomSheetButton2}>LGU Frontliner</Text>
                            </Pressable>
                        </View>
                        <View style={epStyles.bottomSheetDualButtonContainer}>
                            <Pressable onPress={() => {
                                toggleRSView();
                                handleSetRStatus('Policeman');
                            }}>
                                <Text style={epStyles.bottomSheetButton1}>Police Officer</Text>
                            </Pressable>
                            <View style={epStyles.bottomSheetDualButtonDivider}/>
                            <Pressable onPress={() => {
                                toggleRSView();
                                handleSetRStatus('Volunteer');
                            }}>
                                <Text style={epStyles.bottomSheetButton2}>Volunteer</Text>
                            </Pressable>
                        </View>
                        <View style={epStyles.bottomSheetDualButtonContainer}>
                            <Pressable onPress={() => {
                                toggleRSView();
                                handleSetRStatus('Military');
                            }}>
                                <Text style={epStyles.bottomSheetButton1}>Military</Text>
                            </Pressable>
                            <View style={epStyles.bottomSheetDualButtonDivider}/>
                            <Pressable onPress={() => {
                                toggleRSView();
                                handleSetRStatus('Others');
                            }}>
                                <Text style={epStyles.bottomSheetButton2}>Others</Text>
                            </Pressable>
                        </View>
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
        paddingBottom: 4.0,
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
        paddingHorizontal: 12.0,
        paddingVertical: 12.0,
        borderColor: 'grey',
        borderWidth: 1.0,
        borderRadius: 4.0,
        alignSelf: 'stretch',
        alignItems: 'stretch',
        alignContent: 'stretch',
        fontFamily: 'Inter',
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
    bottomSheetDualButtonContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    bottomSheetDualButtonDivider: {
        height: 16.0,
        borderRightWidth: StyleSheet.hairlineWidth,
    },
    bottomSheetButton1: {
        width: Dimensions.get('window').width * 0.45,
        paddingStart: 16.0,
        paddingVertical: 8.0,
        fontFamily: 'Inter',
        color: '#1f1f1f',
    },
    bottomSheetButton2: {
        width: Dimensions.get('window').width * 0.25,
        alignSelf: 'flex-end',
        paddingStart: 16.0,
        paddingVertical: 8.0,
        fontFamily: 'Inter',
        color: '#1f1f1f',
    },
});