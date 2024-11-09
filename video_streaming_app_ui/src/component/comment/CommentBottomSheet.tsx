import React, {createContext, useCallback, useContext, useMemo, useRef} from 'react';
import BottomSheet, {
  BottomSheetFlatList,
} from '@gorhom/bottom-sheet';
import {FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import data from '../../data/comments.json';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

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

const comments : Comment[] = data;

function Comment({comment} : {comment: Comment}) : React.JSX.Element {
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
          <FlatList data={comment.reply}
            ItemSeparatorComponent={separator}
            renderItem={({item}) => <Comment comment={item}/>}
          />
          </View>
        }
      </View>
    </View>
  );
}

// Tạo Context
const BottomSheetContext = createContext<{
  openBottomSheet: () => void;
} | null>(null);

export const useBottomSheet = () => useContext(BottomSheetContext);

const separator = () : React.JSX.Element => {
  return <View style={styles.separator} />;
};

export default function CommentBottomSheet({children}: {children: React.JSX.Element}) : React.JSX.Element {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints : string[] = useMemo<string[]>(() => ['50%', '75%'], []);

    const openBottomSheet = useCallback(() => {
      bottomSheetRef.current?.snapToIndex(0);
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);
    // renders
    return (
      <BottomSheetContext.Provider value={{openBottomSheet}}>
        {children}
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          enableDynamicSizing={false}
          handleIndicatorStyle={{backgroundColor: 'white'}}
          handleStyle={{backgroundColor: 'black'}}
          enablePanDownToClose={true}
        >
          <BottomSheetFlatList
          data={comments}
          renderItem={({item}) => <Comment comment={item}/>}
          ItemSeparatorComponent={separator}
          contentContainerStyle={{
            padding: 10,
          }}
          style={styles.contentContainer}
          />
          <View style={{
            paddingHorizontal: 10,
            backgroundColor: 'black',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'space-between',
            alignItems: 'center',
            }}
          >
            <TextInput
              placeholderTextColor={'gray'}
              cursorColor={'green'}
              numberOfLines={1}
              selectionColor={'green'}
              placeholder="Nhập bình luận"
            />
            <TouchableOpacity>
              <FeatherIcon name="send" style={{
                color: 'lightgray',
                fontSize: 24,
              }} />
            </TouchableOpacity>
          </View>
        </BottomSheet>
      </BottomSheetContext.Provider>
    );
}

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
