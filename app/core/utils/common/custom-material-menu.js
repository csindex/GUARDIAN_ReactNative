import * as React from 'react';
import {
    Text,
    Image, 
    TouchableOpacity, 
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChild, faIdBadge, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import {
    Menu,
    MenuItem
} from 'react-native-material-menu';

export default function CustomMaterialMenu() {
    const [visible, setVisible] = React.useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);
    return (
        <View>
            <Menu
                visible={visible}
                onRequestClose={hideMenu}
                button={
                    <TouchableOpacity
                        activeOpacity={0.6}
                    >
                        <Image
                            source={require('./../../assets/common/spotter.png')}
                        />
                    </TouchableOpacity>
                }
            >
                <MenuItem>Menu</MenuItem>
            </Menu>
        </View>
    );
};