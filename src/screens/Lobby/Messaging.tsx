import React from 'react';
import { View, Text, FlatList, SafeAreaView } from 'react-native';

import { Status } from '../../components/UI/StatusBar';
import { Menu } from '../../components/Header/Menu';
import { MessageCard } from '../../components/Messages/MessageCard';
import { ProfileCard } from '../../components/User/ProfileCard';
import { Footer } from '../../components/Errors/Footer';

import { colors } from '../../themes';
import { h3 } from '../../constants/alunnaStyle';

const Messaging: React.FC = () => {

  const renderItem = ({ }) => (
    <ProfileCard username='username' name='Name' avatar='' isVerified onPress={() => null} />
  )

  const renderItems = ({ }) => (
    <MessageCard />
  )

  const renderEmptyComponent = (
    <Footer text='Empty' />
  )

  return (
    <>
      <Status />
      <Menu title='Messages' />

      <SafeAreaView style={{ flex: 1, backgroundColor: colors.echoThick }}>

        <View style={{ paddingVertical: 12 }}>
          <FlatList
            data={[{}, {}, {}]}
            numColumns={3}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}
          />
        </View>

        <View style={{
          flex: 1,
          paddingVertical: 16,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: colors.alpha
        }}>
          <Text style={{ ...h3, fontWeight: '600', marginBottom: 10, marginLeft: 32 }}>
            Chats
          </Text>
          <FlatList
            data={[]}
            renderItem={renderItems}
            ListEmptyComponent={renderEmptyComponent}
          />
        </View>

      </SafeAreaView>
    </>
  )
}

export { Messaging }