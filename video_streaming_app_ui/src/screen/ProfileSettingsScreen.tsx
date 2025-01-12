import { Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { ViewStyle } from 'react-native';
import { TextStyle } from 'react-native';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RadioButton, TextInput } from 'react-native-paper';
import { UpdateProfileRequest, UserRepository } from '../repository';

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
            <Text style={[style.title]}>Chỉnh sửa trang cá nhân</Text>
            <TouchableOpacity style={[style.icon_wrapper]} onPress={() => navigation.navigate('Profile Navigator')}>
                <IconMaterialIcons name="keyboard-backspace" style={[style.icon]}/>
            </TouchableOpacity>
        </View>
    );
};

const AvatarSetting = () : React.JSX.Element => {
    const route = useRoute<any>();
    const {profileInfo} = route.params;
    type AvatarSetting_Style = {
        container?: ViewStyle,
        button_wrapper?: ViewStyle,
        icon?: TextStyle,
    }
    const style = useMemo<AvatarSetting_Style>(() => ({
        container: {
            flexDirection: 'column',
            justifyContent: 'center',
            height: 150,
            alignItems: 'center',
            gap: 10,
        },
        button_wrapper: {
            borderRadius: 50,
            width: 70,
            height: 70,
            backgroundColor: '#aaaaaa',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        icon: {
            color: 'white',
            fontSize: 23,
        },
    }), []);
    return (
        <View style={[style.container]}>
            {/* <TouchableOpacity style={[style.button_wrapper]}>
                <IconEntypo name="camera" style={[style.icon]}/>
            </TouchableOpacity> */}
            <View style={[{
                width: 100,
                height: 100,
                overflow: 'hidden',
                borderRadius: 50,
            }]}>
                <Image
                source={{uri: profileInfo.avatarLink}}
                style={{width: '100%', height: '100%'}}
                />
            </View>
            <Text style={{fontWeight: 'bold', color: 'green'}}>Chỉnh sửa avatar</Text>
        </View>
    );
};

const AccountFieldsSetting = ({onUpdateProfile} : {onUpdateProfile : (request : UpdateProfileRequest) => Promise<string | undefined> }) : React.JSX.Element => {
    const route = useRoute<any>();
    const {profileInfo} = route.params;
    type AccountFieldsSetting_Style = {
        container?: ViewStyle,
        label?: TextStyle,
        input_wrapper?: ViewStyle,
        input_field?: TextStyle,
        radio_group?: ViewStyle,
        radio_wrapper?: ViewStyle,
        radio_label?: TextStyle,
        button_action_wrapper?: ViewStyle,
        button_edit?: ViewStyle,
        button_text?: TextStyle,
    }
    const style = useMemo<AccountFieldsSetting_Style>(() => ({
        container: {
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
        },
        input_wrapper: {
            borderWidth: 0.5,
            borderColor: 'lightgreen',
            width: '80%',
            paddingLeft: 10,
            paddingTop: 5,
            borderRadius: 10,
        },
        label: {
            color: 'green',
            fontWeight: 'bold',
        },
        input_field : {
            width: '80%',
            backgroundColor: 'rgba(0,0,0,1)',
        },
        radio_group: {
            flexDirection: 'row',
            gap: 10,
        },
        radio_wrapper: {
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
        },
        radio_label: {
            fontWeight: 'bold',
            color: 'white',
            fontSize: 15,
        },
        button_action_wrapper: {
            flexDirection: 'row',
            justifyContent: 'center',
        },
        button_edit: {
            backgroundColor: '#FCC737',
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderRadius: 8,
            borderWidth: 2,
            borderColor: '#FFA447',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
        },
        button_text: {
            fontSize: 13,
            color: 'black',
            fontWeight: 'bold',
        },
    }), []);
    const [fullName, setFullName] = useState(profileInfo.fullName);
    const [gender, setGender] = useState(profileInfo.gender);
    const [country, setCountry] = useState(profileInfo.country);
    const [address, setAddress] = useState(profileInfo.address);
    const [bio, setBio] = useState(profileInfo.bio);
    return (
        <ScrollView>
            <KeyboardAvoidingView style={[style.container]}>
            <TextInput
                style={[style.input_field]}
                mode="outlined"
                label={<Text style={[style.label]}>Họ và tên</Text>}
                activeOutlineColor="green"
                value={fullName}
                onChangeText={setFullName}
                outlineColor="green"
                textColor="white"
            />
            <View style={[style.radio_group]}>
                <TouchableOpacity onPress={() => setGender(() => true)} style={[style.radio_wrapper]}>
                    <Text style={[style.radio_label]}>Nam</Text>
                    <RadioButton
                        value="first"
                        status={ gender ? 'checked' : 'unchecked' }
                        uncheckedColor="green"
                        color="green"
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setGender(() => false)} style={[style.radio_wrapper]}>
                    <Text style={[style.radio_label]}>Nữ</Text>
                    <RadioButton
                        value="second"
                        status={ !gender ? 'checked' : 'unchecked' }
                        uncheckedColor="green"
                        color="green"
                    />
                </TouchableOpacity>
            </View>
            <TextInput
                style={[style.input_field]}
                mode="outlined"
                label={<Text style={[style.label]}>Quốc gia</Text>}
                activeOutlineColor="green"
                onChangeText={setCountry}
                value={country}
                outlineColor="green"
                textColor="white"
            />
            <TextInput
                style={[style.input_field]}
                mode="outlined"
                label={<Text style={[style.label]}>Địa chỉ</Text>}
                activeOutlineColor="green"
                onChangeText={setAddress}
                value={address}
                outlineColor="green"
                textColor="white"
            />
            <TextInput
                style={[style.input_field, {
                    height: 150,
                    textAlignVertical: 'top',
                }]}
                mode="outlined"
                numberOfLines={4}
                multiline={true}
                label={<Text style={[style.label]}>Giới thiệu về tôi</Text>}
                activeOutlineColor="green"
                outlineColor="green"
                textColor="white"
                onChangeText={setBio}
                value={bio}
            />
            <TouchableOpacity style={[style.button_action_wrapper]} onPress={() => onUpdateProfile({
                fullName, address, bio, country, gender,
            })}>
                <View style={[style.button_edit]}>
                    <Text style={[style.button_text]}>Cập nhật trang cá nhân</Text>
                    <IconFeather name="edit" color={'black'} size={20}/>
                </View>
            </TouchableOpacity>
        </KeyboardAvoidingView>
        </ScrollView>
    );
};

