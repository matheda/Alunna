import React from 'react';
import { FlatList, View, Share } from 'react-native';
import { useScrollToTop, useNavigation } from '@react-navigation/native';

import { useGetMe, useGetMyPosts } from '../../services/graphql/useRequest';

import { Status } from '../../components/UI/StatusBar';
import { Floating } from '../../components/UI/Floating';
import { ModalContainer } from '../../components/Modal/ModalContainer';
import { Option } from '../../components/UI/Option';
import { Post } from '../../components/PostComposer/Post';
import { Parallax } from '../../components/Header/Parallax';

import { colors } from '../../themes';
import { Plus } from '../../sources';
import { UserPreview } from '../../components/User';
import { TPost, NavigationProps } from '../../services/types';
import { Footer } from '../../components/Errors/Footer';

const Me: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();

  const [settings, setSettings] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);

  const { data, isError } = useGetMe();
  const { data: pData } = useGetMyPosts();

  const ref = React.useRef<FlatList>(null);
  useScrollToTop(ref);

  if (isError) return <Footer />

  const renderItem = ({ item }: { item: TPost }) => (
    <Post
      id={item.id}
      description={item.description}
      media={item.media ?? ''}
      avatar={data?.avatar ?? ''}
      username={data?.username}
      name={data?.name}
      likesCount={item.likesCount}
      isLiked={item.isLiked}
      isVerified={data?.isVerified}
      createdAt={item.createdAt}
    />
  )

  function handleScroll(e: any) {
    if (e.nativeEvent.contentOffset.y >= 98.7) setShow(true)
    else setShow(false)
  }

  function handleDashboard() {
    navigation.navigate('Dashboard');
    setSettings(false);
  }

  const renderProfile = () => (
    <UserPreview
      avatar={data?.avatar}
      header={data?.header}
      username={data?.username}
      name={data?.name}
      isVerified={data?.isVerified ?? false}
      link={data?.link}
      location={data?.location}
      bio={data?.bio}
      postsCount={data?.postsCount}
      followingCount={data?.followingCount}
      followersCount={data?.followersCount}
      onMore={() => setSettings(true)}
    />
  )

  const payoutPosts: TPost[] = pData ?? [];

  return (
    <>
      <Status />

      <View style={{ flex: 1, backgroundColor: colors.alpha }}>

        <FlatList
          ref={ref}
          data={payoutPosts}
          keyExtractor={(item) => `${item.id}`}

          onEndReachedThreshold={0.5}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}

          contentContainerStyle={{ paddingBottom: 124 }}

          onScroll={handleScroll}
          renderItem={renderItem}

          ListHeaderComponent={renderProfile}
        />

        <Parallax
          isAppearing={show}
          isVerified={data?.isVerified}
          username={data?.username}
          avatar={data?.avatar}
        />

      </View>

      <Floating onPress={() => navigation.navigate('Draft')}>
        <Plus size={28} color={colors.alpha} />
      </Floating>

      <ModalContainer
        isVisible={settings}
        onBack={() => setSettings(false)}
      >
        <Option
          title='Share this profile'
          onPress={() => Share.share({ url: `https://alunna.me/${data?.username}` })}
        />
        <Option title='Account Settings' onPress={handleDashboard} />
      </ModalContainer>
    </>
  )
}

export { Me }