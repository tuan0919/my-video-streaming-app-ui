import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import post_data from '../../data/user-posts.json';
import user from '../../data/logged-in-user.json';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

interface PostData {
  owner: {
    username: string;
    avatar: string;
    isFollowed: boolean;
  };
  post: {
    description: string;
    image: string;
    likes: number;
    comments: number;
    isLiked: boolean;
  };
  time: string;
}

interface User {
  username: string;
  avatar: string;
}

const posts: PostData[] = post_data;
const currentUser : User = user;

function SmallUserProfile({data} : {data: PostData}) {
  const [isFollowed, setIsFollowed] = useState<boolean>(data.owner.isFollowed);
  return (
    <View style={styles.profileWrapper}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatar} source={{uri: data.owner.avatar}}/>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.profileInfoText}>{data.owner.username}</Text>
        <Text style={styles.profileInfoDateTime}>{data.time}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.followButton,
          isFollowed ? {borderColor: 'green'} : {},
        ]}
        onPress={() => setIsFollowed(!isFollowed)}>
        <Text style={[
          styles.followText,
          isFollowed ? {color: 'green', fontWeight: 'bold'} : {},
        ]}>{isFollowed ? 'Followed' : 'Follow'}</Text>
      </TouchableOpacity>
    </View>
  );
}

function CommentSection({currentUser : curUser} : {currentUser: User}) : React.JSX.Element {
  return (
    <View style={styles.commentSectionWrapper}>
      <View style={styles.commentSectionAvatarWrapper}>
        <Image style={styles.commentSectionAvatar} source={{uri: curUser.avatar}}/>
      </View>
      <TextInput style={styles.commentSectionTextInput}
                 placeholder={'Add a comment...'}
                 placeholderTextColor={'gray'}
                 cursorColor={'green'}
                 numberOfLines={1}
                 selectionColor={'green'}
      />
    </View>
  );
}

function PostBody({data} : {data: PostData}) : React.JSX.Element {
  const [isLiked, setIsLiked] = useState<boolean>(data.post.isLiked);
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false);
  return (
    <View style={styles.postBody}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
          {isLiked ? (
            <AntDesignIcon name="heart" style={styles.icon} color="green" />
          ) : (
            <AntDesignIcon name="hearto" style={styles.icon} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome name="comment-o" style={styles.icon} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsBookMarked(!isBookMarked)}
          style={{marginLeft: 'auto'}}>
          <FeatherIcon name="bookmark" style={{fontSize: 35}} color={isBookMarked ? 'green' : 'white'} />
        </TouchableOpacity>
      </View>
      <Text style={styles.likesCount}>{data.post.likes} likes</Text>
      <View style={{flexDirection: 'row'}}>
        <Text style={styles.postDescription}>{data.post.description}</Text>
      </View>
      <CommentSection currentUser={currentUser} />
    </View>
  );
}

function Post({data} : {data: PostData}) : React.JSX.Element {
  const navigation = useNavigation<any>();
  return (
    <View style={styles.postContainer}>
      <TouchableOpacity onPress={() => {
        navigation.navigate('Post Details');
      }}>
        <Image style={styles.postImage} resizeMode={'cover'} source={{uri: data.post.image}}/>
      </TouchableOpacity>
      <PostBody data={data}/>
      <SmallUserProfile data={data}/>

    </View>
  );
}

function NewFeed() : React.JSX.Element {
  const [data, setData] = useState<PostData[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchPost = useCallback(async (currentPage: number) => {
    setHasMore(() => currentPage < posts.length);
    setLoading(() => true);
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await wait(2000);
    setData(currentData => [...currentData, posts[currentPage]]);
    setLoading(() => false);
    // console.log(`loaded post ${posts[currentPage].owner.username}, index: ${currentPage}`);
  }, []);

  useEffect(() => {
    fetchPost(page);
  }, [page, fetchPost]);

  const handleLoadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage(prevPage => prevPage + 1); // Tăng số trang
    }
  }, [loading, hasMore]);


  const LoadingFooter = useMemo(() => {
    return (
      <View style={{height: 170, backgroundColor: 'black', alignItems: 'flex-start', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', width: '100%', gap: 10, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating={true} color={MD2Colors.green700} />
          <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Bạn đợi tí ...</Text>
        </View>
      </View>
    );
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => `${item.owner.username}`}
        renderItem={({item}) => <Post data={item}/>}
        onEndReached={handleLoadMore}
        ListFooterComponent={LoadingFooter}
        onEndReachedThreshold={1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 200,
  },
  postContainer: {
    borderColor: '#393939',
    borderWidth: 1,
    marginBottom: 20,
    position: 'relative',
    borderRadius: 15,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: 500,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 20,
    flex: 1,
    justifyContent: 'flex-start',
  },
  icon: {
    fontSize: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    gap: 10,
    position: 'absolute',
    display: 'flex',
    top: 10,
    left: 10,
  },
  avatarWrapper: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 3,
    borderRadius: 50,
    overflow: 'hidden',
    width: 50,
    height: 50,
  },
  avatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
  },
  profileInfo: {

  },
  profileInfoText: {
    color: 'white',
    fontWeight: 'bold',
  },
  profileInfoDateTime: {
    color: 'lightgray',
    fontWeight: 'semibold',
  },
  postBody: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 10,
  },
  likesCount: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 18,
  },
  postDescription: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'semibold',
  },
  commentSectionWrapper: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  commentSectionTextInput: {
    color: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#232323',
    width: 200,
    maxWidth: 200,
    paddingHorizontal: 10,
  },
  commentSectionAvatarWrapper: {
    borderWidth: 1,
    borderColor: '#232323',
    borderRadius: 50,
    overflow: 'hidden',
    width: 40,
    height: 40,
  },
  commentSectionAvatar: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 50,
  },
  followButton: {
    borderWidth: 1,
    borderColor: 'white',
    width: 80,
    height: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 'auto',
    position: 'relative',
  },
  followText: {
    position: 'absolute',
    color: 'white',
    fontWeight: 'semibold',
    top: '50%',
    left: '50%',
    transform: [
      { translateX: '-50%' },
      { translateY: '-50%' },
    ],
  },
});

export default NewFeed;
