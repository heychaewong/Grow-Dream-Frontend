import { Pressable, StyleSheet } from 'react-native';

import { AppModal } from '@/components/ui/app-modal';
import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';

type ResultModalProps = {
  visible: boolean;
  onClose: () => void;
  correct: number;
  total: number;
  /** 이번에 받은 코인 (이미 받은 퀴즈면 0) */
  rewarded: number;
};

/** 초록색 "총 N문제를 맞히셨습니다! N코인 지급" 팝업 */
export function ResultModal({ visible, onClose, correct, total, rewarded }: ResultModalProps) {
  const message = correct === 0 ? '아쉬워요!\n다시 도전해 볼까요?' : `총 ${correct}문제를\n맞히셨습니다!`;
  const reward = rewarded > 0 ? `${rewarded}코인 지급` : correct > 0 ? '이미 코인을 받은 퀴즈예요' : `${total}문제 중 0문제 정답`;

  return (
    <AppModal visible={visible} onClose={onClose} cardStyle={styles.card}>
      <AppText size="display" weight="extrabold" color={Colors.white} style={styles.message}>
        {message}
      </AppText>
      <AppText size="title" weight="bold" color={Colors.white}>
        {reward}
      </AppText>
      <Pressable onPress={onClose} style={styles.close} accessibilityRole="button">
        <AppText size="body" weight="bold">
          닫기
        </AppText>
      </Pressable>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    borderRadius: 0,
    backgroundColor: Colors.quizGreen,
  },
  message: {
    textAlign: 'center',
    fontSize: 34,
    lineHeight: 46,
  },
  close: {
    marginTop: Spacing.xs,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: 2,
    borderRadius: Radius.pill,
    backgroundColor: Colors.white,
  },
});
