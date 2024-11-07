import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ReelScreen} from '../screen';

export default function ReelNavigator(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Reel" component={ReelScreen} />
    </Stack.Navigator>
  );
}
