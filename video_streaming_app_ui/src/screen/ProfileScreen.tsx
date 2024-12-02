import {Image, ImageStyle, SafeAreaView, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, { useMemo } from 'react';
import { Text } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';

const profileStyle : ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 10,
  paddingHorizontal: 10,
};
const unreadBadget: ViewStyle = {
  top: -5,
  left: 15,
  backgroundColor: '#ff3f3f',
  position: 'absolute',
  paddingVertical: 2,
  paddingHorizontal: 5,
  borderRadius: 10,
  alignItems: 'center',
  justifyContent: 'center',
};
const usernameText : TextStyle = {
  color: 'white',
  fontWeight: 'bold',
  fontSize: 23,
};
const buttonWrapper : ViewStyle = {
  flexDirection: 'row',
  gap: 15,
};

const ProfileHeader = () : React.JSX.Element => {
  return (
    <View style={[profileStyle]}>
      <Text style={[usernameText]}>nqat0919</Text>
      <View style={[buttonWrapper]}>
        <TouchableOpacity style={{position: 'relative'}}>
          <IconIonicons size={30} color={'white'} name="notifications-outline"/>
          <View style={[unreadBadget]}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white'}}>9+</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'relative'}}>
          <IconEntypo size={30} color={'white'} name="menu"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const infoWrapper : ViewStyle = {
  flexDirection: 'row',
  gap: 20,
  alignItems: 'center',
  justifyContent: 'center',
};
type AvatarProfileStyle = {
  imgBox: ViewStyle,
  img: ImageStyle,
  container: ViewStyle,
  userFullName: TextStyle,
};
const avatarProfileWrapper : AvatarProfileStyle = {
  container: {
    gap: 5,
    alignItems: 'center',
    flexDirection: 'column',
  },
  imgBox: {
    width: 70,
    height: 70,
    overflow: 'hidden',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  img: {
    width: '100%',
    height: '100%',
  },
  userFullName: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
  },
};
type StatOverallStyle = {
  container: ViewStyle,
  topText: TextStyle,
  bottomText: TextStyle,
}
const statOverallStyle : StatOverallStyle = {
  container: {
    flexDirection: 'row',
    gap: 10,
  },
  topText:  {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  bottomText: {
    fontSize: 15,
    color: 'white',
  },
};
const ProfileInfo = () : React.JSX.Element => {
  return (
    <View style={infoWrapper}>
      <View style={[avatarProfileWrapper.container]}>
        <TouchableOpacity style={[avatarProfileWrapper.imgBox]}>
          <Image style={[avatarProfileWrapper.img]}
          source={{uri: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg'}}
          />
        </TouchableOpacity>
        <Text style={[avatarProfileWrapper.userFullName]}>Nguyễn Tuấn</Text>
      </View>
      <View style={[statOverallStyle.container]}>
        <View>
          <Text style={[statOverallStyle.topText]}>0</Text>
          <Text style={[statOverallStyle.bottomText]}>bài viết</Text>
        </View>
        <View>
          <Text style={[statOverallStyle.topText]}>2</Text>
          <Text style={[statOverallStyle.bottomText]}>Người theo dõi</Text>
        </View>
        <View>
          <Text style={[statOverallStyle.topText]}>16</Text>
          <Text style={[statOverallStyle.bottomText]}>Đang theo dõi</Text>
        </View>
      </View>
    </View>
  );
};


type ProfileActions_Style = {
  container: ViewStyle,
  actionButton: ViewStyle,
  actionText: TextStyle,
}
const ProfileActions = () : React.JSX.Element => {
  const style = useMemo<ProfileActions_Style>(() => ({
    container: {
      flexDirection: 'row',
      gap: 5,
    },
    actionButton: {
      backgroundColor: '#333333',
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 5,
    },
    actionText: {
      color: 'white',
      fontWeight: 'bold',
    },
  }), []);
  return (
    <View style={[style.container]}>
      <TouchableOpacity style={style.actionButton}>
        <Text style={style.actionText}>Chỉnh sửa trang cá nhân</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.actionButton}>
        <IconIonicons name="person-add-sharp" color={'white'} size={15}/>
      </TouchableOpacity>
    </View>
  );
};

export default function ProfileScreen():React.ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader/>
      <ProfileInfo/>
      <ProfileActions/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  storyContainer: {
    overflow: 'hidden',
    borderBottomColor: '#292929',
    borderWidth: 1,
    paddingVertical: 5,
    marginHorizontal: 12,
  },
});
