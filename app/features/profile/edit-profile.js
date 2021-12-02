import axios from 'axios';
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
    faDesktop,
} from '@fortawesome/free-solid-svg-icons';
import {
    faTwitter,
    faFacebook,
    faYoutube,
    faLinkedin,
    faInstagram,
} from '@fortawesome/free-brands-svg-icons'
import * as ImagePicker from 'expo-image-picker';
import { BottomSheet } from 'react-native-btr';
import MapView, { Marker } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import * as Constants from './../../core/utils/common/constants';
import { format } from 'date-fns';

export default function EditProfile(props) {
    // console.log(`ep token - ${props.token} x ${props.profileObject.user.name}`);
    const [location, setLocation] = React.useState(props.profileObject?.lat ? 
        {coords: {latitude: props.profileObject.lat, longitude: props.profileObject.lng}} : null);
    const [region, setRegion] = React.useState({region: {
        latitude: 10.3726123,
        longitude: 123.9454986,
    }});
    const [homeAddress, setHomeAddress] = React.useState(props.profileObject?.completeaddress ? 
        props.profileObject.completeaddress : '');
    const[isMapReady, setMapReady] = React.useState(false);
    const map = React.useRef(null);
    const handleMapReady = React.useCallback(() => {
        setMapReady(true);
    }, [map, setMapReady]);
    if (!props.profileObject?.lat) {
        React.useEffect(() => {
            (async() => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission not granted');
                    return;
                }
                let l = await Location.getCurrentPositionAsync({});
                console.log(`Location - ${JSON.stringify(l)}`);
                setLocation(l);
            }) ();
        }, []);
    }
    const [city, setCity] = React.useState(props.profileObject?.city ? props.profileObject.city : '');
    const [area, setArea] = React.useState(props.profileObject?.area ? props.profileObject.area : '');
    const [sState, setSState] = React.useState(props.profileObject?.state ? props.profileObject.state : '');
    const [userLat, setLat] = React.useState(props.profileObject?.lat ? props.profileObject.lat : 0.0);
    const [userLng, setLng] = React.useState(props.profileObject?.lng ? props.profileObject.lng : 0.0);
    const [visible, setVisible] = React.useState(false);
    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };
    // The path of the picked image
    const [pickedImagePath, setPickedImagePath] = React.useState(props.profileObject?.profilepic ? 
        `${Constants.BASE_URL_IMG}/${props.profileObject.profilepic}` : '');
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
    const [oInfoVisible, setOInfoVisible] = React.useState(false);
    const toggleOInfoVisibility = () => {
        setOInfoVisible(!oInfoVisible);
    }
    const [eInfoVisible, setEInfoVisible] = React.useState(false);
    const toggleEInfoVisibility = () => {
        setEInfoVisible(!eInfoVisible);
    }
    const [sInfoVisible, setSInfoVisible] = React.useState(false);
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
    const [gender, setGender] = React.useState((props.profileObject?.gender) ? 
    Constants.Gender[props.profileObject.gender]: '* Gender');
    const [genderVal, setGenderVal] = React.useState((props.profileObject?.gender) ? 
    props.profileObject.gender : '0');
    const handleSetGender = (g) => {
        // console.log(`${genderVal} x ${Constants.Gender[genderVal]} x ${g}`);
        if (genderVal !== g) {
            setGender(Constants.Gender[g]);
            setGenderVal(g);
        }
    };
    const [cSVisible, setCSVisible] = React.useState(false);
    const toggleCSView = () => {
        //Toggling the visibility state of the bottom sheet
        setCSVisible(!cSVisible);
    };
    const [cStatus, setCStatus] = React.useState((props.profileObject?.civilstatus) ? 
    Constants.CivilStatus[props.profileObject.civilstatus] : '* Civil Status');
    const [cStatusVal, setCStatusVal] = React.useState((props.profileObject?.civilstatus) ? 
    props.profileObject.civilstatus : '0');
    const handleSetCStatus = (cs) => {
        // console.log(`handleSetGender ${gender} x ${g}`);
        if (cStatusVal !== cs) {
            setCStatus(Constants.CivilStatus[cs]);
            setCStatusVal(cs);
        }
    };
    const [bDate, setBDate] = React.useState((props.profileObject?.birthday) ? 
    new Date(props.profileObject.birthday) : new Date());
    const [bDateOpen, setBDateOpen] = React.useState(false);
    const [mode, setMode] = React.useState('date');
    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || bDate;
        setBDateOpen(false);
        setBDate(currentDate);
    };
    const [rSVisible, setRSVisible] = React.useState(false);
    const toggleRSView = () => {
        //Toggling the visibility state of the bottom sheet
        setRSVisible(!rSVisible);
    };
    const [rStatus, setRStatus] = React.useState((props.profileObject?.status) ? 
    Constants.RStatus[props.profileObject.status] : '* Responder Status');
    const [rStatusVal, setRStatusVal] = React.useState((props.profileObject?.status) ? 
    props.profileObject.status : '* Responder Status')
    const handleSetRStatus = (rs) => {
        if (rStatusVal !== rs) {
            setRStatus(Constants.RStatus[rs]);
            setRStatusVal(rs);
        }
    };
    const [bTVisible, setBTVisible] = React.useState(false);
    const toggleBTView = () => {
        //Toggling the visibility state of the bottom sheet
        setBTVisible(!bTVisible);
    };
    const [bloodType, setBType] = React.useState('Blood Type')
    const handleSetBType = (bt) => {
        if (bloodType !== bt) {
            setBType(bt);
        }
    };
    const [iVisible, setIVisible] = React.useState(false);
    const toggleIView = () => {
        //Toggling the visibility state of the bottom sheet
        setIVisible(!iVisible);
    };
    const [insurance, setInsurance] = React.useState('Insured?')
    const handleSetInsurance = (i) => {
        if (insurance !== i) {
            setInsurance(i);
        }
    };
    const [bio, setBio] = React.useState((props.profileObject?.bio) ? props.profileObject.bio : '');
    const [org, setOrg] = React.useState((props.profileObject?.organization) ? props.profileObject.organization : '');
    const [orgWebsite, setOrgWebsite] = React.useState((props.profileObject?.website) ? props.profileObject.website : '');
    const [orgAddress, setOrgAddress] = React.useState((props.profileObject?.location) ? props.profileObject.location : '');
    const [skills, setSkills] = React.useState((props.profileObject?.skills) ? props.profileObject.skills : []);
    const submit = async () => {

    };
    const getAddress = async (lat, lng) => {
        try {
            // console.log('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
            // lat + ',' + lng + '&key=' + Constants.API_KEY);
            await axios.get(
                'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + 
                lat + ',' + lng + '&key=' + Constants.API_KEY, null)
                .then(response => {
                    if (!(JSON.stringify(response.data).includes('error'))) {
                        // console.log(response.data);
                        var r = response.data.results;
                        setHomeAddress(r[0].formatted_address);
                        for (var i in r) {
                            var x = r[i].address_components
                            for (var c in x) {
                                var y = JSON.stringify(x[c].types);
                                // console.log(y, ['locality', 'political'].toString);
                                if (y === JSON.stringify(['locality', 'political'])) {
                                    setCity(x[c].long_name);
                                }
                                else if (y === JSON.stringify(['administrative_area_level_5', 'political'])) {
                                    setArea(x[c].long_name);
                                }
                                else if (y === JSON.stringify(['administrative_area_level_2', 'political'])) {
                                    setSState(x[c].long_name);
                                }
                                else {
                                    // do nothing
                                }
                            }
                        }
                    }
                })
                .catch(err => {
                    console.log(`${err}`)
                });
        } catch (error) {
            alert('oyy' + error);
        }
    }
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

                <ScrollView keyboardShouldPersistTaps='handled' showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} horizontal={false}>
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
                    {/* {console.log(`${Constants.BASE_URL_IMG}/${props.profileObject.profilepic}`)} */}

                    <View style={epStyles.imageContainer}>
                        <Image
                            source={(pickedImagePath !== '' ? {uri: pickedImagePath} : 
                            // (props.profileObject?.profilepic !== '') ? 
                            // {uri: `${Constants.BASE_URL_IMG}/${props.profileObject.profilepic}`} :
                            require('./../../core/assets/common/spotter.png'))}
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
                                <MapView 
                                    onPress={(event) => {
                                        // console.log(event.nativeEvent.coordinate);
                                        var c = event.nativeEvent.coordinate;
                                        setLocation({coords: c})
                                        getAddress(c.latitude, c.longitude);
                                    }}
                                    style={[epStyles.map, {marginTop: 8.0,}]}
                                    initialRegion={{
                                        latitude: location?.coords.latitude ?? 0.0,
                                        longitude: location?.coords.longitude ?? 0.0,
                                        latitudeDelta: 0.015 * 5,
                                        longitudeDelta: 0.0121 * 5,
                                    }}
                                    region={{
                                        latitude: location?.coords.latitude ?? 0.0,
                                        longitude: location?.coords.longitude ?? 0.0,
                                        latitudeDelta: 0.00025,
                                        longitudeDelta: 0.0025,
                                    }}
                                    ref={map}
                                    onMapReady={handleMapReady}
                                    zoomControlEnabled={true}
                                    mapPadding={{left: 24.0, ...Platform.select({
                                        ios: {
                                            right: 16.0,
                                        },
                                        android: {
                                            right: 32.0,
                                        }
                                    })}}
                                >
                                    {location && <Marker
                                        draggable={true}
                                        coordinate={location.coords}
                                        title="Home Address"
                                        description={homeAddress}
                                    />}
                                </MapView>
                                <ScrollView keyboardShouldPersistTaps='handled' horizontal={true} style={[epStyles.googlePlacesAutocompleteInput, {alignSelf: 'flex-start'}]}>
                                    <GooglePlacesAutocomplete
                                        styles={{
                                            container: {width: '100%',},
                                            textInputContainer: {width: '100%',},
                                            textInput: {width: '100%',},
                                            alignSelf: 'stretch',
                                            alignItems: 'stretch',
                                            alignContent: 'stretch',
                                            listView: {
                                                paddingVertical: 0.0,
                                                backgroundColor: '#000',
                                            },
                                        }}
                                        placeholder='Search nearest landmark'
                                        onPress={(data, details = null)=> {
                                            console.log(details.formatted_address, data.description);
                                            // console.log(JSON.stringify(data) + ' x ' + JSON.stringify(details));
                                            const coor = details.geometry.location;
                                            setLocation({coords: {
                                                latitude: coor.lat,
                                                longitude: coor.lng,
                                            }});
                                            setHomeAddress(details.formatted_address);
                                            setSearchVal('');
                                        }}
                                        query={{
                                            key: Constants.API_KEY,
                                            language: 'en',
                                            components: 'country:ph'
                                        }}
                                        minLength={3}
                                        onFail={(error) => {
                                            console.log(`error x ${error}`);
                                            console.error(error);
                                        }}
                                        fetchDetails={true}
                                        textInputProps={{
                                            style: {
                                                width: 508.0,
                                                height: 48.0,
                                                borderRadius: 4.0,
                                                borderColor: 'grey',
                                                borderWidth: StyleSheet.hairlineWidth,
                                                paddingHorizontal: 12.0,
                                            }
                                        }}
                                        // currentLocation={true}
                                        // currentLocationLabel='Current location'
                                    />
                                </ScrollView>
                                {/* <ScrollView horizontal={false} style={{flex: 1, backgroundColor: '#215a75', height: 56.0, width: '100%'}}> */}
                                {/* </ScrollView> */}
                            </View>
                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='* Home Address'
                                editable={false}
                                value={homeAddress}
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

                            <Pressable onPress={() => {setBDateOpen(!bDateOpen)}}>
                                <Text style={[epStyles.formInput, {color: (cStatus !== 'mm/dd/yyyy') ? '#000': '#aaa'}]}>{format(Date.parse(bDate), "MM/dd/yyyy")}</Text>
                            </Pressable>
                            {bDateOpen && (
                                <DateTimePicker
                                    testID="dateTimePicker"
                                    value={bDate}
                                    mode={mode}
                                    is24Hour={true}
                                    display="default"
                                    onChange={onDateChange}
                                />
                            )}
                            {/* <DatePicker
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
                            /> */}
                            <Text style={epStyles.label}>Birthdate (mm/dd/yyyy)</Text>

                            <TextInput
                                multiline
                                style={[epStyles.formInput, {height: 120.0, textAlignVertical: 'top'}]} 
                                placeholder='A short bio of yourself'
                                value={bio}
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
                                value={org}
                            />
                            <Text style={epStyles.label}>Organization you are an affiliated/member</Text>

                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='Website'
                                value={orgWebsite}
                            />
                            <Text style={epStyles.label}>Organization website</Text>

                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='Organization Address'
                                value={orgAddress}
                            />
                            <Text style={epStyles.label}>City or Municipality where organization is located</Text>

                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='* Skills'
                                value={skills.join(',')}
                            />
                            <Text style={epStyles.label}>Please use comma separated values (eg. Patient Care, EMS, EMT, CPR, Hazardous Materials, Trauma)</Text>
                        </View>}

                        <Pressable onPress={toggleEInfoVisibility}>
                            <View style={[epStyles.formBtnPrimary, {marginTop: (eInfoVisible ? 8.0 : 4.0),}]}>
                                <FontAwesomeIcon 
                                    style={epStyles.formBtnIcon}
                                    icon={faBuilding}
                                />
                                <Text style={epStyles.formBtnText}>Emergency Information</Text>
                            </View>
                        </Pressable>
                        {eInfoVisible && <View>
                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='* Contact Person'
                            />
                            <Text style={epStyles.label}>Name of your contact person, in case of emergency</Text>

                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='* Relationship'
                            />
                            <Text style={epStyles.label}>Your relationship to your contact person</Text>

                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='* Mobile number'
                            />
                            <Text style={epStyles.label}>Mobile number of your contact person</Text>

                            <TextInput
                                style={epStyles.formInput} 
                                placeholder='* Address'
                            />
                            <Text style={epStyles.label}>Address of your contact person</Text>

                            <Pressable onPress={toggleBTView}>
                                <Text style={[epStyles.formInput, {color: (bloodType !== 'Blood Type') ? '#000': '#aaa'}]}>{bloodType}</Text>
                            </Pressable>
                            <Text style={epStyles.label}>Your blood type (optional)</Text>

                            <Pressable onPress={toggleIView}>
                                <Text style={[epStyles.formInput, {color: (insurance !== 'Insured?') ? '#000': '#aaa'}]}>{insurance}</Text>
                            </Pressable>
                            <Text style={epStyles.label}>Are you insured? (optional)</Text>
                        </View>}

                        <Pressable onPress={toggleSInfoVisibility}>
                            <View style={[epStyles.formBtnPrimary, {marginTop: (sInfoVisible ? 8.0 : 4.0),}]}>
                                <FontAwesomeIcon 
                                    style={epStyles.formBtnIcon}
                                    icon={faDesktop}
                                />
                                <Text style={epStyles.formBtnText}>Social Network Links</Text>
                            </View>
                        </Pressable>
                        {sInfoVisible && <View>
                            <View style={epStyles.socialMediaLinkContainer}>
                                <FontAwesomeIcon
                                    icon={faTwitter}
                                    style={epStyles.sMIconTwitter}
                                    size={36.0} 
                                />
                                <TextInput
                                    style={epStyles.sMInput} 
                                    placeholder='Twitter URL'
                                />
                            </View>

                            <View style={epStyles.socialMediaLinkContainer}>
                                <FontAwesomeIcon
                                    icon={faFacebook}
                                    style={epStyles.sMIconFacebook}
                                    size={36.0} 
                                />
                                <TextInput
                                    style={epStyles.sMInput} 
                                    placeholder='Facebook URL'
                                />
                            </View>

                            <View style={epStyles.socialMediaLinkContainer}>
                                <FontAwesomeIcon
                                    icon={faYoutube}
                                    style={epStyles.sMIconYoutube}
                                    size={36.0} 
                                />
                                <TextInput
                                    style={epStyles.sMInput} 
                                    placeholder='Youtube URL'
                                />
                            </View>

                            <View style={epStyles.socialMediaLinkContainer}>
                                <FontAwesomeIcon
                                    icon={faLinkedin}
                                    style={epStyles.sMIconLinkedIn}
                                    size={36.0} 
                                />
                                <TextInput
                                    style={epStyles.sMInput} 
                                    placeholder='LinkedIn URL'
                                />
                            </View>

                            <View style={epStyles.socialMediaLinkContainer}>
                                <View style={epStyles.instagramIconContainer}>
                                    <LinearGradient
                                        colors={['#405de6', '#5851db', '#833ab4', '#c13584', '#e1306c', '#fd1d1d']}
                                        start={{x: 0.0, y: 0.45}}
                                        end={{x: 1.0, y: 1.0}}
                                        style={epStyles.instagramIconLinearGradient}
                                    >
                                        <FontAwesomeIcon
                                            icon={faInstagram}
                                            style={epStyles.sMIconInstagram}
                                            size={32.0} 
                                        />
                                    </LinearGradient>
                                </View>
                                <TextInput
                                    style={epStyles.sMInput} 
                                    placeholder='Instagram URL'
                                />
                            </View>
                        </View>}
                    </View>

                    <View style={epStyles.actionButtonsContainer}>
                        <Pressable style={epStyles.actionBtnContainer}>
                            <Text style={[epStyles.actionBtnText, {fontSize: 20.0}]}>Submit</Text>
                        </Pressable>
                        <Pressable 
                            onPress={() => {
                                props.handleSetScreen('home');
                            }}
                            style={[epStyles.actionBtnContainer, {marginStart: 8.0, backgroundColor: '#fff'}]}
                        >
                            <Text style={[epStyles.actionBtnText, {fontSize: 16.0, color: '#1f1f1f'}]}>Go Back</Text>
                        </Pressable>
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
                <BottomSheet
                    visible={bTVisible}
                    onBackButtonPress={toggleBTView}
                    onBackdropPress={toggleBTView}
                >
                    <View style={epStyles.bottomNavigationView}>
                        <Text style={epStyles.bottomSheetHeader}>Select blood type</Text>
                        <View style={epStyles.bottomSheetDivider}/>
                        <View style={epStyles.bottomSheetDualButtonContainer}>
                            <Pressable onPress={() => {
                                toggleBTView();
                                handleSetBType('A');
                            }}>
                                <Text style={epStyles.bottomSheetBtn1}>A</Text>
                            </Pressable>
                            <View style={epStyles.bottomSheetDualButtonDivider}/>
                            <Pressable onPress={() => {
                                toggleBTView();
                                handleSetBType('B');
                            }}>
                                <Text style={epStyles.bottomSheetBtn2}>B</Text>
                            </Pressable>
                            <View style={epStyles.bottomSheetDualButtonDivider}/>
                            <Pressable onPress={() => {
                                toggleBTView();
                                handleSetBType('O');
                            }}>
                                <Text style={epStyles.bottomSheetBtn3}>O</Text>
                            </Pressable>
                            <View style={epStyles.bottomSheetDualButtonDivider}/>
                            <Pressable onPress={() => {
                                toggleBTView();
                                handleSetBType('AB');
                            }}>
                                <Text style={epStyles.bottomSheetBtn4}>AB</Text>
                            </Pressable>
                        </View>
                        <View style={epStyles.bottomSheetDualButtonContainer}>
                            <Pressable onPress={() => {
                                toggleBTView();
                                handleSetBType('A+');
                            }}>
                                <Text style={epStyles.bottomSheetBtn1}>A+</Text>
                            </Pressable>
                            <View style={epStyles.bottomSheetDualButtonDivider}/>
                            <Pressable onPress={() => {
                                toggleBTView();
                                handleSetBType('B+');
                            }}>
                                <Text style={epStyles.bottomSheetBtn2}>B+</Text>
                            </Pressable>
                            <View style={epStyles.bottomSheetDualButtonDivider}/>
                            <Pressable onPress={() => {
                                toggleBTView();
                                handleSetBType('O+');
                            }}>
                                <Text style={epStyles.bottomSheetBtn3}>O+</Text>
                            </Pressable>
                            <View style={epStyles.bottomSheetDualButtonDivider}/>
                            <Pressable onPress={() => {
                                toggleBTView();
                                handleSetBType('AB+');
                            }}>
                                <Text style={epStyles.bottomSheetBtn4}>AB+</Text>
                            </Pressable>
                        </View>
                    </View>
                </BottomSheet>
                <BottomSheet
                    visible={iVisible}
                    onBackButtonPress={toggleIView}
                    onBackdropPress={toggleIView}
                >
                    <View style={epStyles.bottomNavigationView}>
                        <Text style={epStyles.bottomSheetHeader}>Do you have an insurance?</Text>
                        <View style={epStyles.bottomSheetDivider}/>
                        <Pressable onPress={() => {
                                toggleIView();
                                handleSetInsurance('Yes');
                            }}>
                            <Text style={epStyles.bottomSheetButtons}>Yes</Text>
                        </Pressable>
                        <Pressable onPress={() => {
                                toggleIView();
                                handleSetInsurance('No');
                            }}>
                            <Text style={epStyles.bottomSheetButtons}>No</Text>
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
        display: 'flex',
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
    bottomSheetBtn1: {
        width: Dimensions.get('window').width * 0.17,
        paddingStart: 16.0,
        paddingVertical: 8.0,
        fontFamily: 'Inter',
        color: '#1f1f1f',
    },
    bottomSheetBtn2: {
        width: Dimensions.get('window').width * 0.17,
        paddingStart: 16.0,
        paddingVertical: 8.0,
        fontFamily: 'Inter',
        color: '#1f1f1f',
    },
    bottomSheetBtn3: {
        width: Dimensions.get('window').width * 0.17,
        paddingStart: 16.0,
        paddingVertical: 8.0,
        fontFamily: 'Inter',
        color: '#1f1f1f',
    },
    bottomSheetBtn4: {
        width: Dimensions.get('window').width * 0.17,
        paddingStart: 16.0,
        paddingVertical: 8.0,
        fontFamily: 'Inter',
        color: '#1f1f1f',
    },
    socialMediaLinkContainer: {
        marginTop: 16.0,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
    },
    sMInput: {
        marginStart: 8.0,
        paddingHorizontal: 12.0,
        paddingVertical: 8.0,
        borderColor: 'grey',
        borderWidth: 1.0,
        borderRadius: 4.0,
        alignSelf: 'stretch',
        alignItems: 'stretch',
        alignContent: 'stretch',
        fontFamily: 'Inter',
        flex: 1,
    },
    sMIconTwitter: {
        color: '#1da1f2',
    },
    sMIconFacebook: {
        color: '#3b5998',
    },
    sMIconYoutube: {
        color: '#c4302b',
    },
    sMIconLinkedIn: {
        color: '#0072b1',
    },
    sMIconInstagram: {
        color: '#fff',
    },
    instagramIconContainer: {
        width: 36.0,
        height: 36.0,
        borderRadius: 16.0,
    },
    instagramIconLinearGradient: {
        borderRadius: 10.0,
        width: 36.0,
        height: 36.0,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    actionBtnText: {
        fontFamily: 'Inter',
        fontSize: 16.0,
        color: '#fff',
        textAlignVertical: 'center',
        alignSelf: 'center',
    },
    actionBtnContainer: {
        paddingHorizontal: 24.0,
        paddingVertical: 8.0,
        borderRadius: 4.0,
        color: '#215a75',
        backgroundColor: '#215a75',
        alignContent: 'center',
        justifyContent: 'center',
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 16.0,
    },
    googlePlacesAutocompleteInput: {
        width: '100%',
        position: 'absolute',
        top: 8.0,
        start: 8.0,
        left: 8.0,
        right: 8.0,
        end: 8.0,
        // bottom: 8.0,
        // backgroundColor: '#000'
    },
});