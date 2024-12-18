import {Image, ImageStyle, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { KeyboardAvoidingView } from 'react-native';
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
  const { thumbnail : param } = route.params || {};
  const [thumbnail, setThumbnail] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (param) {
      setThumbnail(param);
    }
  }, [param]);
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
                  placeholder="Nhập tiêu đề video"
                  placeholderTextColor={'white'} />
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
                placeholderTextColor={'white'}
                label={<Text style={{color: 'white', fontWeight: 'bold'}}>Mô tả video</Text>}
              />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
        <View style={{width: '100%', flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
          style={[{
              width: '80%',
              backgroundColor: '#73EC8B',
              paddingVertical: 10,
              alignItems: 'center',
              borderRadius: 10,
              borderWidth: 2,
              borderColor: 'green',
              marginVertical: 20,
            }]}
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
