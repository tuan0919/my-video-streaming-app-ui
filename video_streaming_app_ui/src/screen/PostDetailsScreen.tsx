import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import FeatherIconIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import post from '../data/post-details.json';
import {Image} from 'react-native';

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

const postData : PostData = post;

function NavigationBar() : React.JSX.Element {
  return (
    <View style={styles.navigationHeader}>
      <TouchableOpacity>
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

function PostContent({data}: {data: PostData}) : React.JSX.Element {
  return (
    <View style={styles.postContent}>
      <View style={styles.postActionList}>
        <AntDesignIcon name={'heart'} style={{fontSize: 25, color: 'white'}} />
        <FeatherIconIcon name={'message-square'} style={{fontSize: 25, color: 'white'}} />
        <FeatherIconIcon name={'share-2'} style={{fontSize: 25, color: 'white'}} />
      </View>
      <View style={{paddingVertical: 20}}>
        <Text style={{color: 'white'}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet atque consequatur cumque enim eos eum eveniet, excepturi, illo ipsam, minus molestiae odio officia perferendis qui sequi unde vel vero voluptas.
        </Text>
        <Text style={{color: 'white'}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet atque consequatur cumque enim eos eum eveniet, excepturi, illo ipsam, minus molestiae odio officia perferendis qui sequi unde vel vero voluptas.
        </Text>
        <Text style={{color: 'white'}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet atque consequatur cumque enim eos eum eveniet, excepturi, illo ipsam, minus molestiae odio officia perferendis qui sequi unde vel vero voluptas.
        </Text>
        <Text style={{color: 'white'}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet atque consequatur cumque enim eos eum eveniet, excepturi, illo ipsam, minus molestiae odio officia perferendis qui sequi unde vel vero voluptas.
        </Text>
        <Text style={{color: 'white'}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet atque consequatur cumque enim eos eum eveniet, excepturi, illo ipsam, minus molestiae odio officia perferendis qui sequi unde vel vero voluptas.
        </Text>
      </View>
    </View>
  );
}

function PostBody({data}: {data: PostData}) : React.JSX.Element {
  return (
    <View style={styles.postBody}>
      <View>
        <Image style={styles.postImage} source={{uri: data.post.thumbnail}} />
      </View>
      <PostContent data={postData}/>
    </View>
  );
}

export default function PostDetailsScreen() : React.JSX.Element {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <NavigationBar/>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <PostHeader data={postData}/>
        <PostBody data={postData}/>
      </ScrollView>
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
  },
  postActionList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  }
})
