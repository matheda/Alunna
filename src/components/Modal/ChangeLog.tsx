import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import Modal from 'react-native-modal';
import { h4, small } from '../../constants/alunnaStyle';
import { colors } from '../../themes';

interface Props {
  onBack?(): void,
  isVisible: boolean
}

function ChangeLog({ isVisible, onBack }: Props) {
  return (
    <Modal
      isVisible={isVisible}
      backdropColor='rgba(0, 0, 0, 0.3)'
      statusBarTranslucent={true}

      deviceHeight={Dimensions.get('screen').height}
      style={{ margin: 0 }}

      onBackButtonPress={onBack}
      onBackdropPress={onBack}
    >
      <View style={{
        marginHorizontal: 20,
        padding: 20,
        backgroundColor: colors.alpha,
        borderRadius: 24
      }}>
        <Text style={{ ...h4 }}>What's New</Text>
        <Text style={{ ...small, color: colors.teal }}>Avocado 1.1.0 Stable</Text>
      </View>
    </Modal>
  )
}

export { ChangeLog }