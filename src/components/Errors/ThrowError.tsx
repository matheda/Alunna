import React from 'react';
import { Text } from 'react-native';
import { small } from '../../constants/alunnaStyle';
import { colors } from '../../themes';

interface Props {
  label: string
}

function ThrowError({ label }: Props) {

  const isLabel = Boolean(label);

  if (!isLabel) return null;

  return (
    <Text style={{ ...small, color: colors.red, paddingVertical: 6 }}>
      {label}
    </Text>
  )
}

export { ThrowError }