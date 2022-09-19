import React from 'react';
import { Platform, KeyboardAvoidingView, TouchableOpacity, Text, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../themes';

import { NavigationProps } from '../services/types';
import { paragraph } from '../constants/alunnaStyle';
import LinearGradient from 'react-native-linear-gradient';

const Welcome: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();

  return (
    <>
      <StatusBar translucent backgroundColor='transparent' barStyle='light-content' />

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={{ flex: 1, backgroundColor: colors.beta }}
      >

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.8}
          style={{ margin: 24, marginTop: 'auto' }}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={colors.purpleGradient}
            style={{
              paddingVertical: 18,
              paddingHorizontal: 32,
              borderRadius: 16,
              alignItems: 'center'
            }}
          >
            <Text style={{ ...paragraph, color: '#F0F0F0', fontWeight: '600' }}>
              Get Started
            </Text>
          </LinearGradient>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </>
  )
}

export { Welcome }