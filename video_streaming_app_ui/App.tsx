import React from 'react';
import MainContainer from './src/navigator/MainContainer.tsx';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';
import PlayGroundScreen from './src/screen/PlaygroundScreen.tsx';
import * as encoding from 'text-encoding';

function App(): React.JSX.Element {
global.TextEncoder = encoding.TextEncoder;
global.TextDecoder = encoding.TextDecoder;
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={styles.container}>
          {/* <MainContainer/> */}
          <PlayGroundScreen/>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
  },
});

export default App;
