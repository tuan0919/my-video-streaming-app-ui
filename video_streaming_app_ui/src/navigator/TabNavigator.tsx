import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FoundationIcon from 'react-native-vector-icons/Foundation';
import IoniconsIcon from 'react-native-vector-icons/Ionicons';
import MaterialIconsIcon from 'react-native-vector-icons/MaterialIcons';
import {ColorValue, Image, StyleSheet, View} from 'react-native';
import HomeNavigator from './HomeNavigator.tsx';
import SearchNavigator from './SearchNavigator.tsx';
import ProfileNavigator from './ProfileNavigator.tsx';
import loginUser from '../data/logged-in-user.json';
import ReelNavigator from './ReelNavigator.tsx';
import GalleryNavigator from './GalleryNavigator.tsx';

interface User {
  username: string;
  avatar: string;
}

const currentUser : User = loginUser;

interface RenderTabProps {
  focused: boolean;
  routeName: RouteName;
}

type RouteName = 'Home Navigator' | 'Search Navigator' | 'Profile Navigator' | 'Reel Navigator' | 'Gallery Navigator';

function getTabIcon({ focused, routeName }: RenderTabProps): React.JSX.Element {
  const color: ColorValue = focused ? 'white' : '#323232FF';
  switch (routeName) {
    case 'Home Navigator':
      return <FoundationIcon name="home" style={styles.tabIcon} color={color} />;
    case 'Search Navigator':
      return <IoniconsIcon name="search" style={styles.tabIcon} color={color} />;
    case 'Reel Navigator':
      return (
        <View style={styles.mainButton}>
          <Image source={require('../assest/circle.png')} style={{
            width: 50,
            height: 50,
            borderRadius: 25,
          }}/>;
          <IoniconsIcon name="sparkles-sharp" style={{
            position: 'absolute',
            top: 20,
            left: 20,
            fontSize: 20,
            color: 'white',
          }} />
        </View>
      );
    case 'Profile Navigator':
      return (
        <View style={styles.avatarWrapper}>
          <Image source={{uri: currentUser.avatar}} style={styles.avatar}/>;
        </View>
      );
    case 'Gallery Navigator':
      return <MaterialIconsIcon name={'video-collection'} style={styles.tabIcon} color={color} />;
    default:
      return <FoundationIcon name="home" style={styles.tabIcon} color={color} />;
  }
}

export default function TabNavigator () : React.JSX.Element {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
      return {
        lazy: true,
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 2,
          borderTopColor: 'rgb(21,117,0)',
          paddingBottom: 10,
          height: 60,
        },
        tabBarIcon: (props) => getTabIcon({
          focused: props.focused,
          routeName: route.name as RouteName,
        }),
      };
    }}>
      <Tab.Screen name="Home Navigator" component={HomeNavigator} />
      <Tab.Screen name="Search Navigator" component={SearchNavigator} />
      <Tab.Screen name="Reel Navigator" component={ReelNavigator} />
      <Tab.Screen name="Gallery Navigator" component={GalleryNavigator} />
      <Tab.Screen name="Profile Navigator" component={ProfileNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  avatarWrapper: {
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#454545',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  mainButton: {
    position: 'relative',
    backgroundColor: 'rgba(53,188,12,1)',
    width: 60,
    height: 60,
    marginBottom: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'rgb(21,117,0)',
  },
  avatar: {
    width: 32,
    height: 32,
  },
  tabIcon: {
    fontSize: 25,
  },
  tabScreen: {

  }
});
