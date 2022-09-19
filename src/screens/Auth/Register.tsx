import React from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
  View,
  Dimensions
} from 'react-native';

import { RegisterForm } from '../../components/Account/RegisterForm';
import { colors } from '../../themes';

const Register: React.FC = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.purple} barStyle='light-content' />

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
          <RegisterForm />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </>
  )
}

export { Register }