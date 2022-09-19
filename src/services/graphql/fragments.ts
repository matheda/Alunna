import { gql } from 'graphql-request';

export const userFragment = gql`
  fragment UserFragment on User {
    username
    name
    avatar
    header
    bio
    link
    location
    isVerified
    followingCount
    followersCount
    postsCount
    isFollowing
    posts {
      id
      description
      media
      likesCount
      isLiked
      createdAt
    }
  }
`;

export const authorFragment = gql`
  fragment AuthorFragment on User {
    name
    username
    isVerified
    avatar
  }
`

export const postFragment = gql`
  fragment PostFragment on Post {
    id
    description
    media
    likesCount
    itsMine
    isLiked
    createdAt
    author {
      ...AuthorFragment
    }
  }
  ${authorFragment}
`;

export const publicationFragment = gql`
  fragment PublicationFragment on Post {
    description
    media
    likesCount
    itsMine
    isLiked
    createdAt
    author {
      ...AuthorFragment
    }
  }
  ${authorFragment}
`
