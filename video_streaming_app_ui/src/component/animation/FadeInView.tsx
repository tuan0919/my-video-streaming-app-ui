import { View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import React from 'react';

type FadeViewProps = {
    children: React.ReactNode;
    className?: string;
};

export default function FadeView({ children }: FadeViewProps) : React.JSX.Element {
    return (
      <View>
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
        >
          {children}
        </Animated.View>
      </View>
    );
}
