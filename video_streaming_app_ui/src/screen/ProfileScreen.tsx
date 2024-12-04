import {FlatList, Image, ImageStyle, SafeAreaView, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { Text } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import posted_posts from '../data/user-profile-posted.json';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';

type Post = {
  image: string,
  likes: number,
  view: number,
  comments: number,
  description: string,
}
const data : Post[] = posted_posts.posts;

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

const ProfileBody = ({children, style} : {children: React.ReactNode, style?: ViewStyle}) : React.JSX.Element => {
  return (
    <View style={[style]}>
      {children}
    </View>
  );
};

const ProfileInfo = () : React.JSX.Element => {
  type AvatarProfileStyle = {
    imgBox: ViewStyle,
    img: ImageStyle,
    container: ViewStyle,
    userFullName: TextStyle,
  };
  type StatOverallStyle = {
    container: ViewStyle,
    topText: TextStyle,
    bottomText: TextStyle,
  }
  type ProfileDescriptionStyle = {
    wrapper: ViewStyle,
    descriptionText: TextStyle
  }

  const avatarProfileStyle = useMemo<AvatarProfileStyle>(() => ({
    container: {
      gap: 5,
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
  }), []);

  const statOverallStyle = useMemo<StatOverallStyle>(() => ({
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
  }), []);

  const headerInfoStyle = useMemo<ViewStyle>(() => ({
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'flex-start',
  }), []);

  const descriptionStyle = useMemo<ProfileDescriptionStyle>(() => ({
    descriptionText: {
      color: 'white'
    },
    wrapper: {
      maxWidth: '80%',
    },
  }), []);

  return (
    <View>
      <View style={headerInfoStyle}>
        <View style={[avatarProfileStyle.container]}>
          <TouchableOpacity style={[avatarProfileStyle.imgBox]}>
            <Image style={[avatarProfileStyle.img]}
            source={{uri: 'https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_3x4.jpg'}}
            />
          </TouchableOpacity>
          <Text style={[avatarProfileStyle.userFullName]}>Nguyễn Tuấn</Text>
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
      <View style={[descriptionStyle.wrapper]}>
        <Text style={[descriptionStyle.descriptionText]}>Tôi là sinh viên trường đại học Nông Lâm Thành Phố Hồ Chí Minh 🐧</Text>
      </View>
    </View>
  );
};


const ProfileActions = () : React.JSX.Element => {
  type ProfileActions_Style = {
    container: ViewStyle,
    actionButton: ViewStyle,
    actionText: TextStyle,
  }

  const {container, actionButton, actionText} = useMemo<ProfileActions_Style>(() => ({
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
    <View style={[container]}>
      <TouchableOpacity style={actionButton}>
        <Text style={actionText}>Chỉnh sửa trang cá nhân</Text>
      </TouchableOpacity>
      <TouchableOpacity style={actionButton}>
        <IconIonicons name="person-add-sharp" color={'white'} size={15}/>
      </TouchableOpacity>
    </View>
  );
};

const ProfilePostArchived = () : React.JSX.Element => {
  return (
    <View>

    </View>
  )
}


const PostCard = ({post} : {post : Post}) : React.JSX.Element => {
  type PostCardStyle = {
    container: ViewStyle,
    img_wrapper: ViewStyle,
    post_img: ImageStyle,
    icon: TextStyle,
    text: TextStyle,
    info_wrapper: ViewStyle,
    info_stat: ViewStyle,
  }
  const style = useMemo<PostCardStyle>(() => ({
    container: {
      position: 'relative',
      borderWidth: 2,
      borderColor: '#333333',
      width: 130,
      height: 200,
    },
    img_wrapper: {

    },
    post_img: {
      width: '100%',
      resizeMode: 'cover',
      height: '100%',
    },
    info_wrapper: {
      backgroundColor: 'rgba(0,0,0,.8)',
      position: 'absolute',
      left: 0,
      bottom: 0,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      width: '100%',
      gap: 15,
    },
    info_stat: {
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
    },
    icon: {
      fontSize: 13,
      color: 'white',
    },
    text: {
      fontSize: 10,
      fontWeight: 'bold',
      color: 'white',
    },
  }), []);
  return (
    <TouchableOpacity style={[style.container]}>
      <View style={[style.img_wrapper]}>
        <Image source={{uri: post.image}} style={[style.post_img]}/>
      </View>
      <View style={[style.info_wrapper]}>
        <View style={[style.info_stat]}>
          <IconFontAwesome name="eye" style={[style.icon]}/>
          <Text style={[style.text]}>{post.view}</Text>
        </View>
        <View style={[style.info_stat]}>
          <IconFontAwesome name="comment-o" style={[style.icon]}/>
          <Text style={[style.text]}>{post.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ProfilePostedPost = () : React.JSX.Element => {
  type ProfilePostedPostStyle = {
    container: ViewStyle,
    title_wrapper: ViewStyle,
    title_text: TextStyle,
    title_icon: TextStyle,
  }
  const style = useMemo<ProfilePostedPostStyle>(() => ({
    container: {

    },
    title_wrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    title_text: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
    title_icon: {
      color: 'white',
      fontSize: 20,
    },
  }), []);
  return (
    <View style={[style.container]}>
      <View style={[style.title_wrapper]}>
        <IconEntypo name="folder-video" style={[style.title_icon]}/>
        <Text style={[style.title_text]}>Bài viết đã đăng tải</Text>
      </View>
      <FlatList data={data} renderItem={({item : post}) => {
        return <PostCard post={post}/>;
      }}/>
    </View>
  );
};

export default function ProfileScreen():React.ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <ProfileHeader/>
      <ProfileInfo/>
      <ProfileActions/>
      <ProfileBody>
        <ProfilePostArchived/>
        <ProfilePostedPost/>
      </ProfileBody>
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
