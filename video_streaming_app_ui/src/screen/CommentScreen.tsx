import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, ImageStyle, KeyboardAvoidingView, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import commentJSON from '../data/comments.json';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { CommentDetails, CommentRepository } from '../repository';

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
            <Text style={[style.title]}>Danh sách bình luận</Text>
            <TouchableOpacity style={[style.icon_wrapper]} onPress={() => navigation.goBack()}>
                <IconMaterialIcons name="keyboard-backspace" style={[style.icon]}/>
            </TouchableOpacity>
        </View>
    );
};

const Comment = React.memo(({comment} : {comment: CommentDetails}) => {
  type Comment_Style = {
    contentContainer?: ViewStyle,
    commentContainer?: ViewStyle,
    avatarContainer?: ViewStyle,
    separator?: ViewStyle,
    avatar?: ImageStyle
  }
  const style = useMemo<Comment_Style>(() => ({
    contentContainer: {
        flex: 1,
        backgroundColor: 'black',
        position: 'relative',
    },
    commentContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    avatarContainer: {
        width: 30,
        height: 30,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'gray',
    },
    separator: {
        height: 20,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
  }), []);
  const separator = useCallback(() => {
    return <View style={style.separator} />;
  }, [style]);
  const renderItem = useCallback(({ item }: { item: CommentDetails }) => {
    return <Comment comment={item} />;
  }, []);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<CommentDetails[]>([]);
  const [page, setPage] = useState<number>(0);
  const commentRepository = useMemo(() => new CommentRepository(), []);

  const fetchCommentsReply = useCallback(async (currentPage: number) => {
    setIsLoading(() => true);
    const response = await commentRepository.getCommentsReplyOfComment({commentId: comment.comment.id, page: currentPage, pageSize: 2});
    console.log('data: ', response.result);
    setComments((curr) => [...curr, ...response.result]);
    setIsLoading(() => false);
  }, [commentRepository, comment]);

  const LoadingFooter = useMemo(() => {
    return (
      <View style={{height: 70, backgroundColor: 'black', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', width: '100%', gap: 10, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating={true} color={MD2Colors.green700} />
          <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Bạn đợi tí ...</Text>
        </View>
      </View>
    );
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage(currentPage => currentPage + 1);
    fetchCommentsReply(page);
  }, [fetchCommentsReply, page]);

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <View style={style.commentContainer}>
      <View style={style.avatarContainer}>
        <Image style={style.avatar} source={{uri: comment.ownerProfile?.avatar}}/>
      </View>
      <View style={{gap: 5}}>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>@{comment.ownerProfile.username}</Text>
          <Text style={{color: 'gray'}}>{comment.comment.createTime}</Text>
        </View>
        <Text style={{color: 'white'}}>{comment.comment.content}</Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <TouchableOpacity>
              <AntDesignIcon name="dislike2" style={{fontSize: 20, color: 'lightgray'}}/>
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 12}}>{comment.comment.dislikeCounts}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <TouchableOpacity>
              <AntDesignIcon name="like2" style={{fontSize: 20, color: 'lightgray'}}/>
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 12}}>{comment.comment.likeCounts}</Text>
          </View>
          <TouchableOpacity>
            <Text style={{fontWeight: 'bold', color: 'gray'}}>Reply</Text>
          </TouchableOpacity>
        </View>
        {comment.comment.replyCounts &&
          <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
          {!isExpanded ?
            <TouchableOpacity onPress={() => {
              setIsExpanded(true);
            }}>
              <Text style={{fontWeight: 'bold', color: 'gray'}}>Show more reply ({comment.comment.replyCounts})</Text>
            </TouchableOpacity> :
            <FlatList data={comments}
              ItemSeparatorComponent={separator}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              onEndReached={handleLoadMore}
              ListFooterComponent={LoadingFooter}
            />
          }
          </View>
        }
      </View>
    </View>
  );
});

const CommentList = () : React.JSX.Element => {
  const [comments, setComments] = useState<CommentDetails[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const route = useRoute<any>();
  const {videoId} = route.params;
  const [page, setPage] = useState<number>(0);
  const commentRepository = useMemo(() => new CommentRepository(), []);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const fetchMoreComments = useCallback(async (currentPage: number) => {
    setIsLoading(() => true);
    const response = await commentRepository.getCommentsOfVideo({videoId, page: currentPage, pageSize: 2});
    if (response.result.length === 0) {
      setHasMore(() => false);
    } else {
      setComments((curr) => [...curr, ...response.result]);
      setHasMore(() => true);
    }
    setIsLoading(() => false);
  }, [commentRepository, videoId]);

  const LoadingFooter = useMemo(() => {
    return (
      hasMore &&
      <View style={{height: 70, backgroundColor: 'black', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', width: '100%', gap: 10, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating={true} color={MD2Colors.green700} />
          <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Bạn đợi tí ...</Text>
        </View>
      </View>
    );
  }, [hasMore]);

  const handleLoadMore = useCallback(() => {
    setPage(currentPage => currentPage + 1);
    fetchMoreComments(page);
  }, [fetchMoreComments, page]);
  const seperator = () => {
      return (
          <View style={{height: 20}}/>
      );
  };
    return (
        <FlatList
          data={comments}
          onEndReachedThreshold={0.7}
          onEndReached={handleLoadMore}
          contentContainerStyle={{paddingVertical: 10}}
          renderItem={({item}) => <Comment comment={item}/>}
          ItemSeparatorComponent={seperator}
          ListFooterComponent={LoadingFooter}
      />
    );
};

const CommentScreen = () : React.JSX.Element => {
    type CommentScreen_Style = {
        container?: ViewStyle,
    }
    const style = useMemo<CommentScreen_Style>(() => ({
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
            <CommentList/>
            <KeyboardAvoidingView style={{
                paddingHorizontal: 10,
                backgroundColor: 'black',
                flexDirection: 'row',
                alignItems: 'center',
                position: 'relative',
            }}
            >
                <TextInput
                    style={{color: 'white', width: '80%'}}
                    placeholderTextColor={'gray'}
                    cursorColor={'green'}
                    numberOfLines={1}
                    selectionColor={'green'}
                    placeholder="Enter your comment"
                />
                <TouchableOpacity style={{
                    position: 'absolute',
                    right: 10,
                    top: '50%',
                    transform: [
                        { translateY: '-50%' },
                    ],
                    }}>
                    <FeatherIcon name="send" style={{
                    color: 'lightgray',
                    fontSize: 24,
                    }} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
};

export default CommentScreen;
