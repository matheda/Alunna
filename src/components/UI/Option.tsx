import React from 'react';
import { TouchableHighlight, Text, View, ViewProps } from 'react-native';
import { colors } from '../../themes';
import { SmallArrowRight } from '../../sources';
import { h4, small } from '../../constants/alunnaStyle';

interface Props {
  title?: string,
  label?: string,
  linked?: boolean,
  children?: React.ReactNode,
  onPress?(): void
}

function Option({ title, label, linked, children, onPress }: Props) {

  const width: number = children === undefined ? 0 : 32;

  return (
    <TouchableHighlight
      style={{
        paddingVertical: 12,
        paddingHorizontal: 24,
        flexDirection: 'row',
        alignItems: 'center'
      }}
      underlayColor={colors.echoThick}
      onPress={onPress}
    >
      <>
        <View style={{ width: width, height: 32, justifyContent: 'center' }}>
          {children}
        </View>

        <View>
          <Text style={{ ...h4 }}>{title}</Text>
          { label && <Text style={{ ...small, color: colors.teal, marginTop: 2 }}>{label}</Text> }
        </View>

        <View style={{ marginLeft: 'auto' }}>
          {linked && <SmallArrowRight color={colors.teal} />}
        </View>
      </>
    </TouchableHighlight>
  )
}

export { Option };
