import React, {useCallback, useMemo, useRef} from 'react';
import BottomSheet, {
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Button, StyleSheet, Text} from 'react-native';

export default function CommentBottomSheet() : React.JSX.Element {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints : string[] = useMemo<string[]>(() => ['50%', '75%'], []);

    const handleClosePress = () => bottomSheetRef.current?.close();

    const handleOpenPress = () => bottomSheetRef.current?.snapToIndex(0);
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
      console.log('handleSheetChanges', index);
    }, []);
    // renders
    return (
      <>
        <Button title='open' onPress={handleOpenPress}/>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          handleIndicatorStyle={{backgroundColor: 'white'}}
          handleStyle={{backgroundColor: 'black'}}
          enablePanDownToClose={true}
        >
          <BottomSheetView
          style={styles.contentContainer}>
            <Text style={{color: 'white', fontSize: 23}}>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheet>
      </>
    );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
