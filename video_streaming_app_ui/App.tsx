import React from 'react';
import MainContainer from './src/navigator/MainContainer.tsx';
import {CommentBottomSheet} from './src/component';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <CommentBottomSheet/>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default App;
