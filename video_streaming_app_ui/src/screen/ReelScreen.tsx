import {Image, ImageStyle, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { VESDK } from 'react-native-videoeditorsdk';
import {launchImageLibrary} from 'react-native-image-picker';
import { createThumbnail } from 'react-native-create-thumbnail';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

const openVideoFromLocalPathExample = async (): Promise<void> => {
  try {
    const videoPath = 'https://img.ly/static/example-assets/Skater.mp4';
    // Open the video editor and handle the export as well as any occuring errors.
    const result = await VESDK.openEditor(videoPath);

    if (result != null) {
      // The user exported a new video successfully and the newly generated video is located at `result.video`.
      console.log(result?.video);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the video.
    console.log(error);
  }
};

const openVideoFromCameraRollExample = async (navigation : any): Promise<string | undefined> => {
  try {
    // Select a video from the camera roll.
    let pickerResult = await launchImageLibrary({
      mediaType: 'video',
    });

    // Open the video editor and handle the export as well as any occuring errors.
    const video = pickerResult.assets ? pickerResult.assets[0].uri : undefined;
    if (!video) {
      navigation.goBack();
    }
    const result = video ? await VESDK.openEditor(video) : null;

    if (result != null) {
      // The user exported a new video successfully and the newly generated video is located at `result.video`.
      console.log(result?.video);
      const thumbnail = await createThumbnail({
        url: result.video,
        timeStamp: 10000,
      });
      return thumbnail.path;
    } else {
      // The user tapped on the cancel button within the editor.
      return undefined;
    }
  } catch (error) {
    console.log(error);
  }
};

const HeaderNavigation = () : React.JSX.Element => {
    type HeaderNavigation_Stype = {
        container: ViewStyle,
        title: TextStyle,
        icon_wrapper: ViewStyle,
        icon: TextStyle,
    };
    const style = useMemo<HeaderNavigation_Stype>(() => ({
        container: {
            position: 'relative',
            borderBottomWidth: 0.5,
            paddingVertical: 10,
            borderBottomColor: 'white',
            flexDirection: 'row',
            justifyContent: 'center',
        },
        title: {
            color: 'white',
            fontWeight: 'bold',
            fontSize: 20,
        },
        icon_wrapper: {
            position: 'absolute',
            left: 5,
            top: 5,
        },
        icon: {
            fontSize: 35,
            color: 'white',
        },
    }), []);
    const navigation = useNavigation<any>();
    return (
        <View style={[style.container]}>
            <Text style={[style.title]}>Bài viết của bạn</Text>
            <TouchableOpacity style={[style.icon_wrapper]} onPress={() => navigation.goBack()}>
                <IconMaterialIcons name="keyboard-backspace" style={[style.icon]}/>
            </TouchableOpacity>
        </View>
    );
};

export default function ReelScreen():React.ReactElement {
  const navigation = useNavigation<any>();
  React.useLayoutEffect(() => {
    // Ẩn Bottom Tab trên màn hình này
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      // Khôi phục lại Bottom Tab khi thoát
      navigation.getParent()?.setOptions({ 
        tabBarStyle: {
          backgroundColor: 'black',
          borderTopWidth: 2,
          borderTopColor: 'rgb(21,117,0)',
          paddingBottom: 10,
          height: 60,
        },
      });
    };
  }, [navigation]);

  type ReelScreen_Style = {
    thumbnail_wrapper?: ViewStyle,
    thumbnail?: ImageStyle,
    input_wrapper?: ViewStyle,
    input_text?: TextStyle,
  }
  const style = useMemo<ReelScreen_Style>(() => ({
    thumbnail_wrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    thumbnail: {
      width: 200,
      height: 200,
      marginTop: 20,
      borderRadius: 10,
    },
    input_wrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    input_text: {
      color: 'white',
      fontWeight: 'bold',
    },
  }), []);
  const route = useRoute<any>();
  const { thumbnail : param } = route.params || {};
  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (param) {
      setThumbnail(param);
    }
  }, [param]);
  return (
    <SafeAreaView style={styles.container}>
      { thumbnail &&
      <>
        <HeaderNavigation/>
        <View style={[style.thumbnail_wrapper]}>
          <Image source={{uri: thumbnail}} style={[style.thumbnail]}/>
        </View>
        <View style={[style.input_wrapper]}>
          <KeyboardAvoidingView>
              <TextInput style={[style.input_text]}
              textAlign="center"
              placeholder="Nhập tiêu đề video"
              placeholderTextColor={'white'} />
          </KeyboardAvoidingView>
        </View>
      </>
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  storyContainer: {
    overflow: 'hidden',
    borderBottomColor: '#292929',
    borderWidth: 1,
    paddingVertical: 5,
    marginHorizontal: 12,
  },
});
