import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {  } from 'react';
import {Header, NewFeed, Stories} from '../component';

export default function HomeScreen():React.ReactElement {
  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.feedContainer}>
        <Stories/>
        <NewFeed/>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  feedContainer: {
    overflow: 'hidden',
    borderBottomColor: '#292929',
    borderWidth: 1,
    paddingVertical: 5,
    marginHorizontal: 12,
  },
});
