import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { EditPanel } from '@/components/roadmap/edit-panel';
import { GoalDetailModal } from '@/components/roadmap/goal-detail-modal';
import { RouteMap } from '@/components/roadmap/route-map';
import { AppText } from '@/components/ui/app-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { currentUser } from '@/data/user';
import { useRoadmapStore } from '@/store/roadmap-store';

export default function RoadmapScreen() {
  const params = useLocalSearchParams<{ id?: string }>();
  const { roadmaps, addGoal, removeGoal, toggleGoalDone } = useRoadmapStore();
  const [selectedId, setSelectedId] = useState(params.id ?? roadmaps[0].id);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const [editing, setEditing] = useState(false);

  const roadmap = roadmaps.find((r) => r.id === selectedId) ?? roadmaps[0];
  const detailGoal = detailIndex !== null ? (roadmap.goals[detailIndex] ?? null) : null;
  const finalGoal = roadmap.goals[roadmap.goals.length - 1];

  const selectRoadmap = (id: string) => {
    setSelectedId(id);
    setPickerOpen(false);
    setEditing(false);
  };

  const openRecommend = () => {
    setDetailIndex(null);
    router.push({ pathname: '/roadmap/ai', params: { roadmapId: roadmap.id, goal: detailGoal?.title ?? finalGoal?.title } });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="진로 로드맵" />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.top}>
          <AppText size="bodyLarge" weight="bold">
            {currentUser.name} 님의 로드맵{' '}
            <AppText size="bodyLarge" weight="bold" color={Colors.blue}>
              {roadmaps.length}
            </AppText>
            개
          </AppText>

          {/* 로드맵 선택 드롭다운 */}
          <View style={styles.pickerWrap}>
            <Pressable
              onPress={() => setPickerOpen((o) => !o)}
              style={styles.picker}
              accessibilityRole="button"
              accessibilityLabel={`로드맵 선택: ${roadmap.title}`}
              accessibilityState={{ expanded: pickerOpen }}>
              <AppText size="body" weight="medium" numberOfLines={1} style={styles.flex}>
                {roadmap.title}
              </AppText>
              <Ionicons name={pickerOpen ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.text} />
            </Pressable>
            {pickerOpen && (
              <View style={styles.menu}>
                {roadmaps.map((r) => (
                  <Pressable
                    key={r.id}
                    onPress={() => selectRoadmap(r.id)}
                    style={({ pressed }) => [styles.menuItem, pressed && { backgroundColor: Colors.blueTint }]}
                    accessibilityRole="menuitem">
                    <AppText size="body" weight={r.id === roadmap.id ? 'bold' : 'regular'}>
                      {r.title}
                    </AppText>
                  </Pressable>
                ))}
              </View>
            )}
          </View>
        </View>

        <RouteMap
          goals={roadmap.goals}
          onPressGoal={setDetailIndex}
          editing={editing}
          onRemoveGoal={(i) => removeGoal(roadmap.id, roadmap.goals[i].id)}
        />

        <View style={styles.bottom}>
          <Pressable
            onPress={() => router.push({ pathname: '/roadmap/explore', params: { roadmapId: roadmap.id } })}
            style={({ pressed }) => [styles.exploreButton, pressed && { opacity: 0.8 }]}
            accessibilityRole="button">
            <AppText size="bodyLarge" weight="bold">
              목표 탐색하러 가기
            </AppText>
          </Pressable>

          <EditPanel
            suggestions={roadmap.suggestions}
            addedTitles={roadmap.goals.map((g) => g.title)}
            editing={editing}
            onToggleEditing={() => setEditing((e) => !e)}
            onAdd={(goal) => addGoal(roadmap.id, goal)}
          />
        </View>
      </ScrollView>

      <GoalDetailModal
        goal={detailGoal}
        index={detailIndex ?? 0}
        onClose={() => setDetailIndex(null)}
        onToggleDone={() => detailGoal && toggleGoalDone(roadmap.id, detailGoal.id)}
        onRecommend={openRecommend}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  flex: { flex: 1 },
  scroll: { paddingBottom: Spacing.xxl },
  top: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    gap: Spacing.md,
    zIndex: 2,
  },
  pickerWrap: {
    alignSelf: 'flex-start',
    minWidth: 222,
    maxWidth: '80%',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.md,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.text,
    borderRadius: Radius.md,
    backgroundColor: Colors.white,
  },
  menu: {
    position: 'absolute',
    top: 44,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
    backgroundColor: Colors.white,
    overflow: 'hidden',
  },
  menuItem: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  bottom: {
    paddingHorizontal: Spacing.xl,
    gap: Spacing.xl,
  },
  exploreButton: {
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderRadius: Radius.md,
    backgroundColor: Colors.beige,
  },
});
