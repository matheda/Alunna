import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  View,
  StatusBar,
  Dimensions
} from 'react-native';

import { LoginForm } from '../../components/Account/LoginForm';
import { colors } from '../../themes';

const Login: React.FC = () => {
  return (
    <>
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={{ flex: 1, backgroundColor: colors.beta }}
      >
        <View style={{
          flex: 1,
          maxHeight: Dimensions.get('window').height * 0.3,
          backgroundColor: colors.purple,
          marginBottom: 'auto'
        }} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <LoginForm />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  )
}

export { Login }