import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigator from './TabNavigator.tsx';

export default function MainContainer () : React.JSX.Element {
  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>
  );
}
