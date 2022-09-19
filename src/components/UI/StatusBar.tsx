import React from 'react';
import { View, StatusBar, StatusBarProps, Platform } from 'react-native';

interface Props extends StatusBarProps {
  background?: string
}

function Status({ background = '#FFFFFF', ...props }: Props) {

  const HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  return (
    <View style={{ backgroundColor: background, height: HEIGHT }}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={background}
        translucent {...props}
      />
    </View>
  )
}

export { Status }