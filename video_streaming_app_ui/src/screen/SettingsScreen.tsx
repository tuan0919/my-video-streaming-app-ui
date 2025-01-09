import { Text, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { TextStyle } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
const HeaderNavigation = () : React.JSX.Element => {
    type HeaderNavigation_Stype = {
        container: ViewStyle,
        title: TextStyle,
        icon_wrapper: ViewStyle,
        icon: TextStyle,
    };
    const style = useMemo<HeaderNavigation_Stype>(() => ({
        container: {
            position: 'relative',
            borderBottomWidth: 0.5,
            paddingVertical: 10,
            borderBottomColor: 'white',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        title: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
        },
        icon_wrapper: {
            position: 'absolute',
            left: 5,
            top: 5,
        },
        icon: {
            fontSize: 35,
            color: 'white',
        },
    }), []);
    const navigation = useNavigation<any>();
    return (
        <View style={[style.container]}>
            <Text style={[style.title]}>Cài đặt và hoạt động</Text>
            <TouchableOpacity style={[style.icon_wrapper]} onPress={() => navigation.navigate('Profile Navigator')}>
                <IconMaterialIcons name="keyboard-backspace" style={[style.icon]}/>
            </TouchableOpacity>
        </View>
    );
};


const SettingContent = () => {
    return (
        <View style={{gap: 20, padding: 10}}>
            <View style={{flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                <FontAwesomeIcon name="bookmark-o" color={'white'} size={30}/>
                <Text style={{fontWeight: 'semibold', color: 'white', fontSize: 18}}>Đã lưu</Text>
                <AntDesignIcon name="right" color={'gray'} size={20}/>
            </View>
            <View style={{flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                <IoniconsIcon name="notifications-outline" color={'white'} size={30}/>
                <Text style={{fontWeight: 'semibold', color: 'white', fontSize: 18}}>Thông báo</Text>
                <AntDesignIcon name="right" color={'gray'} size={20}/>
            </View>
            <View style={{flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'space-between'}}>
                <IoniconsIcon name="key-outline" color={'white'} size={30}/>
                <Text style={{fontWeight: 'semibold', color: 'white', fontSize: 18}}>Thay đổi mật khẩu</Text>
                <AntDesignIcon name="right" color={'gray'} size={20}/>
            </View>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
                <View style={{
                    paddingVertical: 5,
                    flexDirection: 'row', gap: 10,
                    alignItems: 'center', borderWidth: 1,
                    borderColor: 'rgb(166, 0, 0)',
                    borderRadius: 15,
                    paddingHorizontal: 20, backgroundColor: 'rgb(255, 54, 54)',
                }}>
                    <MaterialIconsIcon name="logout" color={'white'} size={30}/>
                    <Text style={{fontWeight: 'bold', color: 'white'}}>Đăng xuất tài khoản</Text>
                </View>
            </View>
        </View>
    )
}

const SettingsScreen = () : React.JSX.Element => {
    type SettingsScreen_Style = {
        container?: ViewStyle,
    }
    const style = useMemo<SettingsScreen_Style>(() => ({
        container: {
            backgroundColor: 'black',
            height: '100%',
            width: '100%',
            position: 'relative',
        },
    }), []);
    return (
        <>
            <View style={[style.container]}>
                <HeaderNavigation/>
                <SettingContent/>
            </View>
        </>
    );
};

export default SettingsScreen;
