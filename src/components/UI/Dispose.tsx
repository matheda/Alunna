import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View } from 'react-native';
import { NavigationProps } from '../../services/types';
import { Close } from '../../sources';

interface Props {
  position?: 'right' | 'left',
  onPress?(): void,
  color?: string
}

function Dispose({ position = 'left', color, onPress }: Props) {

  const navigation = useNavigation<NavigationProps>();

  function onNavigate() { navigation.goBack() }

  const posture = position === 'right' ? { marginLeft: 'auto' } : { marginRight: 'auto' }

  return (
    <TouchableOpacity
      style={{ marginHorizontal: 16, paddingVertical: 12, ...posture }}
      onPress={onPress ?? onNavigate}
      activeOpacity={1.0}
    >
      <View style={{ padding: 8, backgroundColor: 'rgba(0, 0, 0, 0.03)', borderRadius: 12 }}>
        <Close color={color} />
      </View>
    </TouchableOpacity>
  )
}

export { Dispose }