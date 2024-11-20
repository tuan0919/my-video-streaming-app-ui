import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIconIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import post from '../data/post-details.json';
import {Image} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {CommentBottomSheet} from '../component';
import commentsData from '../data/comments.json';
import { CommentSheet } from '../component/comment/CommentBottomSheet';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';

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

function NavigationBar() : React.JSX.Element {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.navigationHeader}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIconsIcon name={'navigate-before'} style={styles.headerIcon} />
      </TouchableOpacity>
      <Text style={styles.headerPostText}>Bài viết</Text>
    </View>
  );
}

function PostHeader({data}: {data: PostData}) : React.JSX.Element {
  const [isDescExpanded, setIsDescExpanded] = useState<boolean>(true);
  const [layoutHeight, setLayoutHeight] = useState(0);
  const animation = useSharedValue(0);
  const bodyStyle = useAnimatedStyle(() => {
    return {
      height: animation.value > 0 ? withSpring(animation.value) : withTiming(0),
    };
  }, []);

  const postHeader = useMemo(()=> {
    return (
      <View style={styles.postHeader}>
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

  return (
    <View style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      padding: 10,
      gap: 10}}>
      {postHeader}
      <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps={true}
          style={{maxHeight: 150}}
          >
           <Animated.View style={[bodyStyle]}>
            <TouchableWithoutFeedback>
                <View onLayout={(event : any) => {
                  animation.value = event.nativeEvent.layout.height;
                  console.log('height: ', event.nativeEvent.layout.height);
                  }}>
                  <Text style={{color: 'white'}}
                  >
                  {data.post.description}
                  {data.post.description}
                  {data.post.description}
                  {data.post.description}
                  {data.post.description}
                  {data.post.description}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </Animated.View>
          </ScrollView>
    </View>
  );
}

function PostContent({data, onLoadComment}: {data: PostData, onLoadComment: () => void}) : React.JSX.Element {
  return (
    <View style={styles.postContent}>
      <View style={styles.postActionList}>
        <TouchableOpacity>
          <AntDesignIcon name={'heart'} style={{fontSize: 25, color: 'white'}} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onLoadComment}>
          <FeatherIconIcon name={'message-square'} style={{fontSize: 25, color: 'white'}} />
        </TouchableOpacity>
        <TouchableOpacity>
          <FeatherIconIcon name={'share-2'} style={{fontSize: 25, color: 'white'}} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginLeft: 'auto'}}>
          <FeatherIcon name="bookmark" style={{fontSize: 30, color: 'white'}} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>
          {data.post.likes} likes
        </Text>
        <TouchableOpacity onPress={onLoadComment}>
          <Text style={{color: '#7cc0ff', fontSize: 17}}>
            See all {data.post.comments} comments
          </Text>
        </TouchableOpacity>
        <Text style={{color: 'gray', fontSize: 17}}>
          {data.post.time}
        </Text>
      </View>
    </View>
  );
}

export default function PostDetailsScreen() : React.JSX.Element {
  const commentSheetRef = useRef<CommentSheet>(null);
  return (
    <SafeAreaView style={{height: '100%'}}>
      <NavigationBar/>
        <ScrollView contentContainerStyle={{flexGrow: 1}} nestedScrollEnabled={true}>
          <View style={styles.postBody}>
            <View>
              <Image style={styles.postImage} source={{uri: postData.post.thumbnail}} />
              <PostHeader data={postData}/>
            </View>
            <PostContent data={postData} onLoadComment={() => commentSheetRef.current?.open()}/>
          </View>
        </ScrollView>
        <CommentBottomSheet comments={comments} ref={commentSheetRef}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  navigationHeader: {
    paddingVertical: 10,
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'relative',
    borderBottomColor: 'white',
    borderWidth: 0.5,
  },
  headerIcon: {
    color: 'white',
    fontSize: 35,
  },
  headerPostText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    position: 'absolute',
    left: '50%',
    transform: [{ translateX: '-30%' }],
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

  },
  postImage: {
    width: '100%',
    height: 800,
    resizeMode: 'cover',
  },
  postContent: {
    backgroundColor: 'black',
    display: 'flex',
    padding: 12,
    gap: 30,
  },
  postActionList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
});
