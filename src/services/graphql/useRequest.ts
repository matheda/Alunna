import { useQuery } from 'react-query';
import { graphQLClient } from '../index';
import { TPost, TUser } from '../types';
import { FEED, ME, POST, POSTS, REPLIES, USER, USERS, MYPOSTS } from './queries';

export const useGetMe = () => {
  return useQuery(['me'], async (): Promise<TUser> => {
    const { me } = await graphQLClient.request(ME)
    return me
  })
}

export const useGetMyPosts = () => {
  return useQuery(['myPosts'], async (): Promise<TPost[]> => {
    const { myPosts } = await graphQLClient.request(MYPOSTS)
    return myPosts
  })
}

export const useGetFeed = () => {
  return useQuery(['feed'], async (): Promise<TPost[]> => {
    const { feed } = await graphQLClient.request(FEED);
    return feed
  })
}

export const useGetPost = (id: number) => {
  return useQuery(['post', id], async (): Promise<TPost> => {
    const { post } = await graphQLClient.request(POST, { id });
    return post
  })
}

export const useGetReplies = (id: number) => {
  return useQuery(['replies', id], async (): Promise<TPost[]> => {
    const { replies } = await graphQLClient.request(REPLIES, { id });
    return replies
  })
}

export const useGetUser = (username: string) => {
  return useQuery(['user', username], async (): Promise<TUser> => {
    const { user } = await graphQLClient.request(USER, { username });
    return user
  })
}

export const useGetPosts = (filter: string) => {
  return useQuery(['posts', filter], async (): Promise<TPost[]> => {
    const { posts } = await graphQLClient.request(POSTS, { filter });
    return posts
  })
}

export const useGetUsers = (filter: string) => {
  return useQuery<any, Error>(['users', filter], async (): Promise<TUser[]> => {
    const { users } = await graphQLClient.request(USERS, { filter });
    return users
  })
}
