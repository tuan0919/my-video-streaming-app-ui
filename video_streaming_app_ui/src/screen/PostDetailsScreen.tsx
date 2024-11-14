import React, { useRef } from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
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
  return (
    <View style={styles.postHeader}>
      <View style={styles.headerImageContainer}>
        <Image style={styles.headerImage} source={{uri: data.owner.avatar}} />
      </View>
      <View style={styles.headerInfoContainer}>
        <Text style={styles.headerUsername}>{data.owner.username}</Text>
        <TouchableOpacity>
          {data.owner.isFollowed ?
            <Text style={styles.followText}>Bỏ theo dõi</Text> :
            <Text style={styles.followText}>Theo dõi</Text>
          }
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{marginLeft: 'auto'}}>
        <FeatherIconIcon name={'more-horizontal'} size={25} color={'white'} />
      </TouchableOpacity>
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
        <Text style={{color: 'white', fontWeight: 'semibold', fontSize: 20}}>
          {data.post.description}
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
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          <PostHeader data={postData}/>
          <View style={styles.postBody}>
            <View>
              <Image style={styles.postImage} source={{uri: postData.post.thumbnail}} />
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
    backgroundColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    padding: 10,
    position: 'relative',
  },
  headerImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerInfoContainer: {

  },
  headerUsername: {
    fontWeight: 'bold',
    color: 'white',
  },
  followText: {
    color: '#0081ff',
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
