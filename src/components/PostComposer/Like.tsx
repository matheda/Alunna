import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { number, object } from 'zod';
import { SubmitHandler } from 'react-hook-form';

import { useLike } from '../../services/graphql/post';
import { LikeInput } from '../../services/types';
import { useZodForm } from '../../hooks/context';

import { nFormatter } from '../../utils';
import { colors } from '../../themes';
import { Likes } from '../../sources';
import { small } from '../../constants/alunnaStyle';

interface Props {
  id: number,
  isLiked: boolean,
  likesCount: number,
  color?: string
}

const FollowSchema = object({
  id: number()
})

function Like({ id, isLiked, likesCount, color }: Props) {

  const form = useZodForm({
    schema: FollowSchema
  })

  React.useEffect(() => {
    if (!id) return;

    form.reset({ id: id })

  }, [id])

  const { mutate } = useLike();

  const onSubmit: SubmitHandler<LikeInput> = async ({ id }) => {
    if (id) mutate({ id: id })
  }

  return (
    <TouchableOpacity
      style={{
        width: 36,
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
      activeOpacity={1.0}
      delayPressIn={0}
      onPress={form.handleSubmit(onSubmit)}
    >
      <>
        <Text style={{
          ...small,
          color: (isLiked ?? false) ? colors.red : (color ?? colors.teal),
          marginRight: 4
        }}>
          {nFormatter(likesCount ?? 0)}
        </Text>

        <Likes
          isLiked={isLiked ?? false}
          fill={isLiked ? colors.red : 'none'}
          stroke={isLiked ? 'none' : (color ?? colors.teal)}
        />
      </>
    </TouchableOpacity>
  )
}

export { Like }