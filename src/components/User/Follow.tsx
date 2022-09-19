import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { object } from 'zod';
import { SubmitHandler } from 'react-hook-form';

import { useFollow, useUnfollow } from '../../services/graphql/user';
import { usernameSchema } from '../../hooks/schemas';
import { useZodForm } from '../../hooks/context';
import { FollowInput } from '../../services/types';

import { colors } from '../../themes';
import { paragraph } from '../../constants/alunnaStyle';

const FollowSchema = object({
  username: usernameSchema
})

interface Props {
  username: string,
  isFollowing: boolean
}

function Follow({ isFollowing, username }: Props) {

  const form = useZodForm({
    schema: FollowSchema
  })

  React.useEffect(() => {
    if (!username) return;

    form.reset({ username: username })

  }, [username])

  const { mutate: follow } = useFollow();
  const { mutate: unfollow } = useUnfollow();

  const onSubmit: SubmitHandler<FollowInput> = async ({ username }) => {
    if (isFollowing) {
      unfollow({ username: username })
    } else {
      follow({ username: username })
    }
  }

  const toggleStyle = isFollowing ? {
    backgroundColor: colors.alpha,
    borderWidth: 1
  } : {
    backgroundColor: colors.echoThick,
    borderWidth: 0.7
  }

  return (
    <TouchableHighlight
      onPress={form.handleSubmit(onSubmit)}
      underlayColor={colors.echo}
      activeOpacity={0.6}
      style={{
        ...toggleStyle,
        paddingHorizontal: 32,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 24,
        borderColor: colors.echo

      }}>
      <Text style={{ ...paragraph, color: colors.beta }}>
        {isFollowing ? 'Unfollow' : 'Follow'}
      </Text>
    </TouchableHighlight>
  )
}

export { Follow }