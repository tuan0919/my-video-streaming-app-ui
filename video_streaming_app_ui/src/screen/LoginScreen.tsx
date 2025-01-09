import React, { useCallback, useMemo, useState } from "react"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { HelperText, TextInput } from "react-native-paper";
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const NotificationFailed = () => {
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
                <Text style={{fontWeight: 'bold', color: 'white'}}>Đăng nhập thất bại</Text>
                <Text style={{color: 'darkred'}}>Mật khẩu không đúng, vui lòng kiểm tra lại.</Text>
            </View>
            <IconAntDesign name="close" color={'darkred'} size={20} style={{position: 'absolute', right: 5, top: 5}}/>
        </View>
    );
};

const LoginScreen = () => {
    type LoginScreen_Style = {
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
    const style = useMemo<LoginScreen_Style>(() => ({
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
    const [username, setUsername] = useState<string>('');
    const validateUsername = useCallback(() => !!username.match('@'), [username]);
    const [password, setPassword] = useState<string | undefined>(undefined);
    const validatePassword = useCallback(() => password !== undefined && password.length <= 0, [password]);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
<View style={[{
            backgroundColor: 'black',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
        }]}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>Vui lòng đăng nhập!</Text>
            <Text style={{fontSize: 15, color: 'lightgray', textAlign: 'center', maxWidth: '80%'}}>Phương thức đăng nhập bằng tài khoản, mật khẩu chỉ có tác dụng khi bạn đã tạo tài khoản trong hệ thống.</Text>
            <Text style={{fontSize: 15, color: 'white', textAlign: 'center', maxWidth: '80%'}}>Đăng ký nếu bạn chưa có tài khoản.</Text>
            <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
                <TextInput
                    style={[style.input_field]}
                    mode="outlined"
                    label={<Text style={[style.label]}>Tên đăng nhập</Text>}
                    activeOutlineColor="green"
                    value={username}
                    onChangeText={setUsername}
                    outlineColor="green"
                    textColor="white"
                />
                <HelperText type="error" visible={validateUsername()}>
                    Tên đăng nhập không được chứa các kí tự đặc biệt
                </HelperText>
            </View>
            <View style={{alignItems: 'center', width: '100%'}}>
                <TextInput
                    style={[style.input_field]}
                    mode="outlined"
                    label={<Text style={[style.label]}>Mật khẩu</Text>}
                    activeOutlineColor="green"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    outlineColor="green"
                    textColor="white"
                    right={
                        <TextInput.Icon
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showPassword)}
                        />
                    }
                />
                <HelperText type="error" visible={validatePassword()} style={{display: validatePassword() ? 'flex' : 'none'}}>
                    Mật khẩu không được để trống
                </HelperText>
            </View>
            <View style={{width: '80%'}}>
                <Text style={{fontWeight: 'semibold', color: 'white', textAlign: 'right'}}>Quên mật khẩu</Text>
            </View>
            <View style={{width: '80%', backgroundColor: 'rgb(11, 132, 0)', borderWidth: 2,
            borderColor: 'green', paddingVertical: 15, borderRadius: 10}}>
                <Text style={{fontWeight: 'bold', color: 'white', textAlign: 'center'}}>Đăng nhập</Text>
            </View>
        </View>
        <NotificationFailed/>
        </>
    )
}

export default LoginScreen;