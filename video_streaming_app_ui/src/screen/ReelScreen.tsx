import {Button, SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {Header} from '../component';
import { VESDK } from 'react-native-videoeditorsdk';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
export const openVideoFromLocalPathExample = async (): Promise<void> => {
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


export const openVideoFromCameraRollExample = async (): Promise<void> => {
  try {
    // Select a video from the camera roll.
    let pickerResult = await launchImageLibrary({
      mediaType: 'video',
    });

    // Open the video editor and handle the export as well as any occuring errors.
    const video = pickerResult.assets ? pickerResult.assets[0].uri : undefined;
    const result = video ? await VESDK.openEditor(video) : null;

    if (result != null) {
      // The user exported a new video successfully and the newly generated video is located at `result.video`.
      console.log(result?.video);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export default function ReelScreen():React.ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <Button onPress={() => openVideoFromCameraRollExample()} title="Click me to open video editor"/>
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
