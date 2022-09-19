import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  TextInputProps
} from 'react-native';

import { SingleUser } from '../Avatar/SingleUser';

import { colors } from '../../themes';
import { paragraph } from '../../constants/alunnaStyle';
import { ArrowRight } from '../../sources';

interface Props extends TextInputProps {
  isLoading: boolean,
  source?: string,
  onPublish?(): void
};

function Input({ isLoading, source, onPublish, ...props }: Props) {
  return (
    <View style={{
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      borderTopWidth: 0.7,
      borderLeftWidth: 0.7,
      borderRightWidth: 0.7,
      borderColor: colors.echo,
      flexDirection: 'row'
    }}>

      <View style={{ justifyContent: 'center', marginLeft: 24 }}>
        <SingleUser disabled={true} source={source} size={24} />
      </View>

      <TextInput
        style={{
          ...paragraph,
          flex: 1,
          textAlignVertical: 'center',
          paddingHorizontal: 10,
          paddingVertical: 14
        }}
        multiline

        placeholder='Type something'
        placeholderTextColor={colors.betaThick}
        selectionColor={colors.red}
        {...props}
      />

      <TouchableOpacity
        onPress={onPublish}
        activeOpacity={1.0}
        style={{ justifyContent: 'center', paddingHorizontal: 24 }}
      >
        {isLoading ? <ActivityIndicator size={18} color={colors.purple} /> : <ArrowRight />}
      </TouchableOpacity>

    </View>
  )
};

export { Input }