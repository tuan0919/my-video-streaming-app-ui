import { useNavigation, useRoute } from '@react-navigation/native';
import React, { createContext, Dispatch, ReactNode, useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { Image, ImageStyle, KeyboardAvoidingView, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { CommentCreationRequestDTO, CommentDetails, CommentRepository } from '../repository';

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

interface CommentProps {
  comment: CommentDetails,
  handleLike?: (targetId : string) => void,
  handleDislike?: (targetId : string) => void,
  handleReply?: (targetComment: CommentDetails) => void,
}
const Comment = React.memo(({comment, handleLike, handleDislike} : CommentProps) => {
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
    return <Comment comment={item} handleLike={handleLike} handleDislike={handleDislike} />;
  }, []);
  const {state, dispatch} = useContext(ScreenContext);
  const replyingComment = state.replyingComment;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reply, setReply] = useState<CommentDetails[]>([]);
  const [page, setPage] = useState<number>(0);
  const commentRepository = useMemo(() => new CommentRepository(), []);
  const [action, setAction] = useState<string>(comment.action || 'NO_ACTION');
  const [likeCounts, setLikeCounts] = useState<number>(comment.comment.likeCounts);
  const [dislikeCounts, setDislikeCounts] = useState<number>(comment.comment.dislikeCounts);

  const fetchCommentsReply = useCallback(async (currentPage: number) => {
    setIsLoading(() => true);
    const response = await commentRepository.getCommentsReplyOfComment({commentId: comment.comment.id, page: currentPage, pageSize: 2});
    setReply((curr) => [...curr, ...response.result]);
    setIsLoading(() => false);
  }, [commentRepository, comment]);

  const handleLoadMore = useCallback(() => {
    setPage(currentPage => currentPage + 1);
    fetchCommentsReply(page);
  }, [fetchCommentsReply, page]);

  const LoadMoreReply = useMemo(() => {
    return (
      <View style={{height: 70, backgroundColor: 'black', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', width: '100%', gap: 10, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity onPress={() => handleLoadMore()}>
            <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Tải thêm bình luận</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [handleLoadMore]);

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
            <TouchableOpacity onPress={() => {
              setAction(() => 'DISLIKE');
              setDislikeCounts(prev => prev + 1);
              handleDislike && handleDislike(comment.comment.id);
            }}>
            { action === 'DISLIKE' ?
              <AntDesignIcon name="dislike1" style={{fontSize: 20, color: 'green'}}/> :
              <AntDesignIcon name="dislike2" style={{fontSize: 20, color: 'lightgray'}}/>
            }
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 12}}>{dislikeCounts}</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <TouchableOpacity onPress={() => {
              setAction(() => 'LIKE');
              setLikeCounts(prev => prev + 1);
              handleLike && handleLike(comment.comment.id);
            }}>
            { action === 'LIKE' ?
              <AntDesignIcon name="like1" style={{fontSize: 20, color: 'green'}}/> :
              <AntDesignIcon name="like2" style={{fontSize: 20, color: 'lightgray'}}/>
            }
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 12}}>{likeCounts}</Text>
          </View>
          <TouchableOpacity onPress={() => dispatch({type: 'SET_REPLYING_COMMENT', payload: comment})}>
            { replyingComment?.comment.id !== comment.comment.id ?
              <Text style={{fontWeight: 'bold', color: 'gray'}}>Phản hồi</Text> :
              <Text style={{fontWeight: 'bold', color: 'green'}}>Đang phản hồi</Text>
            }
          </TouchableOpacity>
        </View>
        {comment.comment.replyCounts &&
          <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
          {!isExpanded ?
            <TouchableOpacity onPress={() => {
              setIsExpanded(true);
              fetchCommentsReply(0);
            }}>
              <Text style={{fontWeight: 'bold', color: 'gray'}}>Hiển thị phản hồi ({comment.comment.replyCounts})</Text>
            </TouchableOpacity> :
            <FlatList data={reply}
              ItemSeparatorComponent={separator}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              ListFooterComponent={LoadMoreReply}
            />
          }
          </View>
        }
      </View>
    </View>
  );
});

