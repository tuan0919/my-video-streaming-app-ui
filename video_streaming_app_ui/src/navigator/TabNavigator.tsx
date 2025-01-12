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
import { launchImageLibrary } from 'react-native-image-picker';
import { createThumbnail } from 'react-native-create-thumbnail';
import { VESDK } from 'react-native-videoeditorsdk';
import { useNavigation } from '@react-navigation/native';
import ReelScreen from '../screen/ReelScreen.tsx';

interface User {
  username: string;
  avatar: string;
}

const currentUser : User = loginUser;

interface RenderTabProps {
  focused: boolean;
  routeName: RouteName;
}

type RouteName = 'Home Navigator' | 'Search Navigator' | 'Profile Navigator' | 'Reel Screen' | 'Gallery Navigator';

function getTabIcon({ focused, routeName }: RenderTabProps): React.JSX.Element {
  const color: ColorValue = focused ? 'white' : '#323232FF';
  switch (routeName) {
    case 'Home Navigator':
      return <FoundationIcon name="home" style={styles.tabIcon} color={color} />;
    case 'Search Navigator':
      return <IoniconsIcon name="search" style={styles.tabIcon} color={color} />;
    case 'Reel Screen':
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

const chooseVideoFromUserDevice = async (): Promise<string | undefined> => {
  try {
    // Select a video from the camera roll.
    let pickerResult = await launchImageLibrary({
      mediaType: 'video',
    });

    // Open the video editor and handle the export as well as any occuring errors.
    const video = pickerResult.assets ? pickerResult.assets[0].uri : undefined;
    const result = video ? await VESDK.openEditor(video) : null;

    if (result != null) {
      // The user exported a new video successfully and the newly generated video is located at `result.video`.
      return result.video;
    } else {
      // The user tapped on the cancel button within the editor.
      return undefined;
    }
  } catch (error) {
    console.log(error);
  }
};

export default function TabNavigator () : React.JSX.Element {
  const Tab = createBottomTabNavigator();
  const navigation = useNavigation<any>();
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
      <Tab.Screen options={{
        unmountOnBlur: true,
      }} name="Home Navigator" component={HomeNavigator} />
      <Tab.Screen name="Search Navigator" component={SearchNavigator} />
      <Tab.Screen name="Reel Screen" component={ReelScreen}
        listeners={{
          tabPress: async (e) => {
            e.preventDefault();
            const videoPath = await chooseVideoFromUserDevice();
            console.log('video path from user device: ', videoPath);
            if (videoPath) {
              const {path : thumbnailPath} = await createThumbnail({
                url: videoPath,
                timeStamp: 10000,
              });
              thumbnailPath && navigation.navigate('Reel Screen', {
                thumbnailPath: thumbnailPath,
                videoPath: videoPath,
              });
            }
          },
        }}
      />
      <Tab.Screen name="Gallery Navigator" component={GalleryNavigator} />
      <Tab.Screen options={{
        unmountOnBlur: true,
      }} name="Profile Navigator" component={ProfileNavigator} />
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
