import React from 'react';
import { Swipeable, GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import { useUnreply } from '../../services/graphql/post';
import { Post } from './Post';

interface Props {
  id: number,
  replyingTo: number,
  name?: string,
  username?: string,
  avatar?: string,
  isVerified?: boolean,
  isLiked?: boolean,
  description?: string,
  createdAt?: Date | string,
  likesCount?: number,
  itsMine?: boolean
};

function Reply(viewer: Props) {

  const swipeRef = React.useRef<Swipeable>(null);

  const { mutate } = useUnreply(viewer.replyingTo);

  function rightSwipe() {
    if (!viewer.itsMine) return null
    return <View style={{ width: '38%', height: '100%' }} />
  }

  function onSubmit() {
    viewer.itsMine && mutate({ id: viewer.id });
    swipeRef.current?.close();
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        ref={swipeRef}
        onSwipeableRightOpen={onSubmit}
        overshootRight={false}
        renderRightActions={rightSwipe}
      >
        <Post
          id={viewer.id}
          name={viewer.name}
          username={viewer.username}
          avatar={viewer.avatar}
          isVerified={viewer.isVerified}
          isLiked={viewer.isLiked}
          description={viewer.description}
          createdAt={viewer.createdAt}
          likesCount={viewer.likesCount}
        />
      </Swipeable>
    </GestureHandlerRootView>
  );
};

export { Reply }