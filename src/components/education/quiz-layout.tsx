import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, Radius, Spacing } from '@/constants/theme';

type QuizLayoutProps = {
  title: string;
  headerRight?: ReactNode;
  children: ReactNode;
  /** 아래쪽 버튼 영역 (이전 / 다음 / 제출) */
  footer?: ReactNode;
};

/** 학습·퀴즈·이슈 화면 공통 틀: 흰 헤더 + 연두색 본문 + 아래 버튼 */
export function QuizLayout({ title, headerRight, children, footer }: QuizLayoutProps) {
  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title={title} right={headerRight} />
      <View style={styles.panel}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
        {footer && <View style={styles.footer}>{footer}</View>}
      </View>
    </SafeAreaView>
  );
}

type QuizButtonProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

/** 흰색 둥근 "다음" / "이전" / "제출" 버튼 */
export function QuizButton({ label, onPress, disabled }: QuizButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      style={({ pressed }) => [styles.button, (pressed || disabled) && { opacity: 0.5 }]}>
      <AppText size="bodyLarge" weight="bold" color={Colors.textMuted}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  panel: {
    flex: 1,
    marginTop: Spacing.xl,
    marginBottom: Spacing.xxl,
    backgroundColor: Colors.primaryTint,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xxl,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
  },
  button: {
    minWidth: 76,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: Spacing.lg,
    borderRadius: Radius.md,
    backgroundColor: Colors.white,
  },
});
