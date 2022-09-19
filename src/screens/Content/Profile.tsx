import React from 'react';
import { FlatList, View, Share } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';

import { useGetUser } from '../../services/graphql/useRequest';
import { Post } from '../../components/PostComposer/Post';

import { Parallax } from '../../components/Header/Parallax';
import { Footer } from '../../components/Errors/Footer';
import { Option } from '../../components/UI/Option';
import { Status } from '../../components/UI/StatusBar';
import { ModalContainer } from '../../components/Modal/ModalContainer';

import { UserPreview } from '../../components/User';
import { TPost, NavigationProps, RootRouteProps } from '../../services/types';

import { colors } from '../../themes';

const Profile: React.FC = () => {

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RootRouteProps<'Profile'>>();

  const [settings, setSettings] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);

  const keepLetters = route.params.username.replace(/[^A-Za-z0-9\_]/g, '')

  const {
    data,
    isError,
    isFetching,
    refetch
  } = useGetUser(keepLetters)

  if (isError) return <Footer />

  function goBack() {
    navigation.canGoBack() ? navigation.goBack()
      : navigation.navigate('Lobby')
  };

  function handleScroll(e: any) {
    if (e.nativeEvent.contentOffset.y >= 98.7) setShow(true)
    else setShow(false)
  }

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
  );

  const renderProfile = () => (
    <UserPreview
      avatar={data?.avatar}
      header={data?.header}
      username={data?.username}
      name={data?.name}
      isVerified={data?.isVerified}
      link={data?.link}
      location={data?.location}
      bio={data?.bio}
      postsCount={data?.postsCount}
      followingCount={data?.followingCount}
      followersCount={data?.followersCount}
      onMore={() => setSettings(true)}
    />
  )

  return (
    <>
      <Status />

      <View style={{ flex: 1, backgroundColor: colors.alpha }}>

        <FlatList
          data={data?.posts ?? []}
          keyExtractor={(item) => `${item.id}`}

          refreshing={isFetching}
          onRefresh={() => refetch()}
          removeClippedSubviews={true}

          contentContainerStyle={{ paddingBottom: 124 }}

          onEndReachedThreshold={0.5}
          initialNumToRender={3}
          showsVerticalScrollIndicator={false}

          onScroll={handleScroll}
          renderItem={renderItem}

          ListHeaderComponent={renderProfile}
        />

        <Parallax
          onBack={goBack}
          isAppearing={show}
          username={data?.username}
          isFollowing={data?.isFollowing}
          isVerified={data?.isVerified}
          avatar={data?.avatar}
        />

      </View>

      <ModalContainer
        isVisible={settings}
        onBack={() => setSettings(false)}
      >
        <Option
          title='Share this profile'
          onPress={() => Share.share({ url: `https://alunna.me/${route.params.username}` })}
        />
        <Option title='Block & Report' onPress={() => null} />
      </ModalContainer>
    </>
  )
}

export { Profile }