import React from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import { ProfileForm } from '../../components/Account/ProfileForm';

import { useNavigation } from '@react-navigation/native';
import { Menu } from '../../components/Header/Menu';
import { Status } from '../../components/UI/StatusBar';
import { colors } from '../../themes';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationProps } from '../../services/types';

const EditProfile: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();

  function onBack() {
    navigation.canGoBack() ? navigation.goBack() : navigation.navigate('Dashboard')
  }

  return (
    <>
      <Status />

      <Menu title='Your Profile' onBack={onBack} />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={{ flex: 1, backgroundColor: colors.alpha }}
      >
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ProfileForm />
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  )
}

export { EditProfile }