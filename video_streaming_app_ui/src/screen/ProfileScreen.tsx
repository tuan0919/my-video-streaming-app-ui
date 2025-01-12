import {FlatList, Image, ImageStyle, SafeAreaView, ScrollView, StyleSheet, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Text } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import posted_posts from '../data/user-profile-posted.json';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { ExploreFriends } from '../component';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { ClientView_UserPageDetailsDTO, UserRepository, VideoDetails, VideoRepository } from '../repository';

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

const ProfileHeader = ({details} : {details : ClientView_UserPageDetailsDTO}) : React.JSX.Element => {
  const navigation = useNavigation<any>();
  return (
    <View style={[profileStyle]}>
      <Text style={[usernameText]}>{details.user.username}</Text>
      <View style={[buttonWrapper]}>
        <TouchableOpacity style={{position: 'relative'}} onPress={() => navigation.navigate('Notification Stack Screen')}>
          <IconIonicons size={30} color={'white'} name="notifications-outline"/>
          <View style={[unreadBadget]}>
            <Text style={{ fontSize: 12, fontWeight: 'bold', color: 'white'}}>4</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'relative'}} onPress={() => navigation.navigate('SettingNavigator')}>
          <IconEntypo size={30} color={'white'} name="menu"/>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfileInfo = ({details} : {details: ClientView_UserPageDetailsDTO}) : React.JSX.Element => {
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
      color: 'white',
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
            source={{uri: details.user.avatar}}
            />
          </TouchableOpacity>
        </View>
        <View style={[statOverallStyle.container]}>
          <View>
            <Text style={[statOverallStyle.topText]}>{details.stats.videoCounts}</Text>
            <Text style={[statOverallStyle.bottomText]}>Bài viết</Text>
          </View>
          <View>
            <Text style={[statOverallStyle.topText]}>{details.stats.followersCounts}</Text>
            <Text style={[statOverallStyle.bottomText]}>Người theo dõi</Text>
          </View>
          <View>
            <Text style={[statOverallStyle.topText]}>{details.stats.followingCounts}</Text>
            <Text style={[statOverallStyle.bottomText]}>Đang theo dõi</Text>
          </View>
        </View>
      </View>
      <View style={[descriptionStyle.wrapper]}>
        <Text style={[avatarProfileStyle.userFullName]}>{details.user.fullName}</Text>
        <Text style={[descriptionStyle.descriptionText]}>- Giới tính: {details.user.gender ? 'Nam' : 'Nữ'}</Text>
        <Text style={[descriptionStyle.descriptionText]}>- Quốc gia: {details.user.country || 'Chưa thiết lập'}</Text>
        <Text style={[descriptionStyle.descriptionText]}>- Sống tại: {details.user.address || 'Chưa thiết lập'}</Text>
        <Text style={[descriptionStyle.descriptionText, {fontWeight: 'bold'}]}>Mô tả:</Text>
        <Text style={[descriptionStyle.descriptionText]}>{details.user.bio || 'Chưa thiết lập'}</Text>
      </View>
    </View>
  );
};


const ProfileActions = ({onPressEditProfile} : {onPressEditProfile: () => void}) : React.JSX.Element => {
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
      <TouchableOpacity style={actionButton} onPress={onPressEditProfile}>
        <Text style={actionText}>Chỉnh sửa trang cá nhân</Text>
      </TouchableOpacity>
      <TouchableOpacity style={actionButton}>
        <IconIonicons name="person-add-sharp" color={'white'} size={15}/>
      </TouchableOpacity>
    </View>
  );
};


const PostCard = ({post} : {post : VideoDetails}) : React.JSX.Element => {
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
        <Image source={{uri: post.stat.thumbnail}} style={[style.post_img]}/>
      </View>
      <View style={[style.info_wrapper]}>
        <View style={[style.info_stat]}>
          <IconFontAwesome name="eye" style={[style.icon]}/>
          <Text style={[style.text]}>{post.stat.viewCount}</Text>
        </View>
        <View style={[style.info_stat]}>
          <IconFontAwesome name="comment-o" style={[style.icon]}/>
          <Text style={[style.text]}>{post.stat.commentCount}</Text>
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
      paddingTop: 20,
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
  const videoRepository = useMemo(() => new VideoRepository(), []);
  const [posted, setPosted] = useState<VideoDetails[]>();
  const USER_ID = '91301499-9a07-4d92-a993-0e55456af54c';
  const fetchVideoPostedByUser = useCallback(async () => {
    const response = await videoRepository.getVideoPostedBy({userId: USER_ID, page: 0, pageSize: 4});
    setPosted(() => response.result);
  }, [videoRepository]);
  useEffect(() => {
    fetchVideoPostedByUser();
  });
  return (
    <View style={[style.container]}>
      <Text style={[style.title_text]}>Video đã đăng</Text>
      <FlatList horizontal={true} data={posted} renderItem={({item : post}) => {
        return <PostCard post={post}/>;
      }}/>
    </View>
  );
};

export default function ProfileScreen() : React.ReactElement {
  const navigation = useNavigation<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userRepository = useMemo(() => new UserRepository(), []);
  const [pageDetails, setPageDetails] = useState<ClientView_UserPageDetailsDTO | undefined>(undefined);
  const USER_ID = '91301499-9a07-4d92-a993-0e55456af54c';
  useEffect(() => {
    setIsLoading(() => true);
    userRepository.getUserPage(USER_ID).then(response => {
      console.log('result: ', response.result);
      setPageDetails(() => response.result);
      setIsLoading(() => false);
    });
  }, [userRepository]);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView nestedScrollEnabled contentContainerStyle={{flexGrow: 1}}>
        {isLoading &&
        <View style={{
          backgroundColor: 'black',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}>
          <View style={{flexDirection: 'row', width: '100%', gap: 10, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={20} animating={true} color={MD2Colors.green700} />
            <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Bạn đợi tí ...</Text>
          </View>
        </View>
        }
        {
          !isLoading && pageDetails &&
          <>
            <ProfileHeader details={pageDetails}/>
            <ProfileInfo details={pageDetails}/>
            <ProfileActions onPressEditProfile={() => navigation.navigate('Profile Settings Stack Screen', {
              profileInfo: {
                avatarLink: pageDetails.user.avatar,
                fullName: pageDetails.user.fullName,
                gender: pageDetails.user.gender,
                country: pageDetails.user.country,
                address: pageDetails.user.address,
                bio: pageDetails.user.bio,
              },
            })}/>
            <ExploreFriends/>
            <ProfilePostedPost/>
          </>
        }
      </ScrollView>
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
