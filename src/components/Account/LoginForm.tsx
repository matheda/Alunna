import React from 'react';
import { Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from 'react-query';
import { SubmitHandler } from 'react-hook-form';
import { object, string } from 'zod';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useAuthUser } from '../../services/graphql/user';
import { LoginInput } from '../Form/Input';
import { useZodForm } from '../../hooks/context';

import { colors } from '../../themes';
import { paragraph } from '../../constants/alunnaStyle';
import { useTokenStore } from '../../services/useTokenStore';
import { LoginFormInput, NavigationProps } from '../../services/types';

import { usernameSchema } from '../../hooks/schemas';
import { ThrowError } from '../Errors/ThrowError';

const queryClient = useQueryClient();

const LoginSchema = object({
  username: usernameSchema,
  password: string().min(6)
})

function LoginForm() {

  const { mutate, isLoading } = useAuthUser();

  const form = useZodForm({
    schema: LoginSchema
  })

  const navigation = useNavigation<NavigationProps>();

  const { formState: { errors: { username, password } } } = form

  const onSubmit: SubmitHandler<LoginFormInput> = async ({ username, password }) => {
    if (username && password) {
      mutate({ username, password }, {
        onSuccess: async (data) => {
          await queryClient.setQueryData('me', data.login.user);
          useTokenStore.getState().setTokens({ accessToken: data.login.token })
          AsyncStorage.setItem('@storageUser', JSON.stringify(data.login.user));
        }
      })
    }
  }

  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>

      <LoginInput
        {...form.register('username')}
        label='Username'
        placeholder='Username...'
        onChangeText={(text: string) => form.setValue('username', text)}
        t='Top'
        returnKeyType='next'
      />

      {username?.message && <ThrowError label={username?.message} />}

      <LoginInput
        {...form.register('password')}
        label='Password'
        placeholder='Password...'
        t='Bot'
        isSecret={true}
        onChangeText={(text: string) => form.setValue('password', text)}

        returnKeyType='done'
      />

      {password?.message && <ThrowError label={password?.message} />}

      <TouchableOpacity
        onPress={form.handleSubmit(onSubmit)}
        activeOpacity={0.8}
        style={{ marginTop: 20 }}
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
          {isLoading ? (
            <ActivityIndicator size={18} color='#F0F0F0' />
          ) : (
            <Text style={{ ...paragraph, color: colors.alpha, fontWeight: '600' }}>
              Sign in
            </Text>
          )}
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          paddingVertical: 24,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        activeOpacity={1.0}
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={{ ...paragraph, color: colors.alpha }}>
          Need an account? Sign up
        </Text>
      </TouchableOpacity>

    </View>
  )
}

export { LoginForm }
