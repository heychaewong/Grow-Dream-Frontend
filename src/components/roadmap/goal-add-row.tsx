import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { GOAL_TYPE_LABEL, type Goal } from '@/data/roadmap';

type GoalAddRowProps = {
  goal: Omit<Goal, 'id'>;
  added: boolean;
  onAdd: () => void;
};

/** "국립 채원 대학교 입학  [추가하기]" 한 줄 */
export function GoalAddRow({ goal, added, onAdd }: GoalAddRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.texts}>
        <AppText size="bodyLarge" weight="semibold">
          {goal.title}
        </AppText>
        <AppText size="caption" color={Colors.textMuted}>
          {GOAL_TYPE_LABEL[goal.type]}
          {goal.tag ? ` · ${goal.tag}` : ''}
        </AppText>
      </View>
      <Pressable
        onPress={onAdd}
        disabled={added}
        accessibilityRole="button"
        accessibilityLabel={`${goal.title} ${added ? '추가됨' : '로드맵에 추가'}`}
        style={({ pressed }) => [styles.button, added && styles.added, pressed && { opacity: 0.7 }]}>
        <AppText size="small" weight="semibold" color={added ? Colors.textMuted : Colors.white}>
          {added ? '추가됨' : '추가하기'}
        </AppText>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  texts: {
    flex: 1,
    gap: 2,
  },
  button: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: Radius.sm,
    backgroundColor: Colors.blue,
  },
  added: {
    backgroundColor: Colors.surface,
  },
});
