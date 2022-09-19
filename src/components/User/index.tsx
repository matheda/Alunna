import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  Linking
} from 'react-native';

import { SingleUser } from '../Avatar/SingleUser';
import { TextParser } from '../PostComposer/TextParser';
import { nFormatter } from '../../utils';

import { Verified, More, Location } from '../../sources';
import { h4, paragraph, small } from '../../constants/alunnaStyle';
import { colors } from '../../themes';

interface Props {
  name?: string,
  username?: string,
  avatar?: string,
  header?: string,
  bio?: string,
  link?: string,
  location?: string,
  isVerified?: boolean,
  followingCount?: number,
  followersCount?: number,
  postsCount?: number,
  onMore?(): void
};

function UserPreview({
  name,
  username,
  avatar = '',
  header,
  bio,
  link,
  location,
  isVerified,
  onMore,
  followersCount = 0,
  followingCount = 0,
  postsCount = 0
}: Props) {

  function goToLink() {
    const url = String(link);
    Linking.canOpenURL(url).then((supported) => {
      supported ? Linking.openURL(url) : Linking.openURL('https://' + url);
    })
  }

  function renderItem(name: string, value: any) {
    return (
      <View style={{ flex: 1, maxWidth: '30%' }}>
        <TouchableHighlight
          style={{ marginHorizontal: 3, alignItems: 'center', paddingVertical: 4, borderRadius: 8 }}
          onPress={() => null}
          underlayColor={colors.purpleThick}
        >
          <>
            <Text style={{ ...h4, fontWeight: '700' }}>{nFormatter(value)}</Text>
            <Text style={{ ...small, color: colors.teal }}>{name}</Text>
          </>
        </TouchableHighlight>
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: colors.alpha }}>

      <TouchableHighlight
        onPress={() => null}
        activeOpacity={0.8}
      >
        {header ? (
          <Image style={{ aspectRatio: 2.57 }} source={{ uri: header }} />
        ) : (
          <View style={{ aspectRatio: 2.57, backgroundColor: colors.purpleThick }} />
        )}
      </TouchableHighlight>

      <View style={{ marginTop: -41, alignItems: 'center' }}>

        <View style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 41,
          position: 'absolute'
        }}>

          <View style={{ padding: 12 }}>
            {isVerified ? <Verified /> : <View />}
          </View>

          <TouchableOpacity
            delayPressIn={0}
            onPress={onMore}
            style={{ padding: 12 }}
            activeOpacity={1.0}
          >
            <More color={colors.teal} />
          </TouchableOpacity>
        </View>

        <View style={{ backgroundColor: colors.alpha, padding: 3.5, borderRadius: 95 }}>
          <SingleUser source={avatar} disabled={true} size={89} />
        </View>

      </View>

      <View style={{
        paddingHorizontal: 12,
        paddingBottom: 12,
        borderBottomWidth: 0.7,
        borderBottomColor: colors.echo
      }}>

        <View style={{
          paddingHorizontal: 20,
          alignItems: 'center'
        }}>

          <Text
            style={{ ...h4, color: colors.beta, fontWeight: '700' }}
            numberOfLines={2}
            ellipsizeMode='tail'
          >
            {name}
          </Text>

          <Text style={{ marginTop: 1 }}>
            <Text style={{ ...small, color: colors.teal, marginRight: 0.5 }}>
              {username ? '@' : ''}
            </Text>
            <Text style={{ ...paragraph, color: colors.teal }}>{username}</Text>
          </Text>

        </View>

        {bio ? (
          <TextParser
            children={bio}
            style={{ ...paragraph, paddingVertical: 6, paddingHorizontal: 12, textAlign: 'center' }}
          />
        ) : null}

        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 6
        }}>

          {location ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Location />
              <Text
                style={{ marginLeft: 3, textAlign: 'right', color: colors.teal }}
                ellipsizeMode='tail'
                numberOfLines={1}
              >
                {location}
              </Text>
            </View>
          ) : null}

          {(location && link) ? (
            <View style={{ backgroundColor: colors.echo, marginHorizontal: 12, width: 1, height: 13 }} />
          ) : null}

          {link ? (
            <TouchableHighlight
              underlayColor={colors.purpleThick}
              onPress={goToLink}
              style={{ backgroundColor: colors.echoThick, paddingVertical: 2, borderRadius: 4, paddingHorizontal: 6 }}
            >
              <Text style={{ color: colors.teal, lineHeight: 16 }} numberOfLines={1}>
                {link.length > 26 ? link.substring(0, 26) + '...' : link}
              </Text>
            </TouchableHighlight>
          ) : null}

        </View>

        <View style={{
          paddingTop: (location || link) ? 8 : 6,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>

          {renderItem('Posts', postsCount)}
          {renderItem('Followers', followersCount)}
          {renderItem('Following', followingCount)}

        </View>

      </View>

    </View>
  )
};

export { UserPreview }
