import React from 'react';
import { View, Text, SafeAreaView, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { QueryCache } from 'react-query';
import SInfo from 'react-native-sensitive-info';

import { useGetMe } from '../../services/graphql/useRequest';

import { Status } from '../../components/UI/StatusBar';
import { Option } from '../../components/UI/Option';
import { SingleUser } from '../../components/Avatar/SingleUser';

import { Lock, Profile } from '../../sources';
import { colors } from '../../themes';
import { paragraph, small } from '../../constants/alunnaStyle';

import { useTokenStore } from '../../services/useTokenStore';
import { Menu } from '../../components/Header/Menu';
import { ChangeLog } from '../../components/Modal/ChangeLog';
import { NavigationProps } from '../../services/types';

const Dashboard: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();
  const [logModal, setLogModal] = React.useState(false);

  const { data } = useGetMe();
  const queryCache = new QueryCache();

  const setTokens = useTokenStore((s) => s.setTokens);

  async function onLogout() {
    setTokens({ accessToken: '' })
    queryCache.clear();

    await SInfo.deleteItem('@storage_key', {
      sharedPreferencesName: 'auth_alunna',
      keychainService: 'alunna'
    })
  }

  function onBack() {
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Me')
  }

  return (
    <>
      <Status />

      <Menu title='Dashboard' onBack={onBack} />

      <SafeAreaView style={{ flex: 1, backgroundColor: colors.alpha }}>

        <View style={{
          paddingVertical: 12,
          paddingHorizontal: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-end'
        }}>

          <SingleUser source={data?.avatar} disabled={true} size={89} />

          <Text>
            <Text style={{ ...small, color: colors.teal, marginRight: 0.5 }}>@</Text>
            <Text style={{ ...paragraph, color: colors.teal }}>{data?.username}</Text>
          </Text>

        </View>

        <Text style={{
          ...small,
          color: colors.purple,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderTopWidth: 0.7,
          borderColor: colors.echo
        }}>
          Account Settings
        </Text>

        <Option
          linked title={'Your Profile'}
          label={'Set up your Alunna presence'}
          onPress={() => navigation.navigate('EditProfile')}
        >
          <Profile />
        </Option>

        <Option title={'Privacy & Safety'} onPress={() => null} linked>
          {null}
        </Option>

        <Text style={{
          ...small,
          color: colors.purple,
          paddingVertical: 12,
          paddingHorizontal: 16,
          borderTopWidth: 0.7,
          borderColor: colors.echo
        }}>
          App Settings
        </Text>

        <Option title={'Appearance'} onPress={() => null}>
          <Lock />
        </Option>

        <Option title={'Languages'} onPress={() => null}>
          {null}
        </Option>

        <Option title={'Privacy Policy'} onPress={() => Linking.openURL('https://alunna.me/legal/privacy')}>
          {null}
        </Option>

        <Option
          title={'What\'s New'}
          label={'Read the latest Alunna patch notes'}
          onPress={() => setLogModal(!logModal)}
        >
          {null}
        </Option>

        <Option
          title={'Log Out'}
          label={`You are logged in as ${data?.username}`}
          onPress={onLogout}
        >
          {null}
        </Option>

        <ChangeLog isVisible={logModal} onBack={() => setLogModal(!logModal)} />

      </SafeAreaView>

    </>
  )
}

export { Dashboard }