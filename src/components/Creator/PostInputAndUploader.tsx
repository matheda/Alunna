import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SubmitHandler } from 'react-hook-form';
import { any, object } from 'zod';
import { format } from 'date-fns';

import { usePublish } from '../../services/graphql/post';

import { DraftFormInput, NavigationProps } from '../../services/types';
import { postTextSchema } from '../../hooks/schemas';
import { useZodForm } from '../../hooks/context';

import { colors } from '../../themes';
import { findTags } from '../../utils';
import { paragraph, small, h4 } from '../../constants/alunnaStyle';

const { height } = Dimensions.get('screen');

const DraftFormSchema = object({
  description: postTextSchema,
  media: any().optional()
})

function PostInputAndUploader() {

  const navigation = useNavigation<NavigationProps>();
  const { mutate, isLoading } = usePublish();

  const form = useZodForm({
    schema: DraftFormSchema
  })

  const onSubmit: SubmitHandler<DraftFormInput> = ({ description }) => {
    if (description) {
      mutate({
        description: description.replace(/\s+/g, ' ').trim(),
        tags: findTags(description),
        media: ''
      }, {
        onSuccess: () => navigation.goBack()
      })
    }
  }

  return (
    <View style={{
      flex: 1,
      paddingHorizontal: 16
    }}>

      <Text style={{ ...small, marginBottom: 8 }}>
        {format(new Date(), 'MMM dd, y')}
      </Text>

      <View style={{
        flex: 1,
        backgroundColor: colors.purple,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 16
      }}>
        <TextInput
          {...form.register('description')}
          onChangeText={(text) => form.setValue('description', text)}
          defaultValue={form.getValues()?.description}

          style={{ ...h4, flex: 1, color: colors.alpha }}
          textAlign='center'
          textAlignVertical='center'
          multiline
          autoFocus={true}
          placeholder='Type something'
          placeholderTextColor={colors.alpha}
          selectionColor={colors.echo}
        />

        <Text style={{
          ...small,
          position: 'absolute',
          bottom: 0,
          right: 0,
          paddingHorizontal: 24,
          paddingVertical: 12,
          color: colors.alpha
        }}>
          {String(form.watch('description') ?? '').length}/256
        </Text>
      </View>

      <View style={{ height: height * 0.16 }} />

      <TouchableOpacity
        onPress={form.handleSubmit(onSubmit)}
        activeOpacity={0.8}
        style={{ flexDirection: 'row', justifyContent: 'flex-end' }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={colors.purpleGradient}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 24,

            marginBottom: 16,
            alignItems: 'center'
          }}
        >
          {isLoading ? (
            <ActivityIndicator size={20} color={colors.alpha} />
          ) : (
            <Text children='Publish' style={{ ...paragraph, color: colors.alpha }} />
          )}
        </LinearGradient>
      </TouchableOpacity>

    </View>
  )
}

export { PostInputAndUploader }