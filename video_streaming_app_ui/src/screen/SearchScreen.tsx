import {Dimensions, FlatList, Image, ImageStyle, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, useWindowDimensions, View, ViewStyle} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

const SearchPost = () => {
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
      <Image source={{uri: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/470192507_1767594360445430_3156703716611701728_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=aa7b47&_nc_ohc=Y7-tDCei58YQ7kNvgFnINHj&_nc_oc=AdjLDq4QlRXHERRzN_PyAsCrswg7cOqgXhkZnyJHCo_D0Zkap2xMK4GK145sUwJBTps&_nc_zt=23&_nc_ht=scontent.fsgn2-7.fna&_nc_gid=AYVCQ5n2gWifj88-lsFQ70T&oh=00_AYDUfofo8r8HcLzeDl8vTnxexjncCuE1EWdCMFghEansiQ&oe=6768739E'}}
      style={[style.image]}
      />
    </TouchableOpacity>
  );
};

const SearchPostContent = () => {
  const [data, setData] = useState<any[]>([undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined])
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
            - Tải thêm bài viết -
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
      data={data}
      renderItem={() => <SearchPost/>}
      keyExtractor={(_, index) => index.toString()}
      contentContainerStyle={[style.container]}
      ListFooterComponent={LoadingFooter}
    />
  );
};
const SearchUserContent = () => (
  <View style={[styles.container, { backgroundColor: '#673ab7' }]} />
);

const renderScene = SceneMap({
  first: SearchPostContent,
  second: SearchUserContent,
});

const routes = [
  { key: 'first', title: 'Bài viết' },
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