interface CommentListProps {
  onEndReached: () => void,
  hasMore: boolean,
  data: CommentDetails[],
  handleLike?: (targetId : string) => void,
  handleDislike?: (targetId : string) => void,
  handleReply?: (targetComment: CommentDetails) => void,
}

const CommentList = ({onEndReached, hasMore, data, handleLike, handleDislike} : CommentListProps) : React.JSX.Element => {
  const LoadingFooter = useMemo(() => {
    return (
      hasMore &&
      <View style={{height: 70, backgroundColor: 'black', alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flexDirection: 'row', width: '100%', gap: 10, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating={true} color={MD2Colors.green700} />
          <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Bạn đợi tí ...</Text>
        </View>
      </View> || <View/>
    );
  }, [hasMore]);
  const seperator = () => {
      return (
          <View style={{height: 20}}/>
      );
  };
    return (
        <FlatList
          data={data}
          onEndReachedThreshold={0.7}
          onEndReached={onEndReached}
          contentContainerStyle={{paddingVertical: 10}}
          renderItem={({item}) => <Comment comment={item} handleLike={handleLike} handleDislike={handleDislike}/>}
          ItemSeparatorComponent={seperator}
          ListFooterComponent={LoadingFooter}
      />
    );
};

const InputFields = ({onSubmitComment} : {onSubmitComment: (userInput : string) => void}): React.JSX.Element => {
  const [comment, setComment] = useState<string>();
  const {state, dispatch} = useContext(ScreenContext);
  const replyingComment = state.replyingComment;
  return (
    <>
      {
        replyingComment &&
        <View style={{backgroundColor: 'rgb(37, 37, 37)', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10}}>
          <Text style={{color: 'white'}}>Đang phản hồi bình luận của @{replyingComment.ownerProfile.username}</Text>
          <TouchableOpacity onPress={() => dispatch({type: 'SET_REPLYING_COMMENT', payload: null})}>
            <AntDesignIcon name="closecircleo" color={'white'} size={20}/>
          </TouchableOpacity>
        </View>
      }
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
            value={comment}
            onChangeText={value => setComment(() => value)}
            selectionColor={'green'}
            placeholder="Nhập bình luận của bạn tại đây"
        />
        <TouchableOpacity
          style={{
              position: 'absolute',
              right: 10,
            }}
            onPress={() => {
              comment && onSubmitComment(comment);
              setComment(() => '');
            }}
            >
              <FeatherIcon name="send" style={{
                color: 'lightgray',
                fontSize: 24,
              }}/>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
}

const NotificationSuccess = () => {
    return (
        <View style={{flexDirection: 'row',
            gap: 10, alignItems: 'center',
            backgroundColor: 'lightgreen',
            borderRadius: 10, width: 300,
            padding: 10,
            position: 'absolute',
            left: '50%',
            top: '50%',
            zIndex: 999,
            transform: [
                {translateX: '-50%'},
                {translateY: '-50%'},
            ],
        }}
        >
            <AntDesignIcon name="checkcircleo" color={'green'} size={30}/>
            <View style={[{gap: 10, flex: 1}]}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Thêm bình luận thành công</Text>
                <Text style={{color: 'darkgreen'}}>Bạn đã thêm bình luận mới thành công. Vui lòng refresh lại để cập nhật thay đổi.</Text>
            </View>
            <AntDesignIcon name="close" color={'green'} size={20} style={{position: 'absolute', right: 5, top: 5}}/>
        </View>
    );
};
const NotificationFailed = () => {
    return (
        <View style={{flexDirection: 'row',
            gap: 10, alignItems: 'center',
            backgroundColor: 'rgb(255, 56, 56)',
            borderRadius: 10, width: 300,
            padding: 10,
            position: 'absolute',
            left: '50%',
            top: '50%',
            zIndex: 999,
            transform: [
                {translateX: '-50%'},
                {translateY: '-50%'},
            ],
        }}
        >
            <AntDesignIcon name="closecircleo" color={'darkred'} size={30}/>
            <View style={[{gap: 10, flex: 1}]}>
                <Text style={{fontWeight: 'bold', color: 'white'}}>Thêm bình luận thất bại</Text>
                <Text style={{color: 'darkred'}}>Thêm bình luận thất bại, video mà bạn đang bình luận đã bị xóa.</Text>
            </View>
            <AntDesignIcon name="close" color={'darkred'} size={20} style={{position: 'absolute', right: 5, top: 5}}/>
        </View>
    );
};
interface ScreenState {
  replyingComment: CommentDetails | null;
}
type ActionType = { type: 'SET_REPLYING_COMMENT'; payload: CommentDetails | null };
interface ScreenContextProps {
  state: ScreenState;
  dispatch: Dispatch<ActionType>;
}
const ScreenContext = createContext<ScreenContextProps>({
  state: { replyingComment: null },
  dispatch: () => undefined, // No-op function
});

const ScreenReducer = (state: ScreenState, action: ActionType): ScreenState => {
  switch (action.type) {
    case 'SET_REPLYING_COMMENT':
      return { ...state, replyingComment: action.payload };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const CommentScreenContextProvider = ({
  children,
}: {
  children: ReactNode;
}): React.JSX.Element => {
  const initialState: ScreenState = {
    replyingComment: null,
  };

  const [state, dispatch] = useReducer(ScreenReducer, initialState);

  return (
    <ScreenContext.Provider value={{ state, dispatch }}>
      {children}
    </ScreenContext.Provider>
  );
};

const MainContent = () : React.JSX.Element => {
  type Main_Style = {
    container?: ViewStyle,
}
const style = useMemo<Main_Style>(() => ({
    container: {
        backgroundColor: 'black',
        height: '100%',
        width: '100%',
        position: 'relative',
    },
}), []);
const commentRepository = useMemo(() => new CommentRepository(), []);
const route = useRoute<any>();
const {videoId} = route.params;
const [comments, setComments] = useState<CommentDetails[]>([]);
const [isLoading, setIsLoading] = useState<boolean>(true);
const [page, setPage] = useState<number>(0);
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
const handleLoadMore = useCallback(() => {
  setPage(currentPage => currentPage + 1);
  fetchMoreComments(page);
}, [fetchMoreComments, page]);
const {state} = useContext(ScreenContext);
const replyingComment = state.replyingComment;
  return (
  <View style={[style.container]}>
    <HeaderNavigation/>
    <CommentList
        onEndReached={handleLoadMore}
        data={comments}
        hasMore={hasMore}
        handleLike={(commentId) => {
          commentRepository.reactToComment({action: 'LIKE'}, commentId)
            .then(response => {
              console.log('LIKE COMMENT THANH CONG');
              console.log(response);
            }).catch(error => {
              console.log('CO LOI XAY RA');
              console.error(error);
            });
        }}
        handleDislike={(commentId) => {
          commentRepository.reactToComment({action: 'DISLIKE'}, commentId)
            .then(response => {
              console.log('DISLIKE COMMENT THANH CONG');
              console.log(response);
            }).catch(error => {
              console.log('CO LOI XAY RA');
              console.error(error);
            });
        }}
      />
      <InputFields onSubmitComment={(userInpput) => {
        const data : CommentCreationRequestDTO = replyingComment != null ? {
          content: userInpput,
          videoId,
          parentId: replyingComment.comment.id,
        } : {
          content: userInpput,
          videoId,
        };
        commentRepository.createNewComment(data).then(response => {
          console.log('INSER THANH CONG');
          console.log(response);
        }).catch(error => {
          console.log('CO LOI XAY RA');
          console.error(error);
        });
      }}/>
  </View>
  )
}

const CommentScreen = () : React.JSX.Element => {
    return (
      <CommentScreenContextProvider>
        <MainContent/>
      </CommentScreenContextProvider>
    );
};

export default CommentScreen;
