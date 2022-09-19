import React from 'react';
import { TouchableHighlight, TouchableHighlightProps, View, Text } from 'react-native';
import { h4, small, xsmall } from '../../constants/alunnaStyle';
import { colors } from '../../themes';
import { SingleUser } from '../Avatar/SingleUser';

import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../services/types';

interface Props extends TouchableHighlightProps { }

function MessageCard({ ...props }: Props) {

  const navigation = useNavigation<NavigationProps>();

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
      activeOpacity={1.0}
      onPress={() => navigation.navigate('Conversation')}
      {...props}
    >
      <>
        <View style={{
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>

          <SingleUser size={58} />

          <Text style={{
            ...xsmall,
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 12,

            position: 'absolute',
            color: colors.beta,
            borderWidth: 0.7,
            backgroundColor: colors.alpha,
            borderColor: colors.purpleThick
          }}
            numberOfLines={1}
          >
            Ok
          </Text>

        </View>

        <View style={{ flex: 1, marginHorizontal: 10 }}>

          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{ ...h4, fontWeight: '700' }}
          >
            Alunna
          </Text>

          <Text
            numberOfLines={1}
            ellipsizeMode='tail'
            style={{ ...small, color: colors.teal }}
          >
            Sounds good!
          </Text>

        </View>

        <Text style={{ ...small, color: colors.teal, marginLeft: 10 }}>
          5 min ago
        </Text>
      </>
    </TouchableHighlight>
  )
}

export { MessageCard }