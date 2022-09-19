import React from 'react';
import { KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useGetMe } from '../../services/graphql/useRequest';

import { Menu } from '../../components/Header/Menu';
import { Status } from '../../components/UI/StatusBar';
import { SingleUser } from '../../components/Avatar/SingleUser';

import { colors } from '../../themes';
import { PostInputAndUploader } from '../../components/Creator/PostInputAndUploader';
import { NavigationProps } from '../../services/types';

const Draft: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();
  const { data } = useGetMe();

  return (
    <>
      <Status />

      <Menu onBack={() => navigation.goBack()}>
        <SingleUser source={data?.avatar} disabled={true} size={24} />
      </Menu>

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={{ flex: 1, backgroundColor: colors.alpha }}
      >
        <TouchableWithoutFeedback
          style={{ flex: 1 }}
          onPress={Keyboard.dismiss}
        >
          <PostInputAndUploader />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  );
};

export { Draft };
