import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useMemo, useState } from 'react';
import { Image, ImageStyle, KeyboardAvoidingView, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import commentJSON from '../data/comments.json';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

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

const commentData : Comment[] = commentJSON;

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

const Comment = React.memo(({comment} : {comment: Comment}) => {
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
  const renderItem = useCallback(({ item }: { item: Comment }) => {
    return <Comment comment={item} />;
  }, []);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <View style={style.commentContainer}>
      <View style={style.avatarContainer}>
        <Image style={style.avatar} source={{uri: comment.profile.avatar}}/>
      </View>
      <View style={{gap: 5}}>
        <View style={{flexDirection: 'row', gap: 20}}>
          <Text style={{fontWeight: 'bold', color: 'white'}}>@{comment.profile.username}</Text>
          <Text style={{color: 'gray'}}>{comment.time}</Text>
        </View>
        <Text style={{color: 'white'}}>{comment.content}</Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <TouchableOpacity>
              <AntDesignIcon name="dislike2" style={{fontSize: 20, color: 'lightgray'}}/>
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 12}}>20</Text>
          </View>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
            <TouchableOpacity>
              <AntDesignIcon name="like2" style={{fontSize: 20, color: 'lightgray'}}/>
            </TouchableOpacity>
            <Text style={{color: 'white', fontSize: 12}}>20</Text>
          </View>
          <TouchableOpacity>
            <Text style={{fontWeight: 'bold', color: 'gray'}}>Reply</Text>
          </TouchableOpacity>
        </View>
        {comment.reply &&
          <View style={{paddingHorizontal: 10, paddingVertical: 20}}>
          {!isExpanded ?
            <TouchableOpacity onPress={() => setIsExpanded(true)}>
              <Text style={{fontWeight: 'bold', color: 'gray'}}>Show more reply ({comment.reply.length})</Text>
            </TouchableOpacity> :
            <FlatList data={comment.reply}
            ItemSeparatorComponent={separator}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
          }
          </View>
        }
      </View>
    </View>
  );
});

const CommentList = () : React.JSX.Element => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchMoreComments = useCallback(async () => {
    setIsLoading(() => true);
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await wait(2000);
    setComments(currentData => [...currentData, ...commentData]);
    setIsLoading(() => false);
  }, []);
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
    fetchMoreComments();
  }, [fetchMoreComments]);
    const seperator = () => {
        return (
            <View style={{height: 20}}/>
        );
    };
    return (
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <FlatList
                data={comments}
                onEndReachedThreshold={1}
                onEndReached={handleLoadMore}
                contentContainerStyle={{paddingVertical: 10}}
                renderItem={({item}) => <Comment comment={item}/>}
                ItemSeparatorComponent={seperator}
                ListFooterComponent={LoadingFooter}
                />
            </View>
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
        </View>
    );
};

export default CommentScreen;
