import { RouteProp, NavigationProp } from '@react-navigation/native';

export interface EditProfileInput {
  name?: string;
  bio?: string;
  location?: string;
  link?: string;
  // birthday?: string;
  avatar?: string;
}

export interface FollowInput {
  username: string;
}

export interface LikeInput {
  id?: number;
}

export interface DraftFormInput {
  media?: string;
  description: string;
  tags?: string[]
}

export interface SearchFormInput {
  value: string;
}

export interface ReplyFormInput {
  to?: number;
  description: string;
  media?: string;
  tags?: string[]
}

export interface LoginFormInput {
  username: string;
  password: string;
}

export interface RegisterFormInput {
  username: string;
  password: string;
  email: string;
  name?: string;
}

export interface TUser {
  username: string;
  name: string;
  avatar: string;
  header: string;
  bio: string;
  link: string;
  location: string;
  isVerified: boolean;
  followingCount: number;
  followersCount: number;
  postsCount: number;
  isFollowing: boolean;
  posts: TPost[];
}

export interface TPost {
  id: number;
  description: string;
  media: string;
  likesCount: number;
  itsMine: boolean;
  isLiked: boolean;
  createdAt: Date | string;
  author: {
    name: string;
    username: string;
    isVerified: boolean;
    avatar: string;
  }
}

export type RootStackParamsList = {
  Lobby: undefined;
  Publication: { id: number, name?: string };
  Profile: { username: string };
  Draft: undefined;
  Explorer: { value: string };
  Media: { media: string, username: string, avatar: string, description: string };
  Conversation: undefined;
  Dashboard: undefined;
  EditProfile: undefined;
  Security: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Me: undefined;
}

export interface AndroidImageColors {
  average?: string
  platform: 'android'
}

export interface IOSImageColors {
  background: string
  platform: 'ios'
}

export type RootRouteProps<RouteName extends keyof RootStackParamsList> = RouteProp<
  RootStackParamsList,
  RouteName
>;

export type NavigationProps = NavigationProp<RootStackParamsList>;