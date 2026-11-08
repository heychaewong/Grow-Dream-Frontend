import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

type ScreenHeaderProps = {
  title: string;
  /** 뒤로가기 화살표를 숨기려면 false */
  showBack?: boolean;
  right?: ReactNode;
};

/** ← 제목 ⋮ 형태의 공통 상단 바 */
export function ScreenHeader({ title, showBack = true, right }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      {showBack && (
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/'))}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="뒤로 가기">
          <Ionicons name="arrow-back" size={26} color={Colors.text} />
        </Pressable>
      )}
      <AppText size="headline" weight="bold" style={styles.title} numberOfLines={1}>
        {title}
      </AppText>
      {right ?? <Ionicons name="ellipsis-vertical" size={22} color={Colors.text} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.white,
  },
  title: {
    flex: 1,
  },
});
