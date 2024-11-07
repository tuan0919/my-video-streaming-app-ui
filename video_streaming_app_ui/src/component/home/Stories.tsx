import users from '../../data/users.json';
import loginUser from '../../data/logged-in-user.json';
import React from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {
  FlatList,
  Image, SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity, View,
} from 'react-native';

interface User {
  username: string;
  avatar: string;
}

const currentUser : User = loginUser;

const userList : User[] = [currentUser, ...users];

const separator = () : React.JSX.Element => {
  return <View style={styles.separator} />;
};

function CurrentUserProfile({user} : {user: User}): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.story}>
      <View style={[styles.imageContainer, {
        borderColor: 'rgba(174,174,174,0)',
        position: 'relative',
      }]}>
        <IconAntDesign name="pluscircle" style={styles.plusIcon} />
        <Image style={styles.storyImage} source={{uri: user.avatar}} />
      </View>
      <Text style={[styles.storyName, {maxWidth: 90}]}>Your story</Text>
    </TouchableOpacity>
  );
}

function Profile({user} : {user: User}): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.story}>
      <View style={styles.imageContainer}>
        <Image style={styles.storyImage} source={{uri: user.avatar}} />
      </View>
      <Text style={styles.storyName} numberOfLines={1} ellipsizeMode="tail">{user.username}</Text>
    </TouchableOpacity>
  );
}

export default function Stories(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userList}
        horizontal={true}
        keyExtractor={item => item.username}
        ItemSeparatorComponent={separator}
        renderItem={({item, index}) => {
          if (index === 0) {
            return <CurrentUserProfile user={item} />;
          } else {
            return <Profile user={item} />;
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  plusIcon: {
    color: '#096e00',
    fontSize: 30,
    position: 'absolute',
    bottom: 0,
    right: -2,
    textAlign: 'center',
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 200,
    padding: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {

  },
  imageContainer: {
    borderWidth: 4,
    borderColor: 'rgba(53,188,12,1)',
    borderRadius: 100,
    padding: 3,
  },
  separator: {
    width: 20,
  },
  story: {
    marginVertical: 10,
    flexDirection: 'column',
    alignItems: 'center',
    marginEnd: 10,
  },
  storyImage: {
    width: 70,
    height: 70,
    borderRadius: 50,
    borderColor: '#3c3c3c',
    borderWidth: 1,
  },
  storyName: {
    fontSize: 16,
    color: 'white',
    maxWidth: 70,
  },
});
