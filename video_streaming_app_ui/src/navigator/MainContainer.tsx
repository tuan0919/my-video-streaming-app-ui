import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PostDetailsScreen } from '../screen';
import TabNavigator from './TabNavigator';

export default function MainContainer () : React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="Tab Navigator"
      screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Tab Navigator" component={TabNavigator} />
        <Stack.Screen name="Post Details" component={PostDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
