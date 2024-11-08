import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen, PostDetailsScreen} from '../screen';

export default function HomeNavigator(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Post Details" component={PostDetailsScreen} />
    </Stack.Navigator>
  );
}
