import React from 'react';
import { View } from 'react-native';
import { colors } from '../../themes';
import { SingleUser } from '../Avatar/SingleUser';
import { MultipleUsers } from '../Avatar/MultipleUsers';

interface Props {
  source?: string,
  howMany?: number
}

function PostAndAvatar({ source, howMany = 0 }: Props) {
  return (
    <View style={{
      alignItems: 'flex-end'
    }}>
      <View style={{ position: 'absolute', zIndex: 1 }}>
        {howMany === 0 ? <SingleUser size={26} source={source} /> : <MultipleUsers />}
      </View>
      <View style={{
        marginRight: 8,
        borderRadius: 14,
        width: 47.8,
        height: 47.8,
        borderColor: colors.purpleThick,
        borderWidth: 0.7
      }} />
    </View>
  )
}

export { PostAndAvatar }