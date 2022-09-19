import React from 'react';

import { FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useGetUsers } from '../../services/graphql/useRequest';
import { useItsMe } from '../useItsMe';

import { ProfileCard } from '../../components/User/ProfileCard';
import { NavigationProps, TUser } from '../../services/types';
import { hasWhiteSpace } from '../../utils';

interface Props {
  value: string
}

const Users = ({ value }: Props) => {

  const navigation = useNavigation<NavigationProps>();

  if (value.length < 3) return null
  if (hasWhiteSpace(value)) return null

  const { data, isLoading, isError, isLoadingError } = useGetUsers(value.replace('@', ''));

  if (isLoading) return null
  if (isError) return null
  if (isLoadingError) return null

  async function onPress(username: string) {
    await useItsMe({ match: username }) ?
      navigation.navigate('Me') :
      navigation.navigate('Profile', { username: username });
  }

  const renderItem = ({ item }: { item: TUser }) => (
    <ProfileCard
      username={item.username}
      name={item.name}
      avatar={item.avatar}
      isVerified={item.isVerified}
      onPress={() => onPress(item.username)}
    />
  )

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(item, index) => String(item.username + index)}
        renderItem={renderItem}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
      />
    </SafeAreaView>
  )
}

export { Users }