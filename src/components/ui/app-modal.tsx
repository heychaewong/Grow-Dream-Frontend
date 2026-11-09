import { Ionicons } from '@expo/vector-icons';
import type { ReactNode } from 'react';
import { Modal, Pressable, StyleSheet, View, type ViewStyle } from 'react-native';

import { AppMaxWidth, Colors, Radius, Spacing } from '@/constants/theme';

import { AppText } from './app-text';

type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  /** 카드 위쪽에 따로 띄울 내용 (예: "정답입니다!") */
  above?: ReactNode;
  cardStyle?: ViewStyle;
  /** 오른쪽 위 X 버튼 */
  showClose?: boolean;
};

/** 화면을 어둡게 덮고 가운데 카드를 띄우는 기본 팝업 */
export function AppModal({ visible, onClose, children, above, cardStyle, showClose }: AppModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} accessibilityLabel="팝업 닫기">
        <View style={styles.column}>
          {above}
          {/* 카드 안쪽을 눌렀을 땐 닫히지 않게 막아요 */}
          <Pressable style={[styles.card, cardStyle]} onPress={() => {}}>
            {showClose && (
              <Pressable onPress={onClose} hitSlop={12} style={styles.close} accessibilityLabel="닫기">
                <Ionicons name="close" size={26} color={Colors.text} />
              </Pressable>
            )}
            {children}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}

/** 해설 팝업 */
export function ExplanationModal({
  visible,
  onClose,
  text,
  above,
}: {
  visible: boolean;
  onClose: () => void;
  text: string;
  above?: ReactNode;
}) {
  return (
    <AppModal visible={visible} onClose={onClose} showClose above={above} cardStyle={styles.explanationCard}>
      <AppText size="body" style={styles.explanation}>
        {text}
      </AppText>
    </AppModal>
  );
}

/** "이전 강의를 수강한 후 수강하여 주십시오" 경고 팝업 */
export function LockedAlertModal({
  visible,
  onClose,
  message = '이전 강의를 수강한 후\n수강하여 주십시오',
}: {
  visible: boolean;
  onClose: () => void;
  message?: string;
}) {
  return (
    <AppModal visible={visible} onClose={onClose} cardStyle={styles.alertCard}>
      <View style={styles.alertTop}>
        <AppText style={styles.siren}>🚨</AppText>
      </View>
      <AppText size="bodyLarge" weight="bold" style={styles.alertMessage}>
        {message}
      </AppText>
      <Pressable onPress={onClose} style={styles.alertButton} accessibilityRole="button">
        <AppText size="body" weight="bold" color={Colors.white}>
          닫기
        </AppText>
      </Pressable>
    </AppModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.dim,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  column: {
    width: '100%',
    maxWidth: AppMaxWidth - Spacing.xl * 2,
    alignItems: 'center',
    gap: Spacing.xl,
  },
  card: {
    width: '100%',
    backgroundColor: Colors.white,
    borderRadius: 28,
    overflow: 'hidden',
  },
  close: {
    alignSelf: 'flex-end',
    margin: Spacing.lg,
    marginBottom: 0,
  },
  explanationCard: {
    paddingBottom: Spacing.xxl,
    minHeight: 240,
  },
  explanation: {
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
  },
  alertCard: {
    alignItems: 'center',
    paddingBottom: Spacing.xl,
    borderRadius: 40,
  },
  alertTop: {
    alignSelf: 'stretch',
    height: 62,
    backgroundColor: Colors.alert,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  siren: {
    fontSize: 44,
    lineHeight: 52,
    marginBottom: -24,
  },
  alertMessage: {
    textAlign: 'center',
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  alertButton: {
    backgroundColor: Colors.alert,
    borderRadius: Radius.pill,
    paddingHorizontal: Spacing.xxl,
    paddingVertical: 4,
  },
});
