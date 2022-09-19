import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../../themes';
import { ArrowLeft } from '../../sources';
import { Button } from './Button';
import { paragraph, xsmall } from '../../constants/alunnaStyle';

interface Props {
  title?: string,
  subtitle?: string,
  isDivider?: boolean,
  children?: React.ReactNode,
  onBack?(): void,
  onPress?(): void
}

function Menu({ title, children, subtitle, isDivider = false, onBack, onPress }: Props) {

  const divider = isDivider && {
    borderBottomWidth: 0.7,
    borderBottomColor: colors.echo
  }

  return (
    <View style={{
      height: 48,
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.alpha,
      paddingHorizontal: 4,
      ...divider
    }}>

      <Button onPress={onBack}>
        {typeof onBack === 'function' && <ArrowLeft />}
      </Button>

      <View style={{ flex: 1, alignItems: 'center' }}>
        {subtitle && <Text style={{ ...xsmall, textAlign: 'center', color: colors.teal }}>{subtitle}</Text>}
        <Text style={{ textAlign: 'center', ...paragraph }}>{title}</Text>
      </View>

      <Button onPress={onPress}>
        {children}
      </Button>

    </View>
  )
}

export { Menu };