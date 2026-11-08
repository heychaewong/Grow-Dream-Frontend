import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

import { AppModal } from '@/components/ui/app-modal';
import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { GOAL_TYPE_LABEL, type Goal } from '@/data/roadmap';

type GoalDetailModalProps = {
  goal: Goal | null;
  index: number;
  onClose: () => void;
  onToggleDone: () => void;
  onRecommend: () => void;
};

const CHECKABLE = new Set(['certificate', 'activity']);

/** 정류장을 눌렀을 때 뜨는 목표 상세 카드 */
export function GoalDetailModal({ goal, index, onClose, onToggleDone, onRecommend }: GoalDetailModalProps) {
  return (
    <AppModal visible={goal !== null} onClose={onClose} cardStyle={styles.card}>
      {goal && (
        <>
          <View style={styles.body}>
            <View style={styles.topRow}>
              <AppText size="bodyLarge" weight="bold">
                선택: 목표 {index + 1}
              </AppText>
              {goal.age !== undefined && (
                <View style={styles.agePill}>
                  <AppText size="small" weight="semibold">
                    {goal.age}살
                  </AppText>
                </View>
              )}
              <Pressable onPress={onClose} hitSlop={12} style={styles.close} accessibilityLabel="닫기">
                <Ionicons name="close" size={22} color={Colors.textMuted} />
              </Pressable>
            </View>

            {/* TODO: 목표별 대표 이미지 (Figma의 캠퍼스 사진 자리) */}
            <View style={styles.image}>
              <MaterialCommunityIcons name="image-outline" size={40} color={Colors.blue} />
              <AppText size="caption" color={Colors.textMuted}>
                {GOAL_TYPE_LABEL[goal.type]}
              </AppText>
            </View>

            <AppText size="title" weight="bold">
              {goal.title}
            </AppText>

            {(goal.tag || goal.info) && (
              <View style={styles.infoRow}>
                {goal.tag && (
                  <View style={styles.tag}>
                    <AppText size="caption" weight="semibold" color={Colors.white}>
                      {goal.tag}
                    </AppText>
                  </View>
                )}
                {goal.info && (
                  <AppText size="caption" style={styles.flex}>
                    {goal.info}
                  </AppText>
                )}
              </View>
            )}

            {CHECKABLE.has(goal.type) && (
              <Pressable
                onPress={onToggleDone}
                style={styles.check}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: !!goal.done }}>
                <Ionicons
                  name={goal.done ? 'checkbox' : 'square-outline'}
                  size={22}
                  color={goal.done ? Colors.primary : Colors.textMuted}
                />
                <AppText size="body" weight="medium">
                  {goal.done ? '완료했어요!' : '완료 표시하기'}
                </AppText>
              </Pressable>
            )}
          </View>

          <Pressable
            onPress={onRecommend}
            style={({ pressed }) => [styles.recommend, pressed && { opacity: 0.85 }]}
            accessibilityRole="button">
            <AppText size="body" weight="bold" color={Colors.white}>
              AI 목표 추천 받기
            </AppText>
          </Pressable>
        </>
      )}
    </AppModal>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radius.lg,
  },
  body: {
    padding: Spacing.xl,
    gap: Spacing.md,
  },
  flex: { flex: 1 },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  agePill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 2,
    borderRadius: Radius.sm,
    backgroundColor: Colors.blueTint,
  },
  close: {
    marginLeft: 'auto',
  },
  image: {
    height: 130,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    backgroundColor: Colors.blueTint,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  tag: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: Colors.blue,
  },
  check: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    alignSelf: 'flex-start',
  },
  recommend: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    backgroundColor: Colors.blue,
  },
});
