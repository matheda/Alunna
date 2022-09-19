import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { DraftFormInput, ReplyFormInput, TPost } from '../types';
import { PUBLISH, DELETE, LIKE, REPLY } from './queries';
import { graphQLClient } from '../index';

const queryClient: QueryClient = useQueryClient();

export function usePublish() {
  return useMutation(async ({ ...input }: DraftFormInput) => {
    return await graphQLClient.request(PUBLISH, { ...input });
  }, {
    onSuccess: ({ publish }) => {
      // update post view directly
      queryClient.setQueryData(['myPosts'], (old: any) => [publish, ...old]);
      // update feed directly
      queryClient.setQueryData(['feed'], (old: any) => [publish, ...old]);
      // just invalidate all the lists
      queryClient.invalidateQueries(['myPosts', 'feed']);
    }
  })
}

export function useReply() {
  return useMutation(async ({ ...input }: ReplyFormInput) => {
    return await graphQLClient.request(REPLY, { ...input, media: '' });
  }, {
    onSuccess: async ({ reply }, { to }) => {
      // update reply view directly
      queryClient.setQueryData(['replies', to], (old: any) => [reply, ...old])
      // just invalidate all the lists
      queryClient.invalidateQueries(['replies', to]);
    }
  })
}

export function useUnpublish() {
  return useMutation(async ({ id }: { id: number }) => {
    return await graphQLClient.request(DELETE, { id });
  }, {
    onSuccess: (_, { id }) => {
      // update post view directly
      queryClient.setQueryData(['myPosts'], (old: any) =>
        old.filter((ref: TPost) => id !== ref.id)
      )
      // update feed directly
      queryClient.setQueryData(['feed'], (old: any) =>
        old.filter((ref: TPost) => id !== ref.id)
      )
      // just invalidate all the lists
      queryClient.invalidateQueries(['myPosts', 'feed']);
    }
  })
}

export function useUnreply(id: number) {
  return useMutation(async ({ id }: { id: number }) => {
    return await graphQLClient.request(DELETE, { id });
  }, {
    onSuccess: (_, reply) => {
      // update reply view directly
      queryClient.setQueryData(['replies', id], (old: any) =>
        old.filter((ref: TPost) => reply.id !== ref.id)
      )
    }
  })
}

export function useLike() {
  return useMutation(async ({ id }: { id: number }) => {
    return await graphQLClient.request(LIKE, { id })
  }, {
    onSuccess: ({ like }, { id }) => {
      queryClient.setQueryData<TPost>(['post', id], (old: any) => ({
        ...old,
        isLiked: like
      }))
    }
  })
}
