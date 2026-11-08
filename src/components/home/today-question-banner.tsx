import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Spacing } from '@/constants/theme';

type TodayQuestionBannerProps = {
  number: number;
  highlight: string;
  rest: string;
  onPressAnswer: () => void;
};

const RING_COUNT = 3;

/** 스프링 노트 모양의 "오늘의 질문" 배너 */
export function TodayQuestionBanner({ number, highlight, rest, onPressAnswer }: TodayQuestionBannerProps) {
  return (
    <View style={styles.container}>
      {/* 노트 스프링 고리 */}
      <View style={styles.rings} pointerEvents="none">
        {Array.from({ length: RING_COUNT }, (_, i) => (
          <View key={i} style={styles.ringRow}>
            <View style={styles.wire} />
            <View style={styles.ring} />
          </View>
        ))}
      </View>

      <View style={styles.content}>
        <View style={styles.question}>
          <AppText size="body" weight="medium">
            No.{String(number).padStart(2, '0')}
          </AppText>
          <AppText size="body" style={styles.questionText}>
            <AppText size="body" weight="bold">
              {highlight}
            </AppText>
            {rest}
          </AppText>
        </View>

        <Pressable
          onPress={onPressAnswer}
          accessibilityRole="button"
          style={({ pressed }) => [styles.answer, pressed && { opacity: 0.6 }]}>
          <Ionicons name="create-outline" size={18} color={Colors.textMuted} />
          <AppText size="body" color={Colors.textMuted}>
            답변 작성하기
          </AppText>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 204,
    backgroundColor: Colors.cream,
    overflow: 'hidden',
  },
  rings: {
    width: 46,
    paddingTop: 16,
    gap: 52,
  },
  ringRow: {
    height: 23,
    justifyContent: 'center',
  },
  wire: {
    position: 'absolute',
    left: 0,
    width: 34,
    height: 13,
    borderRadius: 6,
    backgroundColor: Colors.surface,
  },
  ring: {
    marginLeft: 21,
    width: 23,
    height: 23,
    borderRadius: 12,
    borderWidth: 4,
    borderColor: '#6B6B6B',
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingTop: 16,
    paddingRight: Spacing.xl,
    paddingLeft: Spacing.lg,
    gap: Spacing.lg,
  },
  question: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: Colors.white,
  },
  questionText: {
    flex: 1,
  },
  answer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: Spacing.sm,
    alignSelf: 'flex-start',
  },
});
