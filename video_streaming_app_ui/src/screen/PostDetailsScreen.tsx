import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {Dimensions, StatusBar, StyleSheet, Text, TextStyle, TouchableOpacity, TouchableWithoutFeedback, View, ViewStyle} from 'react-native';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import post from '../data/post-details.json';
import {Image} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import commentsData from '../data/comments.json';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { VideoDetails, VideoRepository } from '../repository';

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
    video: string,
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

const postData : PostData[] = post;
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
    <View style={[viewWrapper, style]}
    >
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
  data: VideoDetails,
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
          <Text style={[textStyle]}>{data.stat.upVote}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[iconWrap]} onPress={onLoadComment}>
          <FontistoIcon name={'comment'} style={[iconStyle, {transform: [{ scaleX: -1 }]}]} />
          <Text style={[textStyle]}>69</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[iconWrap]}>
          <IoniconsIcon name="bookmark-outline" style={[iconStyle, {fontSize: 30}]} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

// function PostDetails({postData : data, play, onLoadComment} : {postData: PostData, play: boolean, onLoadComment : () => void}) {
//   const screenHeight = Dimensions.get('window').height - (StatusBar.currentHeight || 0);
//   const [isFocus, setIsFocus] = useState<boolean>(false);
//   return (
//     <View style={{height: screenHeight}}>
//       <View style={[styles.postBody]}>
//           <View
//             style={{
//               position: 'absolute',
//               zIndex: 1,
//               width: '100%',
//               height: '100%',
//               backgroundColor: isFocus ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,0)',
//               pointerEvents: 'none',
//             }}
//           />
//           {!play ? <Image
//             source={{
//               uri: data.post.thumbnail,
//             }}
//             style={{
//               width: '100%',
//               height: undefined,
//               flex: 1,
//             }}
//             resizeMode="cover"
//           /> : <Video source={{uri: data.post.video}}
//           resizeMode="cover"
//           repeat
//           style={{
//             width: '100%',
//             flex: 1,
//           }}
//           />}
//           <NavigationBar data={data} style={{ zIndex: 2 }} />
//           <PostHeader
//             data={data}
//             onClosed={() => {
//               console.log('closed');
//               setIsFocus(false);
//             }}
//             onExpanded={() => {
//               console.log('open');
//               setIsFocus(true);
//             }}
//             style={{ zIndex: 2 }}
//           />
//           <PostContent
//             data={data}
//             style={{ zIndex: 2 }}
//             onLoadComment={onLoadComment}
//           />
//       </View>
//     </View>
//   );
// }

const PostDetails = React.memo(({ postData : data, play, onLoadComment }: { postData: VideoDetails; play: boolean; onLoadComment: () => void }) => {
  const screenHeight = Dimensions.get('window').height - (StatusBar.currentHeight || 0);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const renderMedia = useCallback(() => {
    if (play) {
      return (
        <Video
          source={{ uri: data.stat.link }}
          resizeMode="cover"
          repeat
          style={{ width: '100%', flex: 1 }}
        />
      );
    }
    return (
      <Image
        source={{ uri: data.stat.thumbnail }}
        style={{ width: '100%', flex: 1 }}
        resizeMode="cover"
      />
    );
  }, [play, data.stat.link, data.stat.thumbnail]);
  return (
    <View style={{height: screenHeight}}>
      <View style={[styles.postBody]}>
          <View
            style={{
              position: 'absolute',
              zIndex: 1,
              width: '100%',
              height: '100%',
              backgroundColor: isFocus ? 'rgba(0,0,0,.2)' : 'rgba(0,0,0,0)',
              pointerEvents: 'none',
            }}
          />
          {renderMedia()}
          <NavigationBar data={postData[0]} style={{ zIndex: 2 }} />
          <PostHeader
            data={postData[0]}
            onClosed={() => {
              console.log('closed');
              setIsFocus(false);
            }}
            onExpanded={() => {
              console.log('open');
              setIsFocus(true);
            }}
            style={{ zIndex: 2 }}
          />
          <PostContent
            data={data}
            style={{ zIndex: 2 }}
            onLoadComment={onLoadComment}
          />
      </View>
    </View>
  );
});

export default function PostDetailsScreen() : React.JSX.Element {
  // const [posts, setPosts] = useState<PostData[]>([]);
  const route = useRoute<any>();
  const {videoId} = route.params;
  const [playingVideo, setPlayingVideo] = useState<string | undefined>(videoId);
  const [posts, setPosts] = useState<VideoDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(0);
  const screenHeight = Dimensions.get('window').height - (StatusBar.currentHeight || 0);
  const navigation = useNavigation<any>();
  const videoRepository = useMemo(() => new VideoRepository(), []);

  const fetchPost = useCallback(async (currentPage: number, currentVideoId: string) => {
    setIsLoading(() => true);
    const response = await videoRepository.fetchNewFeedExclude({page: currentPage, pageSize: 2, videoId: currentVideoId});
    if (response.result.length === 0) {
      setHasMore(() => false);
    } else {
      setPosts((curr) => [...curr, ...response.result]);
      setHasMore(() => true);
    }
    setIsLoading(() => false);
  }, [videoRepository]);

  const fetchFirst = useCallback(async (currentVideoId: string) => {
    setIsLoading(() => true);
    const {result} = await videoRepository.getVideoDetails(currentVideoId);
    setPosts(() => [result]);
    setHasMore(() => true);
    setIsLoading(() => false);
  }, [videoRepository]);

  useEffect(() => {
    fetchPost(page, videoId);
  }, [fetchPost, page, videoId]);

  useEffect(() => {
    console.log('current videoId: ', videoId);
    fetchFirst(videoId);
  }, [fetchFirst, videoId]);

  const handleLoadMore = useCallback(() => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1); // Tăng số trang
    }
  }, [hasMore]);
  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: { item: VideoDetails }[] }) => {
      console.log(
        'Viewable Items:',
        viewableItems.map(({ item }) => item?.stat.videoId)
      );
      const current = viewableItems[0]?.item.stat.videoId; // Đảm bảo không bị undefined
      setPlayingVideo(current);
    },
    []
  );
  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig: {viewAreaCoveragePercentThreshold: 50}, onViewableItemsChanged },
  ]);
  const LoadingScreen = useMemo(() => {
    return (
      <View style={{backgroundColor: 'black', height: screenHeight, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', width: '100%', gap: 10, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator size={20} animating={true} color={MD2Colors.green700} />
          <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Bạn đợi tí ...</Text>
        </View>
      </View>
    );
  }, [screenHeight]);
  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
      style={{backgroundColor: 'gray' }}
      contentContainerStyle={{flexGrow: 1}}
      horizontal={false}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      maxToRenderPerBatch={3}
      windowSize={3}
      keyExtractor={(item) => item.stat.videoId.toString()}
      data={posts}
      viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      onEndReached={() => {
        console.log('onEndReached');
        handleLoadMore();
      }}
      pagingEnabled
      ListFooterComponent={LoadingScreen}
      renderItem={({item}) => {
        return (
          <PostDetails
          play={item.stat.videoId === playingVideo}
          postData={item}
          onLoadComment={() => navigation.navigate('Comment Stack Screen')}
          />
        );
      }}
      />
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
    height: '100%',
    width: '100%',
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
