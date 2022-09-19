import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { NavigationProps } from '../../services/types';
import { colors } from '../../themes';
import Video from 'react-native-video';

interface Props {
  source: string,
  avatar: string,
  username: string,
  description: string
}

type MediaType = 'Video' | 'Image';

function PostMediaPreview(viewer: Props) {

  const navigation = useNavigation<NavigationProps>();

  const mediaType: MediaType = viewer.source.endsWith('mp4') ? 'Video' : 'Image';

  function goToMedia() {
    navigation.navigate('Media', {
      media: viewer.source,
      username: viewer.username,
      avatar: viewer.avatar,
      description: viewer.description
    })
  }

  return (
    <View style={{ marginBottom: 12 }}>
      <TouchableOpacity onPress={goToMedia} activeOpacity={0.85}>
        {mediaType === 'Image' ? (
          <Image
            source={{ uri: viewer.source }}
            style={{ aspectRatio: 4 / 5, backgroundColor: colors.purpleThick, borderRadius: 12 }}
          />
        ) : (
          <Video
            source={{ 'uri': viewer.source }}
            style={{ aspectRatio: 4 / 5, backgroundColor: colors.purpleThick, borderRadius: 12 }}
            playWhenInactive={false}
            paused={true}
            muted={true}
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

export { PostMediaPreview }