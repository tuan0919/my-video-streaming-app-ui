import React, { useCallback, useMemo, useRef, useState } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import post from '../data/post-details.json';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CommentBottomSheet} from '../component';
import commentsData from '../data/comments.json';
import { CommentSheet } from '../component/comment/CommentBottomSheet';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

interface PostData {
  owner: {
    isFollowed: string;
    username: string;
    avatar: string;
  };
  post: {
    thumbnail: string;
    likes: number;
    comments: number;
    time: string;
    description: string;
  };
}

interface UserProfile {
  username: string;
  avatar: string;
}

interface Comment {
  profile: UserProfile;
  content: string;
  time: string;
  reply?: Comment[]
}

const postData : PostData = post;
const comments : Comment[] = commentsData;

function NavigationBar({data, style}: {data: PostData, style : ViewStyle}) : React.JSX.Element {
  const navigation = useNavigation<any>();
  return (
    <View style={[styles.navigationHeader, style]}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIconsIcon name={'navigate-before'} style={styles.headerIcon} />
      </TouchableOpacity>
      <Text style={styles.headerPostText}>Bài viết của {data.owner.username}</Text>
    </View>
  );
}

interface PostHeaderProps {
  data: PostData,
  onExpanded: () => void,
  onClosed: () => void,
  style: ViewStyle,
}

function PostHeader({data, onExpanded, onClosed, style}: PostHeaderProps) : React.JSX.Element {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const postHeader = useMemo(()=> {
    return (
      <View style={[styles.postHeader]}>
        <View style={{borderRadius: 50, borderColor: 'white', borderWidth: 2}}>
          <View style={styles.headerImageContainer}>
            <Image style={styles.headerImage} source={{uri: data.owner.avatar}} />
          </View>
        </View>
        <View style={styles.headerInfoContainer}>
          <Text style={styles.headerUsername}>{data.owner.username}</Text>
          <Text style={{color: 'white'}}>{data.post.time}</Text>
        </View>
        <TouchableOpacity style={{borderRadius: 10,
            paddingHorizontal: 6,
            paddingVertical: 3,
            borderWidth: 1,
            borderColor: 'white',
            marginLeft: 20,
          }}>
            <Text style={styles.followText}>{data.owner.isFollowed ? 'Bỏ theo dõi' : 'Theo dõi'}</Text>
        </TouchableOpacity>
      </View>
    );
  }, [data]);
  const heightAnimation = useSharedValue(20);
  const animatedStyle = useAnimatedStyle(() => ({
    maxHeight: heightAnimation.value,
  }));

  const toggleExpand = useCallback(() => {
    heightAnimation.value = withTiming(isExpanded ? 20 : 150, { duration: 300 });
    setIsExpanded(() => !isExpanded);
    !isExpanded ? onExpanded() : onClosed();
  }, [heightAnimation, isExpanded, onClosed, onExpanded]);

  const viewWrapper : ViewStyle = {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: 10,
    gap: 10,
  };
  return (
    <View style={[viewWrapper, style]}>
      {postHeader}
      <Animated.ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={true}
          style={[animatedStyle]}
          contentContainerStyle={{width: '95%'}}
          showsVerticalScrollIndicator={false}
          >
           <TouchableWithoutFeedback onPress={toggleExpand}>
              <Text style={{color: 'white'}}>
                {data.post.description}
                {'\n'}
                {data.post.description}
                {'\n'}
                {data.post.description}
                {'\n'}
                {data.post.description}
                {'\n'}
                {data.post.description}
                {'\n'}
                {data.post.description}
              </Text>
            </TouchableWithoutFeedback>
          </Animated.ScrollView>
    </View>
  );
}


interface PostContentProps {
  data: PostData,
  style: ViewStyle;
  onLoadComment: () => void
}
function PostContent({data, onLoadComment, style}: PostContentProps) : React.JSX.Element {
  const textStyle : TextStyle = {
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 0,
    margin: 0,
  };
  const iconWrap : ViewStyle = {
    justifyContent: 'center',
    alignContent: 'center',
    gap: 3,
  };
  const iconStyle : TextStyle = {
    fontSize: 25,
    color: 'white',
  };
  return (
    <View style={[styles.postContent, style]}>
      <View style={styles.postActionList}>
        <TouchableOpacity style={[iconWrap]}>
          <AntDesignIcon name={'hearto'} style={iconStyle} />
          <Text style={[textStyle]}>{data.post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[iconWrap]} onPress={onLoadComment}>
          <FontistoIcon name={'comment'} style={[iconStyle, {transform: [{ scaleX: -1 }]}]} />
          <Text style={[textStyle]}>{data.post.comments}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[iconWrap]}>
          <IoniconsIcon name="bookmark-outline" style={[iconStyle, {fontSize: 30}]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function PostDetailsScreen() : React.JSX.Element {
  const commentSheetRef = useRef<CommentSheet>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  return (
    <SafeAreaView style={{height: '100%'}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        bounces={false}
        >
          <View style={styles.postBody}>
              <View style={{
                position: 'absolute',
                zIndex: 1,
                width: '100%',
                height: '100%',
                backgroundColor: isFocus ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,0)',
                pointerEvents: 'none',
              }}/>
              <Image style={styles.postImage} source={{uri: postData.post.thumbnail}} />
              <NavigationBar data={postData} style={{zIndex: 2}}/>
              <PostHeader data={postData}
                onClosed={() => {
                  console.log('closed');
                  setIsFocus(false);
                }}
                onExpanded={() => {
                  console.log('open');
                  setIsFocus(true);
                }}
                style={{zIndex: 2}}
              />
              <PostContent data={postData} style={{zIndex: 2}} onLoadComment={() => commentSheetRef.current?.open()}/>
          </View>
        </ScrollView>
        <CommentBottomSheet comments={comments} ref={commentSheetRef}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navigationHeader: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  headerIcon: {
    color: 'white',
    fontSize: 35,
    marginLeft: 10,
  },
  headerPostText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    left: '50%',
    textAlign: 'center',
    transform: [{translateX: '-50%'}],
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerImageContainer: {
    width: 50,
    height: 50,
    borderWidth: 4,
    borderColor: 'transparent',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 25,
    overflow: 'hidden',
  },
  headerInfoContainer: {

  },
  headerUsername: {
    fontWeight: 'bold',
    color: 'white',
  },
  followText: {
    color: 'white',
    fontWeight: 'bold',
  },
  postBody: {
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  postContent: {
    display: 'flex',
    padding: 12,
    gap: 30,
    position: 'absolute',
    bottom: '15%',
    right: 0,
  },
  postActionList: {
    alignItems: 'center',
    gap: 20,
  },
});
