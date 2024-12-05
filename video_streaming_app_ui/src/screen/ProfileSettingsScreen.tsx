import { Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { TextStyle } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const HeaderNavigation = () : React.JSX.Element => {
    type HeaderNavigation_Stype = {
        container: ViewStyle,
        title: TextStyle,
        icon_wrapper: ViewStyle,
        icon: TextStyle,
    };
    const style = useMemo<HeaderNavigation_Stype>(() => ({
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            borderBottomColor: 'white',
            borderBottomWidth: 0.5,
            paddingVertical: 10,
        },
        title: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
        },
        icon_wrapper: {
            position: 'absolute',
            left: 5,
            top: '50%',
            transform: [
                {translateY: '-25%'},
            ],
        },
        icon: {
            fontSize: 35,
            color: 'white',
        },
    }), []);
    const navigation = useNavigation<any>();
    return (
        <View style={[style.container]}>
            <Text style={[style.title]}>Chỉnh sửa trang cá nhân</Text>
            <TouchableOpacity style={[style.icon_wrapper]} onPress={() => navigation.goBack()}>
                <IconMaterialIcons name="keyboard-backspace" style={[style.icon]}/>
            </TouchableOpacity>
        </View>
    );
};

const ProfileSettingsScreen = () : React.JSX.Element => {
    type ProfileSettingsScreen_Style = {
        container?: ViewStyle,
    }
    const style = useMemo<ProfileSettingsScreen_Style>(() => ({
        container: {
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            position: 'relative',
        },
    }), []);
    return (
        <View style={[style.container]}>
            <HeaderNavigation/>
        </View>
    );
};

export default ProfileSettingsScreen;
