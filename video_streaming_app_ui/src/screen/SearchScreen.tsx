import {Dimensions, FlatList, Image, ImageStyle, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View, ViewStyle} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { TabBar, TabView } from 'react-native-tab-view';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import search_users from '../data/search_users.json';
import { ClientView_SearchVideoDTO } from '../repository/VideoRepository';
import { ClientView_SearchUserDTO, UserRepository, VideoRepository } from '../repository';
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

const SearchPostContent = ({data, onLoadMore} : {data: ClientView_SearchVideoDTO[],
  onLoadMore : () => Promise<void>}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  type SearchPostContent_Style = {
    container?: ViewStyle,
  }
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
        <TouchableOpacity onPress={() => {
          onLoadMore();
        }}>
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
  }, [width, isLoading, onLoadMore]);
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
      data={data}
      renderItem={({item}) => <SearchPost link={item.thumbnail}/>}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={[style.container]}
      ListFooterComponent={LoadingFooter}
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

const UserAccount = ({user} : {user: ClientView_SearchUserDTO}) => {
  return (
    <TouchableOpacity style={{flexDirection: 'row', gap: 20, alignItems: 'center', width: '90%'}}>
      <View style={[{borderWidth: 2, borderRadius: 50, borderColor: 'white', width: 60, height: 60, overflow: 'hidden'}]}>
        <Image source={{uri: user.user.avatar}} style={[{width: '100%', height: '100%'}]}/>
      </View>
      <View style={[{maxWidth: '50%'}]}>
        <Text style={[{fontWeight: 'bold', color: 'white'}]}>@{user.user.username}</Text>
        <Text style={[{color: 'white'}]} numberOfLines={1}>{user.user.bio}</Text>
        <Text style={[{color: '#777777'}]}>Có {user.stat.followersCounts} người theo dõi</Text>
      </View>
    </TouchableOpacity>
  );
};

const SearchUserContent = ({data, onLoadMore} : {data : ClientView_SearchUserDTO[], onLoadMore : () => Promise<void>}) => {
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
    onEndReached={onLoadMore}
    ListEmptyComponent={
      <View style={{flexDirection: 'row', padding: 10, justifyContent: 'center', width: '100%'}}>
        <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>Kết quả tìm kiếm trống...</Text>
      </View>
    }
    />
  );
};

const SearchBar = ({onSearch} : {onSearch : (value : string) => Promise<void>}) : React.JSX.Element => {
  const [value, setValue] = useState<string>();
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
          value={value}
          onChangeText={setValue}
        />
        <TouchableOpacity style={{marginLeft: 'auto'}} onPress={() => {
          console.log('value: ', value);
          value && onSearch(value);
        }}>
          <FeatherIcon size={20} color={'white'} name="send" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default function SearchScreen():React.ReactElement {
  const [index, setIndex] = React.useState(0);
  const layout = useWindowDimensions();
  const videoRepository = useMemo(() => new VideoRepository(), []);
  const userRepository = useMemo(() => new UserRepository(), []);
  const [videos, setVideos] = useState<ClientView_SearchVideoDTO[]>([]);
  const [users, setUsers] = useState<ClientView_SearchUserDTO[]>([]);
  const [searchValue, setSearchValue] = useState<string>();
  const [page, setPage] = useState<number>(0);
  const routes = useMemo(() => [
    { key: 'video', title: 'Video', data: videos },
    { key: 'user', title: 'Người dùng', data: users },
  ], [videos, users]);
  const handleSearch = useCallback(async (value : string, searchPage : number) => {
    console.log('start fetch');
    try {
      if (index === 0) {
        const response = await videoRepository.searchVideo({
          page : searchPage, pageSize: 2, title: value,
        });
        setVideos((prev) => [...prev, ...response.result]);
      } else {
        const response = await userRepository.searchUser({
          page : searchPage, pageSize: 2, username: value,
        });
        setUsers((prev) => [...prev, ...response.result]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [index, videoRepository, userRepository]);
  const renderScene = ({ route }: { route: { key: string; data?: any } }) => {
    switch (route.key) {
      case 'video':
        return <SearchPostContent data={route.data as ClientView_SearchVideoDTO[]}
        onLoadMore={async () => {
          searchValue && handleSearch(searchValue, page);
          setPage(prev => prev + 1);
          return;
        }}/>;
      case 'user':
        return <SearchUserContent data={route.data as ClientView_SearchUserDTO[]}
        onLoadMore={async () => {
          searchValue && handleSearch(searchValue, page);
          setPage(prev => prev + 1);
          return;
        }}/>;
      default:
        return null;
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onSearch={async (value) => {
        setPage(() => 0);
        index === 0 && setVideos(() => []);
        setSearchValue(() => value);
        handleSearch(value, page);
        setPage(() => 1);
        return;
      }}/>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={index => {
          setVideos(() => []);
          setUsers(() => []);
          setIndex(() => index);
          setPage(() => 0);
        }}
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
