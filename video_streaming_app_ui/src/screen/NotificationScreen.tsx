import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Image, ImageStyle, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import notificationJSON from '../data/notification-list.json';

type Notification = {
    username: string,
    avatar: string,
    thumbnail: string
}

const data : Notification[] = notificationJSON;

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
            <Text style={[style.title]}>Thông báo</Text>
            <TouchableOpacity style={[style.icon_wrapper]} onPress={() => navigation.goBack()}>
                <IconMaterialIcons name="keyboard-backspace" style={[style.icon]}/>
            </TouchableOpacity>
        </View>
    );
};

const NotifyRow = ({notify}: {notify: Notification}) : React.JSX.Element => {
    type NotifyRow_Style = {
        wrapper?: ViewStyle,
        avatar_wrapper?: ViewStyle,
        avatar?: ImageStyle,
        notifyText?: TextStyle,
        usernameText?: TextStyle,
        timeText?: TextStyle,
        thumbnail_wrapper?: ViewStyle,
        thumbnail?: ImageStyle,
    }
    const style = useMemo<NotifyRow_Style>(() => ({
        wrapper: {
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
        },
        avatar_wrapper: {
            width: 70,
            height: 70,
            overflow: 'hidden',
            borderRadius: 50,
            borderWidth: 2,
            borderColor: 'white',
        },
        avatar: {
            width: '100%',
            height: '100%',
        },
        usernameText: {
            fontWeight: 'bold',
            fontSize: 13,
            color: 'white',
        },
        notifyText: {
            fontSize: 13,
            color: 'white',
        },
        timeText: {
            color: 'gray',
            fontSize: 13,
        },
        thumbnail_wrapper: {
            width: 70,
            height: 70,
            borderWidth: 1,
            borderRadius: 10,
            overflow: 'hidden',
        },
        thumbnail: {
            width: '100%',
            height: '100%',
        },
    }), []);
    return (
        <TouchableOpacity style={[style.wrapper]}>
            <View style={[style.avatar_wrapper]}>
                <Image source={{uri: notify.avatar}} style={[style.avatar]} />
            </View>
            <View style={{flex: 1}}>
                <Text>
                    <Text style={[style.notifyText]}>Người bạn đang theo dõi, </Text>
                    <Text style={[style.usernameText]}>@{notify.username}</Text>
                    <Text style={[style.notifyText]}> đã thêm một video mới.</Text>
                    <Text style={[style.timeText]}> 7 giờ trước</Text>
                </Text>
            </View>
            <View style={[style.thumbnail_wrapper]}>
                <Image source={{uri: notify.thumbnail}} style={[style.thumbnail]}/>
            </View>
        </TouchableOpacity>
    );
};

const NotificationList = () : React.JSX.Element => {
    const Seperator = useMemo(() => {
        return () => <View style={{ height: 13 }} />;
    }, []);
    return (
        <FlatList
            data={data}
            ItemSeparatorComponent={Seperator}
            renderItem={({item}) => <NotifyRow notify={item} />}
        />
    );
};

const NotificationScreen = () : React.JSX.Element => {
    type NotificationScreen_Style = {
        container?: ViewStyle,
    }
    const style = useMemo<NotificationScreen_Style>(() => ({
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
            <NotificationList/>
        </View>
    );
};

export default NotificationScreen;
