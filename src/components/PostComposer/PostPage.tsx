import React from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SingleUser } from '../Avatar/SingleUser';
import { Author } from '../User/Author';
import { TextParser } from './TextParser';
import { useItsMe } from '../../hooks/useItsMe';
import { colors } from '../../themes';
import { h4, small } from '../../constants/alunnaStyle';
import { NavigationProps } from '../../services/types';
import { MultipleUsers } from '../Avatar/MultipleUsers';
import { PostMediaPreview } from './PostMediaPreview';

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

function PostPage(viewer: Props) {

  const navigation = useNavigation<NavigationProps>();

  const goToUser = async () => {
    await useItsMe({ match: viewer.username ?? '' }) ?
      navigation.navigate('Me') :
      navigation.navigate('Profile', { username: viewer.username ?? '' });
  }

  return (
    <>
      <View style={{ paddingTop: 12, paddingHorizontal: 18 }}>

        <View style={{ flexDirection: 'row' }}>
          <SingleUser size={40} source={viewer.avatar} onPress={goToUser} />

          <View style={{ flex: 1, marginLeft: 10 }}>
            <Author
              guide='V'
              id={viewer.id}
              name={viewer.name}
              isVerified={viewer.isVerified}
              isLiked={viewer.isLiked ?? false}
              likesCount={viewer.likesCount ?? 0}
              createdAt={viewer.createdAt}
            />
          </View>
        </View>

        <TextParser
          accessible
          accessibilityRole='text'
          children={viewer.description}
          style={{ ...h4, paddingVertical: 12 }}
          selectable={true}
          selectionColor={colors.purpleThick}
        />

        {viewer.media ? (
          <PostMediaPreview
            source={viewer.media}
            description={viewer.description ?? ''}
            username={viewer.username ?? ''}
            avatar={viewer.avatar ?? ''}
          />
        ) : null}

      </View>

      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 12,
        borderWidth: 0.7,
        borderTopWidth: 0,
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
        borderColor: colors.echo
      }}>

        <View style={{ padding: 6, borderRadius: 12, backgroundColor: colors.purpleThick }}>
          <Text style={{ fontSize: 12, lineHeight: 12, color: colors.teal, fontWeight: '600' }}>@</Text>
        </View>

        <Text style={{ ...small, color: colors.teal, marginLeft: 5, marginRight: 'auto' }}>
          {viewer.username}
        </Text>

        <MultipleUsers />

        <View style={{
          width: 26,
          height: 26,
          borderRadius: 13,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.purpleThick,
          marginLeft: 10
        }}>
          <Text style={{ ...small, color: colors.teal }}>0</Text>
        </View>

      </View>
    </>
  )
};

export { PostPage }
