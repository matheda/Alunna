import React from 'react';
import { View, TouchableOpacity, StatusBar, Text, Animated } from 'react-native';

import { useRoute } from '@react-navigation/native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

import { SingleUser } from '../../components/Avatar/SingleUser';

import { h3, h4, paragraph } from '../../constants/alunnaStyle';
import { RootRouteProps } from '../../services/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../themes';
import { Dispose } from '../../components/UI/Dispose';

const Media: React.FC = () => {

  const route = useRoute<RootRouteProps<'Media'>>();
  const scale = new Animated.Value(1);

  const [modal, setModal] = React.useState<boolean>(true);

  const onZoomEvent = Animated.event(
    [
      { nativeEvent: { scale: scale } }
    ],
    { useNativeDriver: true }
  )

  const onZoomStateChange = (event: any) => {
    if (event.nativeEvent.oldState === State.ACTIVE) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true
      }).start()
    }
  }

  return (
    <>
      <StatusBar backgroundColor='rgba(0, 0, 0, 0.12)' barStyle='light-content' />

      <TouchableOpacity
        style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 1 }}
        activeOpacity={1.0}
        onPress={() => setModal(!modal)}
      >
        <SafeAreaView edges={['bottom', 'top']} style={{ flex: 1 }}>

          <Dispose color='#F0F0F0'/>

          {modal && (
            <View style={{ padding: 24, marginTop: 'auto' }}>

              <Text
                style={{ ...h3, color: '#F0F0F0', marginVertical: 12 }}
                numberOfLines={6}
                ellipsizeMode='tail'
              >
                {route.params.description}
              </Text>

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <SingleUser size={24} source={route?.params?.avatar} />

                <Text style={{ marginLeft: 8 }}>
                  <Text style={{ ...h4, fontWeight: '700', color: colors.alpha }}>{route.params.username} </Text>
                  <Text style={{ ...paragraph, color: colors.alpha }}>{route.params.username}</Text>
                </Text>
              </View>

            </View>
          )}
        </SafeAreaView>
      </TouchableOpacity>

      <PinchGestureHandler
        onGestureEvent={onZoomEvent}
        onHandlerStateChange={onZoomStateChange}
      >
        <Animated.Image
          source={{ uri: route.params.media }}
          resizeMode='contain'
          style={{ height: '100%', backgroundColor: '#020102', transform: [{ scale: scale }] }}
        />
      </PinchGestureHandler>
    </>
  )
}

export { Media }