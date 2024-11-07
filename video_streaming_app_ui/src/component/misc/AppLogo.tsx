import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function AppLogo(): React.JSX.Element {
  return (
    <View>
      <Text>
        <>
          <Text style={styles.boldText}>Nông Lâm 🌿</Text>
          <Text style={styles.normalText}> Video App</Text>
        </>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  normalText: {
    color: 'white',
    fontWeight: 'semibold',
    fontSize: 20,
  },
  boldText: {
    color: '#25ca00',
    fontWeight: 'bold',
    fontSize: 15
  },
});
