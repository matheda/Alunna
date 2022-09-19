import { useMutation, useQueryClient } from 'react-query';
import { graphQLClient } from '../index';
import { EditProfileInput, LoginFormInput, RegisterFormInput, FollowInput, TPost, TUser } from '../types';
import { FOLLOW, LOGIN, UNFOLLOW, SIGNUP, EDITPROFILE } from './queries';

const queryClient = useQueryClient();

export function useSignupUser() {
  return useMutation(async ({ ...input }: RegisterFormInput) => {
    return await graphQLClient.request(SIGNUP, { ...input })
  })
}

export function useAuthUser() {
  return useMutation(async ({ ...input }: LoginFormInput) => {
    return await graphQLClient.request(LOGIN, { ...input });
  })
}

export function useUpdateUser() {
  return useMutation(async ({ ...input }: EditProfileInput) => {
    return await graphQLClient.request(EDITPROFILE, { ...input })
  }, {
    onSuccess: async (_, { ...input }) => {
      // update profile view directly
      await queryClient.setQueryData(['me'], (old: any) => ({ ...old, ...input }))
    }
  })
}

export function useFollow() {
  return useMutation(async ({ username }: FollowInput) => {
    return await graphQLClient.request(FOLLOW, { to: username })
  }, {
    onSuccess: ({ follow }, { username }) => {
      // update profile view directly
      if (follow) {
        queryClient.setQueryData<TUser>(['user', username], (old: any) => ({
          ...old, isFollowing: true
        }))
      }
    }
  })
}

export function useUnfollow() {
  return useMutation(async ({ username }: FollowInput) => {
    return await graphQLClient.request(UNFOLLOW, { to: username })
  }, {
    onSuccess: ({ unfollow }, { username }) => {
      // update profile view directly
      if (unfollow) {
        queryClient.setQueryData<TUser>(['user', username], (old: any) => ({
          ...old, isFollowing: false
        }))
      }
    }
  })
}
