import React from 'react';
import {
  Alert,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  View,
  Share
} from 'react-native';

import { useGetPost } from '../../services/graphql/useRequest';
import { useUnpublish } from '../../services/graphql/post';

import { useNavigation, useRoute } from '@react-navigation/native';

import { PostPage } from '../../components/PostComposer/PostPage';
import { ReplyInputAndUploader } from '../../components/Creator/ReplyInputAndUploader';

import { Option } from '../../components/UI/Option';
import { ModalContainer } from '../../components/Modal/ModalContainer';
import { Status } from '../../components/UI/StatusBar';
import { Footer } from '../../components/Errors/Footer';
import { Thread } from '../../components/PostComposer/Thread';

import { colors } from '../../themes';
import { More } from '../../sources';
import { NavigationProps, RootRouteProps } from '../../services/types';
import { Menu } from '../../components/Header/Menu';

const Publication = () => {

  const [more, setMore] = React.useState<boolean>(false);

  const navigation = useNavigation<NavigationProps>();
  const route = useRoute<RootRouteProps<'Publication'>>();

  const { data, isError, isSuccess } = useGetPost(route.params.id);

  const { mutate } = useUnpublish();

  if (isError) return <Footer />

  function goBack() {
    navigation.canGoBack() ? navigation.goBack()
      : navigation.navigate('Lobby')
  };

  function handleMutate() {
    mutate({ id: route.params.id });
    setMore(false);
    goBack();
  };

  function onSubmit() {
    Alert.alert(
      'Delete for all eternity?', '',
      [{ text: 'Cancel', style: 'cancel' }, { text: 'Yes, delete it', onPress: handleMutate }],
      { cancelable: true }
    )
  };

  const renderItem = (
    <PostPage
      id={route.params.id}
      avatar={data?.author.avatar}
      name={data?.author.name}
      username={data?.author.username}

      isLiked={data?.isLiked}
      isVerified={data?.author.isVerified}
      likesCount={data?.likesCount}

      media={data?.media}
      description={data?.description}
      createdAt={data?.createdAt}
    />
  )

  return (
    <>
      <Status />

      <Menu onBack={goBack} onPress={() => setMore(true)}>
        <More color={colors.teal}/>
      </Menu>

      <KeyboardAvoidingView
        behavior={Platform.select({ ios: 'padding' })}
        style={{ flex: 1, backgroundColor: colors.alpha }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            {isSuccess && <Thread listHeaderComponent={renderItem} id={route.params.id} />}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <ReplyInputAndUploader replyingTo={route.params.id} />

      <ModalContainer
        isVisible={more}
        onBack={() => setMore(false)}
      >
        <Option
          title='Share this profile'
          onPress={() => Share.share({ url: `https://alunna.me/moon/${route.params.id}` })}
        />
        <Option title={`Follow @${data?.author.username}`} onPress={() => null} />
        {data?.itsMine && <Option title='Delete' onPress={onSubmit} />}
        {!data?.itsMine && <Option title='Report' onPress={() => null} />}
      </ModalContainer>
    </>
  );
};

export { Publication };
