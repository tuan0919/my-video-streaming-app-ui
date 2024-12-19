import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ReelScreen} from '../screen';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';

export default function ReelNavigator(): React.JSX.Element {
  const Stack = createNativeStackNavigator();
  const route = useRoute<any>();
  const { thumbnail, video } = route.params || {};
  const navigation = useNavigation<any>();
  useFocusEffect(() => {
    // Cập nhật params khi màn hình được focus hoặc khi params thay đổi
    if (thumbnail && video) {
      navigation.setParams({
        thumbnailPath: thumbnail,
        videoPath: video,
      });
    }
  });
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Reel Screen" component={ReelScreen} />
    </Stack.Navigator>
  );
}
