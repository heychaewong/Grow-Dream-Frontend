import { StyleSheet, Text, type TextProps } from 'react-native';

import { Colors, FontFamily, FontSize, type FontWeightName } from '@/constants/theme';

export type AppTextProps = TextProps & {
  size?: keyof typeof FontSize;
  weight?: FontWeightName;
  color?: string;
};

/** 앱 전체에서 쓰는 기본 텍스트. Pretendard 굵기를 weight로 고르면 돼요. */
export function AppText({
  size = 'body',
  weight = 'regular',
  color = Colors.text,
  style,
  ...rest
}: AppTextProps) {
  const fontSize = FontSize[size];
  return (
    <Text
      style={[
        styles.base,
        { fontFamily: FontFamily[weight], fontSize, lineHeight: Math.round(fontSize * 1.4), color },
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
