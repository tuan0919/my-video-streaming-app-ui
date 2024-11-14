import React, {forwardRef, useCallback, useImperativeHandle, useMemo, useRef, useState} from 'react';
import BottomSheet, {
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import LottieView from 'lottie-react-native';

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

const Comment = React.memo(({ comment }: { comment: Comment }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const separator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  const renderItem = useCallback(({ item }: { item: Comment }) => {
    return <Comment comment={item} />;
  }, []);
  return (
    <View style={styles.commentContainer}>
      <View style={styles.avatarContainer}>
        <Image style={styles.avatar} source={{uri: comment.profile.avatar}}/>
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

export interface CommentSheet {
  close: () => void;
  open: () => void;
}

interface CommentBottomSheetProps {
  comments: Comment[];
}

const CommentBottomSheet = forwardRef<CommentSheet, CommentBottomSheetProps>(({comments} , ref) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const renderItem = useCallback(({ item }: { item: Comment }) => {
    return <Comment comment={item} />;
  }, []);

  const separator = useCallback(() => {
    return <View style={styles.separator} />;
  }, []);

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints : string[] = useMemo<string[]>(() => ['50%', '75%'], []);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsVisible(true);
      setIsLoading(true);
      bottomSheetRef.current?.expand();
      setTimeout(() => setIsLoading(false), 1000);
    },
    close: () => {
      setIsVisible(false);
      bottomSheetRef.current?.close();
    },
  }));

  // renders
  return (
    isVisible && <BottomSheet
    ref={bottomSheetRef}
    snapPoints={snapPoints}
    enableDynamicSizing={false}
    handleIndicatorStyle={{backgroundColor: 'white'}}
    handleStyle={{backgroundColor: 'black'}}
    enablePanDownToClose={true}
    onClose={() => setIsVisible(false)}
    >
    {isLoading ? (
      <View style={{backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', flex: 1}}>
        <LottieView style={{width: 50, height: 50}}
                    source={require('../../assest/loading.json')}
                    autoPlay loop
        />
      </View>
    ) : (
    <>
      <BottomSheetFlatList
      data={comments}
      renderItem={renderItem}
      ItemSeparatorComponent={separator}
      contentContainerStyle={{
        padding: 10,
      }}
      keyExtractor={(item, index) => index.toString()}
      style={styles.contentContainer}
      initialNumToRender={0}
      />
      <View style={{
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
      </View>
    </>
  )}
    </BottomSheet>
  );
});


const styles = StyleSheet.create({
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
});

export default CommentBottomSheet;
