import React from 'react';
import { ActivityIndicator, Linking, Text, TouchableOpacity, View } from 'react-native';
import { SubmitHandler } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import { LoginInput } from '../Form/Input';
import { useZodForm } from '../../hooks/context';

import { colors } from '../../themes';
import { paragraph } from '../../constants/alunnaStyle';
import { object } from 'zod';
import { NavigationProps, RegisterFormInput } from '../../services/types';

import { emailSchema, usernameSchema, passwordSchema } from '../../hooks/schemas';
import { ThrowError } from '../Errors/ThrowError';
import { useSignupUser } from '../../services/graphql/user';
import { Dispose } from '../UI/Dispose';

const RegisterSchema = object({
  username: usernameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirm: passwordSchema,
}).refine((data) => data.password === data.confirm, {
  message: 'Passwords do not match',
  path: ['confirm']
})

function RegisterForm() {

  const { mutate, isLoading } = useSignupUser();

  const form = useZodForm({
    schema: RegisterSchema
  })

  const navigation = useNavigation<NavigationProps>();

  const { formState: { errors: { username, email, confirm, password } } } = form

  const onSubmit: SubmitHandler<RegisterFormInput> = async ({ ...i }) => {
    if (i.username && i.password && i.email) {
      mutate({
        username: i.username,
        email: i.email,
        name: i.username,
        password: i.password
      }, { onSuccess: () => navigation.navigate('Login') })
    }
  }

  return (
    <View style={{ paddingHorizontal: 24, paddingTop: 24 }}>

      <LoginInput
        {...form.register('username')}
        label='Username'
        t='Top'
        onChangeText={(text: string) => form.setValue('username', text)}
        placeholder='Username...'

        returnKeyType='next'
      />

      {username?.message && <ThrowError label={username?.message} />}

      <LoginInput
        {...form.register('email')}
        label='Email address'
        t='Mid'
        placeholder='Email address...'
        onChangeText={(text: string) => form.setValue('email', text)}

        returnKeyType='next'
      />

      {email?.message && <ThrowError label={email?.message} />}

      <LoginInput
        {...form.register('password')}
        label='Password'
        t='Mid'
        isSecret={true}
        placeholder='Password...'
        onChangeText={(text: string) => form.setValue('password', text)}

        returnKeyType='done'
      />

      {password?.message && <ThrowError label={password?.message} />}

      <LoginInput
        {...form.register('confirm')}
        label='Verify Password'
        t='Bot'
        placeholder='Verify Password...'
        isSecret={true}
        onChangeText={(text: string) => form.setValue('confirm', text)}

        returnKeyType='done'
      />

      {confirm?.message && <ThrowError label={confirm?.message} />}

      <View style={{ flexDirection: 'row', marginTop: 20 }}>

        <Dispose color='#F0F0F0' />

        <TouchableOpacity
          onPress={form.handleSubmit(onSubmit)}
          activeOpacity={0.8}
          style={{ flex: 1, marginLeft: 16 }}
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
                Sign up
              </Text>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={{ paddingVertical: 24, alignItems: 'center', justifyContent: 'center' }}
        activeOpacity={1.0}
        onPress={() => Linking.openURL('https://alunna.me/legal/privacy')}
      >
        <Text style={{ ...paragraph, color: colors.teal }}>
          Privacy Policy
        </Text>
      </TouchableOpacity>

    </View>
  )
}

export { RegisterForm }
