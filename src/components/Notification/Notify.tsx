import React from 'react';
import { View, Text, TouchableHighlight, TouchableHighlightProps } from 'react-native';

import { SingleUser } from '../Avatar/SingleUser';
import { colors } from '../../themes';
import { h4, small, paragraph } from '../../constants/alunnaStyle';
import { PostAndAvatar } from './PostAndAvatar';

interface Props extends TouchableHighlightProps {
  id?: string,
  type: 'Likes' | 'Reply' | 'Follow',
  username?: string,
  createdAt?: Date | string
}

function Notify({ type, children, createdAt, ...props }: Props) {
  return (
    <TouchableHighlight
      style={{
        paddingHorizontal: 24,
        paddingVertical: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      underlayColor={colors.echoThick}
      delayPressIn={0}
      onPress={() => null}
      {...props}
    >
      <>

        {type == 'Follow' ? <SingleUser source='' size={47.8} /> : <PostAndAvatar />}

        <View style={{ flex: 1, marginLeft: 10 }}>

          <Text style={{ ...h4, fontWeight: '700' }}>
            Alunna
          </Text>

          <Text style={{ ...paragraph, color: colors.teal }}>
            {type === 'Follow' && 'Started following you'}
            {type === 'Likes' && 'Liked your post'}
            {type === 'Reply' && 'Liked your post'}
          </Text>

        </View>

        <Text style={{ ...small, color: colors.teal, marginTop: 6 }}>
          5 min ago
        </Text>

      </>
    </TouchableHighlight>
  );
}

export { Notify }