const NotificationSuccess = ({message} : {message : string}) => {
    return (
        <View style={{flexDirection: 'row',
            gap: 10, alignItems: 'center',
            backgroundColor: 'lightgreen',
            borderRadius: 10, width: 300,
            padding: 10,
            position: 'absolute',
            left: '50%',
            top: '50%',
            zIndex: 999,
            transform: [
                {translateX: '-50%'},
                {translateY: '-50%'},
            ],
        }}
        >
            <IconAntDesign name="checkcircleo" color={'green'} size={30}/>
            <View style={[{gap: 10, flex: 1}]}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Cập nhật thành công</Text>
                <Text style={{color: 'darkgreen'}}>{message}</Text>
            </View>
            <IconAntDesign name="close" color={'green'} size={20} style={{position: 'absolute', right: 5, top: 5}}/>
        </View>
    );
};


const NotificationFailed = ({message} : {message : string}) => {
    return (
        <View style={{flexDirection: 'row',
            gap: 10, alignItems: 'center',
            backgroundColor: 'rgb(255, 56, 56)',
            borderRadius: 10, width: 300,
            padding: 10,
            position: 'absolute',
            left: '50%',
            top: '50%',
            zIndex: 999,
            transform: [
                {translateX: '-50%'},
                {translateY: '-50%'},
            ],
        }}
        >
            <IconAntDesign name="closecircleo" color={'darkred'} size={30}/>
            <View style={[{gap: 10, flex: 1}]}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Cập nhật thất bại</Text>
                <Text style={{color: 'darkred'}}>{message}</Text>
            </View>
            <IconAntDesign name="close" color={'darkred'} size={20} style={{position: 'absolute', right: 5, top: 5}}/>
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
    const userRepository = useMemo(() => new UserRepository(), []);
    const [hasError, setHasError] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [hasSuccess, setHasSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string>('');
    useEffect(() => {
        if (hasError) {
            const timer = setTimeout(() => {
                setHasError(false); // Tự động ẩn thông báo
                setErrorMessage(''); // Xóa message sau khi ẩn
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [hasError]);
    useEffect(() => {
        if (hasSuccess) {
            const timer = setTimeout(() => {
                setHasSuccess(false); // Tự động ẩn thông báo
                setSuccessMessage(''); // Xóa message sau khi ẩn
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [hasSuccess]);
    return (
        <>
            {/* <NotificationFailed/> */}
            <View style={[style.container]}>
                <HeaderNavigation/>
                <AvatarSetting/>
                <AccountFieldsSetting onUpdateProfile={async (request) => {
                    try {
                        const resp = await userRepository.updateProfile(request);
                        setHasSuccess(true);
                        setSuccessMessage(() => 'Cập nhật profile thành công, refresh lại để nhận thấy thay đổi');
                        return resp.result;
                    } catch (error : any) {
                        setErrorMessage(error.message);
                        setHasError(() => true);
                    }
                }}/>
            </View>
            {hasError && <NotificationFailed message={errorMessage} />}
            {hasSuccess && <NotificationSuccess message={successMessage} />}
        </>
    );
};

export default ProfileSettingsScreen;
