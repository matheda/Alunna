import { gql } from 'graphql-request';
import { postFragment, userFragment, authorFragment, publicationFragment } from './fragments';

export const PUBLISH = gql`
  mutation ($description: String!, $media: String!, $tags: [String!]!) {
    publish(description: $description, media: $media, tags: $tags) {
      ...PostFragment
    }
  }
  ${postFragment}
`;

export const DELETE = gql`
  mutation ($id: Int!) {
    delete(id: $id)
  }
`;

export const LIKE = gql`
  mutation ($id: Int!) {
    like(id: $id)
  }
`;

export const REPLY = gql`
  mutation (
    $description: String!
    $media: String!
    $tags: [String!]!
    $to: Int!
  ) {
    reply(description: $description, media: $media, tags: $tags, to: $to) {
      ...PostFragment
    }
  }
  ${postFragment}
`;

export const SIGNUP = gql`
  mutation (
    $username: String!
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(username: $username, name: $name, email: $email, password: $password)
  }
`;

export const LOGIN = gql`
  mutation ($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        ...AuthorFragment
        header
        bio
        link
        location
        followingCount
        followersCount
        postsCount
      }
    }
  }
  ${authorFragment}
`;

export const EDITPROFILE = gql`
  mutation (
    $name: String
    $bio: String
    $location: String
    $link: String
    $avatar: String
  ) {
    editprofile(
      name: $name
      bio: $bio
      location: $location
      link: $link
      avatar: $avatar
    )
  }
`;

export const FOLLOW = gql`
  mutation ($to: String!) {
    follow(to: $to)
  }
`;

export const UNFOLLOW = gql`
  mutation ($to: String!) {
    unfollow(to: $to)
  }
`;

export const ME = gql`
  query {
    me {
      ...UserFragment
    }
  }
  ${userFragment}
`;

export const MYPOSTS = gql`
  query {
    myPosts {
      ...PostFragment
    }
  }
  ${postFragment}
`;

export const FEED = gql`
  query {
    feed {
      ...PostFragment
    }
  }
  ${postFragment}
`;

export const POST = gql`
  query ($id: Int!) {
    post(id: $id) {
      ...PublicationFragment
    }
  }
  ${publicationFragment}
`;

export const REPLIES = gql`
  query ($id: Int!) {
    replies(id: $id) {
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
  }
  ${authorFragment}
`;

export const USER = gql`
  query ($username: String!) {
    user(username: $username) {
      ...UserFragment
    }
  }
  ${userFragment}
`;

export const POSTS = gql`
  query ($filter: String!) {
    posts(filter: $filter) {
      ...PostFragment
    }
  }
  ${postFragment}
`;

export const USERS = gql`
  query ($filter: String!) {
    users(filter: $filter) {
      ...AuthorFragment
    }
  }
  ${authorFragment}
`;
