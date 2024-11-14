import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {Header} from '../component';
import { Text } from 'react-native';

export default function SearchScreen():React.ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <Text>Search Screen</Text>
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
