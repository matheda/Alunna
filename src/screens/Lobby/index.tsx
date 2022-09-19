import React from 'react';
import { View } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { SingleUser } from '../../components/Avatar/SingleUser';

import { useGetMe } from '../../services/graphql/useRequest';

import { Home } from './Home';
import { Messaging } from './Messaging';
import { Notifications } from './Notifications';
import { Me } from './Me';

import { Heart, House, Rain } from '../../sources';
import { colors } from '../../themes';

const Tab = createBottomTabNavigator();

function Lobby() {

  const insets = useSafeAreaInsets();

  const { data } = useGetMe();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0.7,
          borderTopColor: colors.echo,
          backgroundColor: colors.alpha,
          elevation: 0,
          paddingBottom: insets.bottom
        }
      }}>

      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => <House color={!focused && '#E5ECF0'} />
        }}
      />

      <Tab.Screen
        name='Discover'
        component={Messaging}
        options={{
          tabBarIcon: ({ focused }) => <Heart color={!focused && '#E5ECF0'} />
        }}
      />

      <Tab.Screen
        name='Notifications'
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => <Rain color={!focused && '#E5ECF0'} />
        }}
      />

      <Tab.Screen
        name='Me'
        component={Me}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View style={{
                padding: 1.5,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: !focused ? '#E5ECF0' : colors.blue
              }}>
                <SingleUser size={18} source={data?.avatar} disabled={true} />
              </View>
            );
          }
        }}
      />
    </Tab.Navigator>
  );
}

export { Lobby }
