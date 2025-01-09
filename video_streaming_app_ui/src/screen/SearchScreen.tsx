import {Dimensions, FlatList, Image, ImageStyle, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View, ViewStyle} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import search_users from '../data/search_users.json';
import search_video_links from '../data/searchVideos.json';
const SearchPost = ({link}: {link : string}) => {
  type SearchPost_Style = {
    image?: ImageStyle,
    image_wrapper?: ViewStyle,
  }
  const style = useMemo<SearchPost_Style>(() => ({
    image_wrapper: {
      height: 160,
      width: 130,
    },
    image: {
      width: '100%',
      height: '100%',
    },
  }),[]);
  return (
    <TouchableOpacity style={[style.image_wrapper]}>
      <Image source={{uri: link}}
      style={[style.image]}
      />
    </TouchableOpacity>
  );
};

const SearchPostContent = () => {
  const [data, setData] = useState<any[]>(search_video_links);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  type SearchPostContent_Style = {
    container?: ViewStyle,
  }
  const fetchMorePosts = useCallback(async () => {
    setIsLoading(true);
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await wait(2000);
    setData(currentData => [...currentData, undefined]);
    setIsLoading(false);
  }, []);
  const {width} = Dimensions.get('window');
  const LoadingFooter = useMemo(() => {
    return (
      <View style={{
        height: 100,
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
      }}>
      { !isLoading ?
        <TouchableOpacity onPress={fetchMorePosts}>
          <Text style={{color: 'green', fontSize: 13, fontWeight: 'bold'}}>
            - Tải thêm video -
          </Text>
        </TouchableOpacity>
        :
        <View style={{flexDirection: 'row', width: '100%', gap: 10, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating={true} color={MD2Colors.green700} />
          <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Bạn đợi tí ...</Text>
        </View>
      }
      </View>
    );
  }, [width, isLoading, fetchMorePosts]);
  const style = useMemo<SearchPostContent_Style>(() => ({
    container: {
      backgroundColor: 'black',
      flexWrap: 'wrap',
      flexDirection: 'row',
      gap: 5,
      alignItems: 'center',
      paddingHorizontal: 3,
      paddingVertical: 10,
    },
  }), []);
  return (
    <FlatList
      data={[]}
      renderItem={({item : link}) => <SearchPost link={link}/>}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={[style.container]}
      // ListFooterComponent={LoadingFooter}
      ListEmptyComponent={
        <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', width: '100%'}}>
          <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Kết quả tìm kiếm trống...</Text>
        </View>
      }
    />
  );
};

type UserAccount = {
  username: string,
  avatar: string,
  follow: number,
  bio: string,
}

const UserAccount = ({user} : {user: UserAccount}) => {
  return (
    <TouchableOpacity style={{flexDirection: 'row', gap: 20, alignItems: 'center', width: '90%'}}>
      <View style={[{borderWidth: 2, borderRadius: 50, borderColor: 'white', width: 60, height: 60, overflow: 'hidden'}]}>
        <Image source={{uri: user.avatar}} style={[{width: '100%', height: '100%'}]}/>
      </View>
      <View style={[{maxWidth: '50%'}]}>
        <Text style={[{fontWeight: 'bold', color: 'white'}]}>@{user.username}</Text>
        <Text style={[{color: 'white'}]} numberOfLines={1}>{user.bio}</Text>
        <Text style={[{color: '#777777'}]}>Có {user.follow} người theo dõi</Text>
      </View>
    </TouchableOpacity>
  );
};

const SearchUserContent = () => {
  const [data, setData] = useState<UserAccount[]>(search_users);
  const fetchMoreUsers = useCallback(async () => {
    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    await wait(2000);
    setData(currentData => [...currentData, ...search_users]);
  }, []);
  const {width} = Dimensions.get('window');
  const LoadingFooter = useMemo(() => {
    return (
      <View style={{
        paddingTop: 5,
        paddingBottom: 60,
        flexDirection: 'row',
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center',
        width: width,
      }}>
        <View style={{flexDirection: 'row', width: '100%', gap: 10, alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator animating={true} color={MD2Colors.green700} />
          <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Bạn đợi tí ...</Text>
        </View>
      </View>
    );
  }, [width]);
  return (
    <FlatList
    contentContainerStyle={{
      gap: 20,
      paddingHorizontal: 10,
      paddingTop: 20,
    }}
    data={data}
    renderItem={({item}) => <UserAccount user={item}/>}
    ListFooterComponent={LoadingFooter}
    // onEndReached={fetchMoreUsers}
    />
  );
};

const renderScene = SceneMap({
  first: SearchPostContent,
  second: SearchUserContent,
});

const routes = [
  { key: 'first', title: 'Video' },
  { key: 'second', title: 'Người dùng' },
];

const SearchBar = () : React.JSX.Element => {
  return (
    <View style={{backgroundColor: 'black', padding: 10}}>
      <View style={{
          backgroundColor: '#444444',
          borderRadius: 10,
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          paddingVertical: 3,
          paddingHorizontal: 10,
        }}>
        <FeatherIcon size={20} color={'white'} name="search" />
        <TextInput placeholder="Nhập nội dung tìm kiếm"
          style={{color: 'white', fontSize: 13}}
          placeholderTextColor={'white'}
          textAlign="left"
        />
      </View>
    </View>
  )
}

export default function SearchScreen():React.ReactElement {
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar/>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={(props) => {
          return (
            <TabBar
              {...props}
              style={{backgroundColor: 'black'}}
              indicatorStyle={{backgroundColor: 'white'}}
            />
          );
        }}
    />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  storyContainer: {
    overflow: 'hidden',
    borderBottomColor: '#292929',
    borderWidth: 1,
    paddingVertical: 5,
    marginHorizontal: 12,
  },
});
