import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, FontFamily, FontSize, Radius, Spacing } from '@/constants/theme';
import type { Goal, GoalType } from '@/data/roadmap';

type Tool = { key: GoalType | 'move'; label: string; icon: keyof typeof MaterialCommunityIcons.glyphMap };

const TOOLS: Tool[] = [
  { key: 'school', label: '목표', icon: 'plus-circle-outline' },
  { key: 'certificate', label: '자격증', icon: 'plus-circle-outline' },
  { key: 'activity', label: '활동', icon: 'plus-box-outline' },
  { key: 'move', label: '삭제', icon: 'arrow-all' },
];

type EditPanelProps = {
  suggestions: Omit<Goal, 'id'>[];
  addedTitles: string[];
  editing: boolean;
  onToggleEditing: () => void;
  onAdd: (goal: Omit<Goal, 'id'>) => void;
};

/** 파란 "로드맵 편집" 패널: 도구 버튼 + 추천 활동 추가 */
export function EditPanel({ suggestions, addedTitles, editing, onToggleEditing, onAdd }: EditPanelProps) {
  const [newType, setNewType] = useState<GoalType | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const pressTool = (tool: Tool) => {
    if (tool.key === 'move') {
      setNewType(null);
      onToggleEditing();
      return;
    }
    setNewType((t) => (t === tool.key ? null : (tool.key as GoalType)));
  };

  const submitNew = () => {
    if (!newType || !newTitle.trim()) return;
    onAdd({ type: newType, title: newTitle.trim() });
    setNewTitle('');
    setNewType(null);
  };

  return (
    <View style={styles.panel}>
      <AppText size="title" weight="bold">
        로드맵 편집
      </AppText>

      <View style={styles.tools}>
        {TOOLS.map((tool) => {
          const active = tool.key === 'move' ? editing : newType === tool.key;
          const small = tool.key === 'certificate';
          return (
            <Pressable
              key={tool.key}
              onPress={() => pressTool(tool)}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}
              accessibilityLabel={tool.key === 'move' ? '정류장 삭제 모드' : `${tool.label} 추가`}
              style={styles.toolColumn}>
              <View style={[styles.tool, active && styles.toolActive]}>
                <MaterialCommunityIcons name={tool.icon} size={small ? 26 : 36} color={Colors.text} />
              </View>
              <AppText size="caption" color={Colors.textSub}>
                {tool.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      {newType && (
        <View style={styles.row}>
          <TextInput
            value={newTitle}
            onChangeText={setNewTitle}
            onSubmitEditing={submitNew}
            placeholder="새 목표 이름을 입력하세요"
            placeholderTextColor={Colors.textMuted}
            style={styles.input}
            autoFocus
            accessibilityLabel="새 목표 이름"
          />
          <AddButton label="추가하기" onPress={submitNew} disabled={!newTitle.trim()} />
        </View>
      )}

      {editing && (
        <AppText size="small" color={Colors.blue}>
          정류장의 빨간 X를 누르면 목표가 삭제돼요.
        </AppText>
      )}

      <View style={styles.list}>
        {suggestions.map((s) => {
          const added = addedTitles.includes(s.title);
          return (
            <View key={s.title} style={styles.row}>
              <AppText size="body" style={styles.rowTitle} numberOfLines={1}>
                {s.title}
              </AppText>
              <AddButton label={added ? '추가됨' : '추가하기'} onPress={() => onAdd(s)} disabled={added} />
            </View>
          );
        })}
      </View>
    </View>
  );
}

function AddButton({ label, onPress, disabled }: { label: string; onPress: () => void; disabled?: boolean }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      style={({ pressed }) => [styles.add, (pressed || disabled) && { opacity: 0.5 }]}>
      <AppText size="small" weight="semibold" color={Colors.white}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: Spacing.lg,
    padding: Spacing.xl,
    borderRadius: Radius.md,
    backgroundColor: Colors.blueTint,
  },
  tools: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  toolColumn: {
    alignItems: 'center',
    gap: 4,
  },
  tool: {
    width: 51,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: Colors.white,
  },
  toolActive: {
    borderColor: Colors.blue,
  },
  list: {
    backgroundColor: Colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'stretch',
    minHeight: 44,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  rowTitle: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: Spacing.lg,
  },
  input: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.text,
    outlineWidth: 0,
  },
  add: {
    width: 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blue,
  },
});
