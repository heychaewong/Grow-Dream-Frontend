import { Platform, StyleSheet, Text, type TextProps, type TextStyle } from 'react-native';

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
    // 웹 브라우저는 한글을 글자 단위로 줄바꿈해서, 단어 단위로 끊기도록 맞춰요.
    ...(Platform.OS === 'web' ? ({ wordBreak: 'keep-all' } as TextStyle) : null),
  },
});
