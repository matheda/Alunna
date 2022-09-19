import React from 'react';
import { View } from 'react-native';
import { Status } from '../components/UI/StatusBar';

import { colors } from '../themes';

const Splash: React.FC = () => (
  <>
    <Status background={colors.purple} barStyle='light-content' />
    <View style={{ flex: 1, backgroundColor: colors.purple }} />
  </>
)

export { Splash }