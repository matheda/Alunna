import React from 'react';
import { TouchableHighlight, Text, TouchableHighlightProps } from 'react-native';
import { colors } from '../../themes';

import { paragraph } from '../../constants/alunnaStyle';

interface Props extends TouchableHighlightProps {
  label: string
}

function Button({ label, ...props }: Props) {
  return (
    <TouchableHighlight
      style={{
        borderWidth: 0.7,
        borderColor: colors.echo,
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 16,
        alignItems: 'center'
      }}
      delayPressIn={0}
      underlayColor={colors.echoThick}
      {...props}
    >
      <Text style={{ ...paragraph, color: '#000000', fontWeight: '600' }}>
        {label}
      </Text>
    </TouchableHighlight>
  )
}
export { Button }