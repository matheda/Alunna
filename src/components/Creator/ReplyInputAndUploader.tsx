import React from 'react';
import { Keyboard, View } from 'react-native';

import { useGetMe } from '../../services/graphql/useRequest';
import { useReply } from '../../services/graphql/post';

import { any, object } from 'zod';
import { replyTextSchema } from '../../hooks/schemas';
import { useZodForm } from '../../hooks/context';
import { SubmitHandler } from 'react-hook-form';
import { ReplyFormInput } from '../../services/types';
import { findTags } from '../../utils';
import { Input } from '../UI/Input';
import { colors } from '../../themes';

const ReplyFormSchema = object({
  description: replyTextSchema,
  media: any().optional()
});

interface Props {
  replyingTo: number
};

function ReplyInputAndUploader({ replyingTo }: Props) {

  const { data } = useGetMe();
  const { mutate, isLoading } = useReply();

  const form = useZodForm({
    schema: ReplyFormSchema
  })

  const onSubmit: SubmitHandler<ReplyFormInput> = ({ description }) => {
    if (description && replyingTo) {
      mutate({
        to: replyingTo,
        description: description.replace(/\s+/g, ' ').trim(),
        tags: findTags(description),
        media: ''
      }, {
        onSuccess: () => {
          Keyboard.dismiss();
          form.reset({ description: '' });
        }
      })
    }
  }

  return (
    <View style={{ backgroundColor: colors.alpha }}>
      <Input
        {...form.register('description')}
        onChangeText={(text) => form.setValue('description', text)}
        isLoading={isLoading}
        source={data?.avatar}
        onPublish={form.handleSubmit(onSubmit)}
      />
    </View>
  )
};

export { ReplyInputAndUploader }
