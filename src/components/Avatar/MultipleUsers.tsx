import React from 'react';
import { View } from 'react-native';
import { colors } from '../../themes';

interface Props {
  sources?: string[]
};

function MultipleUsers({ sources = ['A', 'L', 'W', 'A', 'X'] }: Props) {

  const slicedArray = sources.slice(0, 4);

  return (
    <View style={{ flexDirection: 'row' }}>

      {slicedArray.map((url, index) => (
        <View
          key={url + index}
          style={{ zIndex: slicedArray.length - 1, overflow: 'hidden', marginLeft: index > 0 ? -6 : 0 }}
        >
          <View style={{
            width: 28,
            height: 28,
            backgroundColor: colors.purpleThick,
            borderRadius: 28 / 2,
            borderWidth: 1.5,
            borderColor: colors.alpha,
            justifyContent: 'center',
            alignItems: 'center'
          }} />
        </View>
      ))}
    </View>
  )
};

export { MultipleUsers }