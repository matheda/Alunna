import React from 'react';
import { View, Text, TextInput, TextInputProps, TouchableOpacity } from 'react-native';
import { h4, paragraph } from '../../constants/alunnaStyle';
import { Eye, EyeOff } from '../../sources';
import { colors } from '../../themes';

interface Props extends TextInputProps {
  label: string,
  error?: string,
  isSecret?: boolean,
  t?: 'Top' | 'Mid' | 'Bot'
}

function Input({ label, error, ...props }: Props) {

  return (
    <View style={{
      borderTopWidth: 0.7,
      borderTopColor: colors.echoThick,
      flexDirection: 'row',
      paddingHorizontal: 24
    }}>

      <Text style={{ ...paragraph, paddingVertical: 16, flex: 0.4, color: colors.teal }}>
        {label}
      </Text>

      <TextInput
        selectionColor={colors.red}
        style={{ ...h4, flex: 1, paddingVertical: 12, paddingHorizontal: 0 }}

        returnKeyType='next'
        keyboardType='web-search'

        autoCapitalize='none'
        underlineColorAndroid='transparent'
        autoCorrect={false}
        spellCheck={false}
        {...props}
      />
    </View>
  )
}

const LoginInput = ({ label, error, t, isSecret, ...props }: Props) => {

  const [secret, setSecret] = React.useState<boolean>(!!isSecret);

  const moreStyles = t === 'Top' ? {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  } : t === 'Bot' ? {
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  } : {
    borderRadius: 0,
    borderTopWidth: 0
  }

  return (
    <View style={{
      marginBottom: -1.4,
      borderWidth: 1.4,
      borderColor: colors.teal,
      flexDirection: 'row',
      ...moreStyles
    }}
    >
      <View style={{ width: 24 }} />

      <TextInput
        placeholderTextColor='#F5F5F5'
        style={{ ...h4, color: '#F5F5F5', flex: 1, padding: 0 }}
        secureTextEntry={secret}
        textAlignVertical='center'

        autoCapitalize='none'
        underlineColorAndroid='transparent'
        autoCorrect={false}
        spellCheck={false}
        {...props}
      />

      <View style={{ height: 58 }}>
        {isSecret && (
          <TouchableOpacity
            style={{ justifyContent: 'center', height: '100%', paddingHorizontal: 24 }}
            onPress={() => setSecret(!secret)}
          >
            {!secret ? <Eye /> : <EyeOff />}
          </TouchableOpacity>
        )}
      </View>

    </View>
  )
}

export { Input, LoginInput }