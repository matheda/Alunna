import React from 'react';
import { View, Text, TouchableHighlight, TouchableHighlightProps } from 'react-native';

import { SingleUser } from '../Avatar/SingleUser';

import { Verified } from '../../sources';
import { colors } from '../../themes';
import { h4, paragraph, small } from '../../constants/alunnaStyle';

interface Props extends TouchableHighlightProps {
  username: string,
  name: string,
  avatar: string,
  isVerified: boolean
}

function ProfileCard({ username, name, avatar, isVerified = false, ...props }: Props) {
  return (
    <TouchableHighlight
      style={{
        flex: 1,
        maxWidth: '33.33%',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 18,

        marginHorizontal: 4,

        borderWidth: 0.7,
        borderColor: colors.echoThick,
        borderRadius: 12,
        backgroundColor: colors.alpha
      }}
      underlayColor={colors.echoThick}
      {...props}
    >
      <>
        <View style={{
          justifyContent: 'flex-end',
          alignItems: 'flex-end'
        }}>

          <SingleUser source={avatar} size={64} disabled={true} />

          <View style={{
            padding: 3,
            borderRadius: 11,
            position: 'absolute',
            backgroundColor: colors.alpha
          }}>
            {isVerified && <Verified size={15} />}
          </View>

        </View>

        <View style={{ alignItems: 'center', marginTop: 4 }}>

          <Text
            style={{ ...h4, fontWeight: '700' }}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {name}
          </Text>

          <Text style={{ marginTop: 1 }}>
            <Text style={{ ...small, color: colors.teal, marginRight: 0.5 }}>@</Text>
            <Text style={{ ...paragraph, color: colors.teal }}>{username}</Text>
          </Text>

        </View>
      </>
    </TouchableHighlight>
  )
}

export { ProfileCard }