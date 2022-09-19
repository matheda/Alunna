import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
  SafeAreaView
} from 'react-native';

import { Menu } from '../../components/Header/Menu';
import { Status } from '../../components/UI/StatusBar';
import { Message } from '../../components/Messages/Message';

import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '../../services/types';
import { SingleUser } from '../../components/Avatar/SingleUser';
import { colors } from '../../themes';
import { Input } from '../../components/UI/Input';

const Conversation: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();

  return (
    <>
      <Status />

      <Menu title='Alunna' onBack={() => navigation.goBack()}>
        <SingleUser source={''} />
      </Menu>

      <SafeAreaView style={{ flex: 1, backgroundColor: colors.echoThick }}>
        <KeyboardAvoidingView
          behavior={Platform.select({ ios: 'padding' })}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
              <Message />
              <Message />
              <Message />
              <Message />
              <Message />
            </>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <Input isLoading={false} source='' onLaunch={() => { }} />
      </SafeAreaView>
    </>
  )
}

export { Conversation }