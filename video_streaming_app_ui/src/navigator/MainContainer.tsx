import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommentScreen, PostDetailsScreen, ProfileSettingsScreen } from '../screen';
import TabNavigator from './TabNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AuthenticateNavigator from './AuthenticateNavigator';

export default function MainContainer () : React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const insets = useSafeAreaInsets();
  useEffect(() => {
    console.log('MainContainer Safe Area Insets:', insets);
  }, [insets]);
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Tab Navigator"
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Tab Navigator" component={TabNavigator} />
        <Stack.Screen name="AuthenticateNavigator" component={AuthenticateNavigator} />
        <Stack.Screen name="Post Details"
        options={{animation: 'slide_from_right'}}
        component={PostDetailsScreen} />
        <Stack.Screen options={{animation: 'slide_from_bottom'}}
        name="Profile Settings Stack Screen" component={ProfileSettingsScreen} />
        <Stack.Screen name="Comment Stack Screen" options={{animation: 'slide_from_right'}} component={CommentScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
