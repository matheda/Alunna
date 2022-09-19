import React from 'react';
import { View, Image, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { colors } from '../../themes';

interface Props extends TouchableOpacityProps {
  source?: string,
  size?: number
};

function SingleUser({ source, size = 24, ...props }: Props) {
  return (
    <TouchableOpacity activeOpacity={1.0} {...props}>
      {source ? (
        <Image
          source={{ uri: source }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
        />
      ) : (
        <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: colors.purpleThick }} />
      )}
    </TouchableOpacity>
  )
};

export { SingleUser }