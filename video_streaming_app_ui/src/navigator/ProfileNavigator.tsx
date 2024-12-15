import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NotificationScreen, ProfileScreen} from '../screen';


export default function ProfileNavigator(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Profile Stack Screen"
      >
      <Stack.Screen name="Profile Stack Screen" component={ProfileScreen} />
      <Stack.Screen
      options={{animation: 'slide_from_left'}}
      name="Notification Stack Screen"
      component={NotificationScreen}
      />
    </Stack.Navigator>
  );
}
