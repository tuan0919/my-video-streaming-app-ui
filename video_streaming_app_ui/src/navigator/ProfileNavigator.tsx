import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ProfileScreen} from '../screen';


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
    </Stack.Navigator>
  );
}
