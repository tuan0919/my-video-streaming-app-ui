import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {GalleryScreen} from '../screen';

export default function GalleryNavigator(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Gallery" component={GalleryScreen} />
    </Stack.Navigator>
  );
}
