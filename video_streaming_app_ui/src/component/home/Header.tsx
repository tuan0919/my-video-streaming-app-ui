import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {AppLogo} from '../index.ts';

export default function Header(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <TouchableOpacity>
          <AppLogo />
        </TouchableOpacity>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <IconAntDesign style={styles.icon} name="plussquareo" />;
        </TouchableOpacity>
        <TouchableOpacity>
          <IconAntDesign style={styles.icon} name="hearto" />;
        </TouchableOpacity>
        <TouchableOpacity style={{position: 'relative'}}>
          <IconIonicons style={styles.icon} name="notifications-outline"/>
          <View style={styles.unreadBadget}>
            <Text style={styles.badgetText}>9+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },

  iconsContainer: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  icon: {
    color: 'white',
    fontSize: 30,
  },

  unreadBadget: {
    top: -5,
    left: 15,
    backgroundColor: '#ff3f3f',
    position: 'absolute',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgetText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  }

});
