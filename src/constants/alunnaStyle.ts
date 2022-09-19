import { TextProps, TextStyle } from 'react-native';
import { colors } from '../themes'

export const fontSize = {
  h1: 28,
  h2: 22,
  h3: 20,
  h4: 16,
  paragraph: 14,
  small: 12,
  xs: 10
};

const textBase: TextStyle = {
  color: colors.betaThick,
  includeFontPadding: false,
  letterSpacing: 0,
  textAlign: 'left',
  textAlignVertical: 'top'
};

export const h1: TextStyle = {
  ...textBase,
  fontSize: fontSize.h1,
  lineHeight: fontSize.h1 * 1.3
};

export const h2: TextStyle = {
  ...textBase,
  fontSize: fontSize.h2,
  lineHeight: fontSize.h2 * 1.3
};

export const h3: TextStyle = {
  ...textBase,
  fontSize: fontSize.h3,
  lineHeight: fontSize.h3 * 1.3
};

export const h4: TextStyle = {
  ...textBase,
  fontSize: fontSize.h4,
  lineHeight: fontSize.h4 * 1.4,
  letterSpacing: 0.15
};

export const paragraph: TextStyle = {
  ...textBase,
  fontSize: fontSize.paragraph,
  lineHeight: fontSize.paragraph * 1.4,
  letterSpacing: 0.15
};

export const small: TextStyle = {
  ...textBase,
  fontSize: fontSize.small,
  lineHeight: fontSize.small * 1.3,
  letterSpacing: 0.1
};

export const xsmall: TextStyle = {
  ...textBase,
  fontSize: fontSize.xs,
  lineHeight: fontSize.xs * 1.3,
  letterSpacing: 0.4
};