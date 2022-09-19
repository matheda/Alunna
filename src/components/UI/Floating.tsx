import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../themes';

interface Props extends TouchableOpacityProps { }

function Floating({ children, ...props }: Props) {
  return (
    <TouchableOpacity activeOpacity={1.0} {...props}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colors.purpleGradient}
        style={{
          width: 54,
          height: 54,
          borderRadius: 27,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          margin: 24,
          bottom: 0,
          right: 0
        }}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  )
}

export { Floating }