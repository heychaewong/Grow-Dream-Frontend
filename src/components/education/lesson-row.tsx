import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';

type LessonRowProps = {
  badge: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  /** 오른쪽 끝 (기본은 > 화살표) */
  right?: ReactNode;
  locked?: boolean;
};

/** "1강 돈 관리하기 >" 형태의 강의/장 카드 */
export function LessonRow({ badge, title, subtitle, onPress, right, locked }: LessonRowProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${badge} ${title}${locked ? ', 잠김' : ''}`}
      style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]}>
      <View style={styles.badge}>
        <AppText size="title" weight="bold">
          {badge}
        </AppText>
      </View>
      <View style={styles.texts}>
        <AppText size="bodyLarge" weight="bold">
          {title}
        </AppText>
        {subtitle && (
          <AppText size="caption" weight="medium">
            {subtitle}
          </AppText>
        )}
      </View>
      {right ?? <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />}
    </Pressable>
  );
}

/** 장 목록 오른쪽의 "완료 / 미완료" 동그라미 */
export function DoneCircle({ done }: { done: boolean }) {
  return (
    <View style={[styles.done, { backgroundColor: done ? Colors.primary : Colors.track }]}>
      <AppText size={done ? 'body' : 'caption'} weight="bold" color={Colors.white}>
        {done ? '완료' : '미완료'}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    backgroundColor: Colors.white,
  },
  badge: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryTint,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  done: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
