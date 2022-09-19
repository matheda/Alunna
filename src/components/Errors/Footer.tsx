import React from 'react';
import { Text, View } from 'react-native';
import { h3, paragraph } from '../../constants/alunnaStyle';

interface Props {
  title?: string,
  text?: string
}

function Footer({ text, title }: Props) {

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
      paddingVertical: 64
    }}>

      <Text style={{ ...h3, textAlign: 'center', fontWeight: '600' }}>
        {title}
      </Text>

      <Text style={{ ...paragraph, color: '#6B7280', marginTop: 6, textAlign: 'center' }}>
        {text}
      </Text>

    </View>
  )
}

export { Footer }