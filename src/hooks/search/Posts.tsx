import React from 'react';
import { FlatList, SafeAreaView } from 'react-native';

import { useGetPosts } from '../../services/graphql/useRequest';

import { Post } from '../../components/PostComposer/Post';
import { TPost } from '../../services/types';

const Posts = ({ value }: { value: string }) => {

  if (value.length < 3) return null

  const { data, isLoading, isError, isLoadingError } = useGetPosts(value);

  if (isLoading) return null
  if (isError) return null
  if (isLoadingError) return null

  const renderItem = ({ item }: { item: TPost }) => (
    <Post
      id={item.id}
      description={item.description}
      media={item.media ?? ''}
      avatar={item?.author.avatar ?? ''}
      username={item?.author.username}
      name={item?.author.name}
      likesCount={item.likesCount}
      isLiked={item.isLiked}
      isVerified={item?.author.isVerified}
      createdAt={item.createdAt}
    />
  );

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={(x, _) => String(x.id)}
        renderItem={renderItem}

        initialNumToRender={3}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps={'always'}
      />
    </SafeAreaView>
  );
}

export { Posts }