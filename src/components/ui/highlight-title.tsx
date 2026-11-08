import { StyleSheet, View, type ViewStyle } from 'react-native';

import { Colors, FontSize } from '@/constants/theme';

import { AppText } from './app-text';

type HighlightTitleProps = {
  children: string;
  size?: keyof typeof FontSize;
  style?: ViewStyle;
};

/** 글자 아래쪽 절반에 형광펜처럼 노란 띠가 깔린 제목 (커뮤니티, 마이페이지 등) */
export function HighlightTitle({ children, size = 'headline', style }: HighlightTitleProps) {
  return (
    <View style={[styles.wrap, style]}>
      <View style={styles.marker} />
      <AppText size={size} weight="extrabold">
        {children}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
    paddingHorizontal: 4,
  },
  marker: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 2,
    height: '45%',
    backgroundColor: Colors.highlight,
  },
});
