import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ReelScreen} from '../screen';
import { useRoute } from '@react-navigation/native';

export default function ReelNavigator(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const route = useRoute<any>();
  const { thumbnail } = route.params || {};
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Reel Screen" initialParams={{
        thumbnail,
      }}
      component={ReelScreen} />
    </Stack.Navigator>
  );
}
