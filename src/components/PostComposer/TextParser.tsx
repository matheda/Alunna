import React from 'react';
import { Linking, Text, TextProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useItsMe } from '../../hooks/useItsMe';
import { NavigationProps } from '../../services/types';

import { colors } from '../../themes';
import { urlRegex } from '../../utils';
import { paragraph } from '../../constants/alunnaStyle';

interface Props extends TextProps { }

function TextParser({ children, ...props }: Props) {

  const navigation = useNavigation<NavigationProps>();

  if (typeof children !== 'string') return <Text>{children}</Text>

  function hash(value: string) {
    navigation.navigate('Explorer', { value: value })
  }

  async function user(value: string) {
    await useItsMe({ match: value.replace('@', '') }) ?
      navigation.navigate('Me') :
      navigation.navigate('Profile', { username: value.replace('@', '') });
  }

  function url(value: string) {
    const url = String(value);
    Linking.canOpenURL(url).then((supported) => {
      supported ? Linking.openURL(url) : Linking.openURL('https://' + url);
    })
  }

  const getWords: string[] = children.split(/\s/);

  var contents = getWords.map((word, key) => {

    const space: string = key < (getWords.length - 1) ? ' ' : '';

    if (/#([A-zÀ-ú]+)/.test(word)) return (
      <Text key={key} onPress={() => hash(word)} style={{ color: colors.purple }}>
        {word}{space}
      </Text>
    )

    if (/@(\w+)/.test(word)) return (
      <Text key={key} onPress={() => user(word)} style={{ color: colors.purple }}>
        {word}{space}
      </Text>
    )

    if (urlRegex.test(word)) return (
      <Text key={key} onPress={() => url(word)} style={{ color: colors.teal, backgroundColor: colors.purpleThick }}>
        {word}{space}
      </Text>
    )

    return word + space

  })

  return (
    <Text style={{ ...paragraph }} numberOfLines={16} ellipsizeMode='tail' {...props}>
      {contents}
    </Text>
  );
};

export { TextParser }
