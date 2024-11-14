import {SafeAreaView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {Header} from '../component';

export default function ReelScreen():React.ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <Text>Reel Screen</Text>
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
