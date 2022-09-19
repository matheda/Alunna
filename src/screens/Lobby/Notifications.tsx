import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { Status } from '../../components/UI/StatusBar';
import { Menu } from '../../components/Header/Menu';
import { Notify } from '../../components/Notification/Notify';

import { colors } from '../../themes';
import { paragraph } from '../../constants/alunnaStyle';

const Title = ({ createdAt }: { createdAt: any }) => {
  return (
    <Text style={{
      ...paragraph,
      paddingVertical: 8,
      paddingHorizontal: 24
    }}>
      {createdAt}
    </Text>
  );
};

const Notifications: React.FC = () => {

  return (
    <>
      <Status />

      <Menu title='Activity' />

      <SafeAreaView style={{ flex: 1, backgroundColor: colors.alpha }}>

        <Title createdAt='Today'/>

        <Notify type='Likes' />
        <Notify type='Likes' />
        <Notify type='Follow' />

        <Title createdAt='Yesterday'/>

        <Notify type='Likes' />

      </SafeAreaView>
    </>
  )
};

export { Notifications }