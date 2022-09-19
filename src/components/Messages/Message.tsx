import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  id?: string | number,
  message?: string,
  createdAt?: Date | string,
  user?: {
    id: string,
    username: string,
    name: string,
    avatar: string
  },
  sent?: boolean,
  received?: boolean,
  pending?: boolean
}

function Message({ createdAt }: Props) {
  return (
    <View style={{
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 12
    }}>
      <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
      <Text>{createdAt}</Text>
    </View>
  )
}

export { Message }