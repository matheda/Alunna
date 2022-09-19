import React from 'react';
import { View, Text } from 'react-native';

import { colors } from '../../themes';

import { Like } from '../PostComposer/Like';
import { h4, paragraph } from '../../constants/alunnaStyle';
import { atFormatter } from '../../utils';

interface Props {
  id: number,
  name?: string,
  username?: string,
  createdAt?: Date | string,
  description?: string,
  isLiked?: boolean,
  isVerified?: boolean,
  likesCount?: number,
  guide?: 'H' | 'V'
};

function Author(viewer: Props) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

      <View style={{ flex: 1 }}>
        <Text>
          <Text style={{ ...h4, fontWeight: '700' }}>{viewer.name} </Text>
          <Text style={{ ...paragraph, color: colors.teal }}>{viewer.username}</Text>
        </Text>

        {viewer.guide === 'H' && (
          <Text style={{ ...paragraph, marginTop: -3, color: colors.teal }}>{atFormatter(viewer.createdAt)}</Text>
        )}

        {viewer.guide === 'V' && (
          <Text style={{ ...paragraph, color: colors.teal }}>
            Lunar Space Explorer ⸱ {atFormatter(viewer.createdAt)}
          </Text>
        )}
      </View>

      <Like
        id={viewer.id}
        likesCount={viewer.likesCount ?? 0}
        isLiked={viewer.isLiked ?? false}
      />

    </View>
  );
};

export { Author };
