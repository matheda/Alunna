import React from 'react';
import { View, TouchableOpacity } from 'react-native';

interface Props {
  onPress?(): void,
  size?: number,
  children?: React.ReactNode
}

function Button({ size = 48, onPress, children }: Props) {
  return (
    <TouchableOpacity
      style={{ width: size, height: size, padding: 8 }}
      onPress={onPress}
    >
      <View style={{
        padding: 8,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: children ? 'rgba(0, 0, 0, 0.03)' : 'transparent',
        borderRadius: 12
      }}>
        {children}
      </View>
    </TouchableOpacity>
  )
}

export { Button }