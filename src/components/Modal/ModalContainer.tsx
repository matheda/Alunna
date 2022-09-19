import React from 'react';
import { Dimensions, View } from 'react-native';
import Modal from 'react-native-modal';

import { colors } from '../../themes';
import { Dispose } from '../UI/Dispose';

interface Props {
  isVisible: boolean,
  onBack?(): void,
  children: React.ReactNode
}

function ModalContainer({ isVisible, children, onBack }: Props) {
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
        marginTop: 'auto',
        backgroundColor: colors.alpha,
        minHeight: Dimensions.get('screen').height * 0.2,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingBottom: 6
      }}>
        <Dispose position='right' onPress={onBack} />
        {children}
      </View>
    </Modal>
  )
}

export { ModalContainer }