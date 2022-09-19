import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../themes';
import { ArrowLeft, Verified } from '../../sources';
import { SingleUser } from '../Avatar/SingleUser';
import { paragraph } from '../../constants/alunnaStyle';
import { Follow } from '../User/Follow';
import { Button } from './Button';

interface Props {
  isAppearing: boolean,
  onBack?(): void,
  username?: string,
  avatar?: string,
  isVerified?: boolean,
  isFollowing?: boolean
};

function Parallax({
  isAppearing,
  username,
  avatar,
  isVerified = false,
  onBack,
  isFollowing
}: Props) {

  if (!isAppearing) return null

  return (
    <View style={{
      width: '100%',
      height: 48,
      zIndex: 1,
      position: 'absolute',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.alpha,
      borderBottomWidth: 0.7,
      borderBottomColor: colors.echo
    }}>
      <View style={{ flex: 1 }}>
        {onBack && <Button onPress={onBack}><ArrowLeft /></Button>}
      </View>

      <View style={{ flex: 0.8, alignItems: 'center', flexDirection: 'column' }}>
        <Text style={{ textAlign: 'center', ...paragraph, fontWeight: '500' }}>{username}</Text>
        {isVerified && <Verified size={13} />}
      </View>

      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        {onBack ? (
          <View style={{ paddingRight: 8 }}>
            <Follow isFollowing={isFollowing ?? false} username={username ?? ''} />
          </View>
        ) : (
          <Button>
            <SingleUser source={avatar} size={24} disabled={true} />
          </Button>
        )}
      </View>
    </View>
  )
};

export { Parallax }