import React from 'react';
import { FlatList } from 'react-native';

import { TPost } from '../../services/types';
import { useGetReplies } from '../../services/graphql/useRequest';

import { Reply } from './Reply';
import { Footer } from '../Errors/Footer';

interface Props {
  id: number,
  listHeaderComponent: React.ReactElement<any, string | React.JSXElementConstructor<any>>
}

function Thread({ id, listHeaderComponent }: Props) {

  const useThread = useGetReplies(id);

  if (useThread.isLoading) return listHeaderComponent

  const renderItem = ({ item }: { item: TPost }) => (
    <Reply
      replyingTo={id}
      id={item.id}
      itsMine={item.itsMine}
      name={item.author.name}
      username={item.author.username}
      avatar={item.author.avatar}
      isVerified={item.author.isVerified}
      description={item.description}
      createdAt={item.createdAt}
      likesCount={item.likesCount}
      isLiked={item.isLiked}
    />
  )

  const threadData: TPost[] = useThread.data ?? [];

  return (
    <>
      {useThread.data && (
        <FlatList
          data={threadData}
          renderItem={renderItem}
          ListHeaderComponent={listHeaderComponent}

          contentContainerStyle={{ paddingBottom: 124 }}

          keyExtractor={(x) => String(x.id)}

          onEndReachedThreshold={0.5}

          initialNumToRender={3}
          scrollEventThrottle={8}
          showsVerticalScrollIndicator={false}

          ListFooterComponent={() => <Footer />}
        />
      )}
    </>
  );
}

export { Thread }