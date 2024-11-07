import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SearchScreen} from '../screen';

export default function SearchNavigator(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>
  );
}
