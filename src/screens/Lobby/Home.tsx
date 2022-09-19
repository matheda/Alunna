import React from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation, useScrollToTop } from '@react-navigation/native';

import { useGetFeed } from '../../services/graphql/useRequest';
import { NavigationProps, TPost } from '../../services/types';
import { Footer } from '../../components/Errors/Footer';

import { Post } from '../../components/PostComposer/Post';
import { Status } from '../../components/UI/StatusBar';
import { Menu } from '../../components/Header/Menu';

import { colors } from '../../themes';
import { Search } from '../../sources';

const Home: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();

  const useFeed = useGetFeed();

  const ref = React.useRef<FlatList>(null);
  useScrollToTop(ref);

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

  function renderFooter() {
    const props = {
      title: 'Welcome to Alunna',
      text: 'When you follow to your favorite peoples, their posts will show up here.'
    }
    if (feedData.length == 0) return <Footer {...props} />
  }

  const feedData: TPost[] = useFeed.data ?? [];

  return (
    <>
      <Status />

      <Menu title='Alunna' onPress={() => navigation.navigate('Explorer', { value: '' })}>
        <Search />
      </Menu>

      <View style={{ flex: 1, backgroundColor: colors.alpha }}>
        {useFeed.data && (
          <FlatList
            ref={ref}
            data={feedData}
            renderItem={renderItem}

            keyExtractor={(x) => String(x.id)}

            refreshing={useFeed.isFetching}
            onRefresh={() => useFeed.refetch()}
            onEndReachedThreshold={0.5}

            initialNumToRender={3}
            scrollEventThrottle={8}

            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter()}
          />
        )}
      </View>
    </>
  )
}

export { Home }