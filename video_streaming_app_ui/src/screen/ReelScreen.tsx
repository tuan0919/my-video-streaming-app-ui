import {DeviceEventEmitter, Image, ImageStyle, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, MD2Colors, TextInput as PaperTextInput } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
import { VideoRepository } from '../repository';
import axios from 'axios';
import NativeUploader from '../../specs/NativeUploader';
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

export default function ReelScreen() : React.ReactElement {
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
      flexDirection: 'column',
      alignItems: 'center',
    },
    input_text: {
      color: 'white',
      fontWeight: 'bold',
      borderBottomColor: 'green',
      borderBottomWidth: 1,
      width: '80%',
    },
  }), []);
  const route = useRoute<any>();
  const { thumbnailPath, videoPath } = route.params || {};
  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
  const [video, setVideo] = useState<string | undefined>(undefined);
  const [videoKey, setVideoKey] = useState<string | undefined>(undefined);
  const [thumbnailKey, setThumbnailKey] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [videoName, setVideoName] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const videoRepository = useMemo(() => new VideoRepository(), []);

  const handleUpload = useCallback(async () => {
    if (description && videoName) {
      try {
        setUploading(true);
        const {result : {link : thumbnail_upload_link}} = await videoRepository.putFileRequest({
          filename: 'thumbnail.jpeg',
        });
        const {result : {link : video_upload_link}} = await videoRepository.putFileRequest({
          filename: 'video.mp4',
        });
        await Promise.all([
          NativeUploader.uploadFile(thumbnail_upload_link, thumbnailPath, 'image/jpeg'),
          NativeUploader.uploadFile(video_upload_link, videoPath, 'video/mp4'),
        ]);
        console.log('upload lên temp thành công');
        setUploading(false);
        await videoRepository.uploadVideoRequest({
          description: description,
          videoName: videoName,
          videoKey: 'video.mp4',
          thumbnailKey: 'thumbnail.jpeg',
        });
        setIsCompleted(true);
        console.log('Upload video mới thành công!');
      } catch (error: any) {
        if (error.response) {
          console.log('Lỗi từ server:', {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
          });
        } else if (error.request) {
          console.log('Không nhận được phản hồi:', error.request);
        } else {
          console.log('Lỗi trong quá trình setup:', error.message);
        }
        console.log('Chi tiết lỗi:', error);
      }
    }
  }, [description, thumbnailPath, videoName, videoPath, videoRepository]);
  useEffect(() => {
    setThumbnail(thumbnailPath);
    setVideo(videoPath);
    console.log('thumbnail path: ', thumbnailPath);
    console.log('video path: ', videoPath);
  }, [thumbnailPath, videoPath]);
  return (
    <SafeAreaView style={[styles.container]}>
      { thumbnail &&
      <>
        <HeaderNavigation/>
        <ScrollView
        style={[{flex: 1}]}>
          <View style={[style.thumbnail_wrapper]}>
            <Image source={{uri: thumbnail}} style={[style.thumbnail]}/>
          </View>
          <KeyboardAvoidingView
            style={[{gap: 20, paddingTop: 10, flex: 1}]}
          >
            <View
            style={{flexDirection: 'row', justifyContent: 'center'}}>
                  <TextInput style={[style.input_text]}
                  textAlign="center"
                  value={videoName}
                  placeholder="Nhập tiêu đề video"
                  placeholderTextColor={'white'}
                  onChangeText={setVideoName}
                  />
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'center'}}>
                <PaperTextInput
                style={[{backgroundColor: 'rgba(0,0,0,1)', width: '80%'}]}
                multiline={true}
                mode="outlined"
                activeOutlineColor="green"
                outlineColor="green"
                textColor="white"
                value={description}
                onChangeText={setDescription}
                placeholderTextColor={'white'}
                label={<Text style={{color: 'white', fontWeight: 'bold'}}>Mô tả video</Text>}
              />
            </View>
          </KeyboardAvoidingView>
          {
            uploading && !isCompleted &&
            <View style={{width: '100%', height: 50, backgroundColor: 'black', flexDirection: 'row', justifyContent: 'center'}}>
              <ActivityIndicator animating={true} color={MD2Colors.green700} />
              <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Bạn đợi tí ...</Text>
            </View>
          }
          {
            isCompleted &&
            <View style={{width: '100%', height: 50, backgroundColor: 'black', flexDirection: 'row', justifyContent: 'center'}}>
              <Text style={{color: 'white', fontSize: 13, fontWeight: 'bold'}}>Upload video thành công!</Text>
            </View>
          }
        </ScrollView>
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
          style={[{
              width: '80%',
              backgroundColor: uploading || isCompleted ? '#aaaaaa' : '#73EC8B',
              paddingVertical: 10,
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: uploading || isCompleted ? 'gray' : 'green',
              marginVertical: 20,
            }]}
            disabled={uploading || isCompleted}
            onPress={handleUpload}
          >
            <Text style={{fontWeight: 'bold', color: 'black'}}>Chia sẻ video</Text>
          </TouchableOpacity>
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
