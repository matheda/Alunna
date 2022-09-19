import React from 'react';
import { View, Platform, ToastAndroid, Alert, Text } from 'react-native';
import { object } from 'zod';

import { useUpdateUser } from '../../services/graphql/user';
import { useGetMe } from '../../services/graphql/useRequest';
import { useZodForm } from '../../hooks/context';

import { SingleUser } from '../Avatar/SingleUser';
import { Button } from '../Form/Button';
import { Input } from '../Form/Input';
import { SubmitHandler } from 'react-hook-form';

import {
  avatarSchema,
  bioSchema,
  birthdaySchema,
  linkSchema,
  locationSchema,
  nameSchema
} from '../../hooks/schemas';
import { EditProfileInput } from '../../services/types';

const EditProfileSchema = object({
  name: nameSchema,
  bio: bioSchema,
  location: locationSchema,
  link: linkSchema,
  birthday: birthdaySchema,
  avatar: avatarSchema
})

function ProfileForm() {

  const { data } = useGetMe();

  const form = useZodForm({
    schema: EditProfileSchema.partial(),
  })

  React.useEffect(() => {
    if (!data) return;

    form.reset({
      name: data?.name,
      location: data?.location,
      bio: data?.bio,
      link: data?.link,
      avatar: data?.avatar,
      birthday: '00/00/0000'
    });
  }, [data])

  const { mutate } = useUpdateUser();

  const onSubmit: SubmitHandler<EditProfileInput> = ({ ...i }) => {
    Alert.alert(
      'Change your Profile?', '',
      [{ text: 'Cancel', style: 'cancel' }, {
        text: 'Save Profile', onPress: async () => {
          await mutate({ ...i })

          Platform.OS == 'android' && ToastAndroid.showWithGravity(
            'Your changes have been saved',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM
          )
        }
      }],
      { cancelable: true }
    )
  };

  return (
    <View style={{ flex: 1 }}>

      <View style={{ paddingBottom: 24, alignItems: 'center' }}>
        <SingleUser source={data?.avatar} disabled={true} size={89} />
      </View>

      <Input
        {...form.register('name')}
        label='Name'
        defaultValue={form.getValues()?.name}

        onChangeText={(text) => form.setValue('name', text)}
      />

      <Input
        {...form.register('birthday', { valueAsDate: true })}
        label='Birthday'
        defaultValue={form.getValues()?.birthday}
        keyboardType='numeric'

        onChangeText={(text) => form.setValue('birthday', text)}
      />

      <Input
        {...form.register('location')}
        label='Location'
        defaultValue={form.getValues()?.location}

        onChangeText={(text) => form.setValue('location', text)}
      />

      <Input
        {...form.register('avatar')}
        label='Avatar URL'
        multiline
        defaultValue={form.getValues()?.avatar}

        onChangeText={(text) => form.setValue('avatar', text)}
      />

      <Input
        {...form.register('link')}
        label='Website'
        defaultValue={form.getValues()?.link}

        onChangeText={(text) => form.setValue('link', text)}
      />

      <Input
        {...form.register('bio')}
        label='Bio'
        multiline
        defaultValue={form.getValues()?.bio}

        onChangeText={(text) => form.setValue('bio', text)}
      />

      <View style={{ padding: 20 }}>
        <Button
          label='Update'
          onPress={form.handleSubmit(onSubmit)}
        />
      </View>

    </View>
  )
}

export { ProfileForm }