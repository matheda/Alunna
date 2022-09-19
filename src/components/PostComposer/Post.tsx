import React from 'react';
import { TouchableHighlight, View, ImageBackground, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { TextParser } from './TextParser';
import { Like } from './Like';
import { SingleUser } from '../Avatar/SingleUser';

import { useItsMe } from '../../hooks/useItsMe';

import { NavigationProps } from '../../services/types';
import { h4, paragraph } from '../../constants/alunnaStyle';
import { Verified } from '../../sources';
import { colors } from '../../themes';
import { atFormatter } from '../../utils';

interface Props {
  id: number,
  name?: string,
  username?: string,
  avatar?: string,
  isVerified?: boolean,
  isLiked?: boolean,
  description?: string,
  media?: string,
  createdAt?: Date | string,
  likesCount?: number
};

function Post(viewer: Props) {

  const navigation = useNavigation<NavigationProps>();

  function onPress() {
    navigation.navigate('Publication', { id: viewer.id, name: viewer.name });
  };

  async function goToUser() {
    await useItsMe({ match: viewer.username ?? '' }) ?
      navigation.navigate('Me') :
      navigation.navigate('Profile', { username: viewer.username ?? '' });
  }

  const isImage = viewer.media ? colors.alpha : colors.beta;
  const isImageTeal = viewer.media ? colors.alpha : colors.teal;

  const styleToggle = viewer.media ? { padding: 6 } : {}
  const fontStyleToggle = viewer.media ? {
    textShadowRadius: 1,
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: 'rgba(0, 0, 0, 0.35)'
  } : {}

  return (
    <TouchableHighlight
      onPress={onPress}
      underlayColor={colors.echoThick}
      style={{ ...styleToggle, borderBottomWidth: 0.7, borderColor: colors.echo }}
    >
      <ImageBackground
        source={{ uri: viewer.media ?? '' }}
        imageStyle={{ borderRadius: 16 }}
        resizeMode='cover'
        style={{
          paddingVertical: 12,
          paddingHorizontal: 18,
          borderRadius: 16,

          aspectRatio: viewer.media ? 1 / 1 : undefined,
          justifyContent: 'space-between',
          backgroundColor: viewer.media ? '#020102' : 'transparent'
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

          <View>
            <SingleUser size={40} source={viewer.avatar} onPress={goToUser} />
            {viewer.isVerified && (
              <View style={{
                padding: 1.7,
                backgroundColor: colors.alpha,
                position: 'absolute',
                bottom: 0,
                right: 0,
                borderRadius: 17,
                margin: -2
              }}>
                <Verified size={13} />
              </View>
            )}
          </View>

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text>
              <Text style={{ ...h4, fontWeight: '700', color: isImage }}>{viewer.name} </Text>
              <Text style={{ ...paragraph, color: isImageTeal }}>{viewer.username}</Text>
            </Text>

            <Text style={{ ...paragraph, marginTop: -3, color: isImageTeal }}>
              {atFormatter(viewer.createdAt)}
            </Text>
          </View>

          <Like
            id={viewer.id}
            color={isImageTeal}
            likesCount={viewer.likesCount ?? 0}
            isLiked={viewer.isLiked ?? false}
          />

        </View>

        <TextParser
          style={{ ...h4, color: isImage, paddingTop: 8, ...fontStyleToggle }}
          children={viewer.description}
        />
      </ImageBackground>
    </TouchableHighlight>
  )
};

export { Post }