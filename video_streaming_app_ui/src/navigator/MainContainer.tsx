import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostDetailsScreen, ProfileSettingsScreen } from '../screen';
import TabNavigator from './TabNavigator';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
        <Stack.Screen name="Post Details" component={PostDetailsScreen} />
        <Stack.Screen options={{animation: 'slide_from_bottom'}}
        name="Profile Settings Stack Screen" component={ProfileSettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
