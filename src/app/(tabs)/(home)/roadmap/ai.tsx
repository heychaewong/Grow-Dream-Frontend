import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GoalAddRow } from '@/components/roadmap/goal-add-row';
import { AppText } from '@/components/ui/app-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, FontFamily, FontSize, Radius, Spacing } from '@/constants/theme';
import { goalCatalog, shortTermPlans } from '@/data/roadmap';
import { useRoadmapStore } from '@/store/roadmap-store';

const FILTERS = {
  성별: ['전체', '여성', '남성'],
  나이: ['전체', '10대', '20대 초반', '20대 후반'],
  기간: ['전체', '1년 이내', '3년 이내', '5년 이내'],
} as const;

type FilterKey = keyof typeof FILTERS;

const comingSoon = (title: string) => router.push({ pathname: '/coming-soon', params: { title } });

export default function AiRecommendScreen() {
  const params = useLocalSearchParams<{ roadmapId?: string; goal?: string }>();
  const { roadmaps, addGoal } = useRoadmapStore();
  const roadmap = roadmaps.find((r) => r.id === params.roadmapId) ?? roadmaps[0];
  const [finalGoal, setFinalGoal] = useState(params.goal ?? '');
  const [filters, setFilters] = useState<Record<FilterKey, number>>({ 성별: 0, 나이: 0, 기간: 0 });
  const [showAll, setShowAll] = useState(false);

  const addedTitles = roadmap.goals.map((g) => g.title);
  const recommended = goalCatalog.filter((g) => g.title !== finalGoal).slice(0, 6);
  const visible = showAll ? recommended : recommended.slice(0, 3);

  const cycleFilter = (key: FilterKey) =>
    setFilters((f) => ({ ...f, [key]: (f[key] + 1) % FILTERS[key].length }));

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="AI 추천받기" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* 조건 입력 */}
        <View style={styles.filters}>
          <TextInput
            value={finalGoal}
            onChangeText={setFinalGoal}
            placeholder="최종 목표 입력"
            placeholderTextColor={Colors.textMuted}
            style={styles.goalInput}
            accessibilityLabel="최종 목표 입력"
          />
          {(Object.keys(FILTERS) as FilterKey[]).map((key) => {
            const value = FILTERS[key][filters[key]];
            return (
              <Pressable
                key={key}
                onPress={() => cycleFilter(key)}
                style={styles.filter}
                accessibilityRole="button"
                accessibilityLabel={`${key}: ${value}`}>
                <AppText size="small" weight="medium" numberOfLines={1}>
                  {filters[key] === 0 ? key : value}
                </AppText>
                <Ionicons name="chevron-down" size={14} color={Colors.text} />
              </Pressable>
            );
          })}
        </View>

        <View style={styles.divider} />

        {/* 추천 목표 */}
        <Section
          icon="robot-happy-outline"
          caption={`추천 목표 ${recommended.length}개`}
          title="이런 목표는 어떠세요?">
          {visible.map((g) => (
            <GoalAddRow
              key={g.title}
              goal={g}
              added={addedTitles.includes(g.title)}
              onAdd={() => addGoal(roadmap.id, g)}
            />
          ))}
          {recommended.length > 3 && (
            <Pressable hitSlop={8} onPress={() => setShowAll((s) => !s)} style={styles.more} accessibilityRole="button">
              <AppText size="small" color={Colors.textMuted}>
                {showAll ? '접기' : '더보기'}
              </AppText>
              <Ionicons name={showAll ? 'chevron-up' : 'chevron-down'} size={14} color={Colors.textMuted} />
            </Pressable>
          )}
        </Section>

        {/* 추천 Short-term 플랜 */}
        <Section
          icon="calendar-check-outline"
          caption={`추천 Short-term 플랜 ${shortTermPlans.length}개`}
          title="맞춤 목표 묶음 플랜이에요.">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.plans}>
            {shortTermPlans.map((plan) => (
              <View key={plan.title} style={styles.planCard}>
                <AppText size="bodyLarge" weight="bold">
                  {plan.title}
                </AppText>
                <PlanBar steps={plan.steps} />
              </View>
            ))}
          </ScrollView>
        </Section>

        {/* Best Case */}
        <Section
          icon="thumb-up-outline"
          caption="키워드림 Best Case 1개를 발견했어요!"
          title="같은 최종 목표를 설정하고 실천했어요.">
          <View style={styles.bestCard}>
            <View style={styles.bestTop}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={28} color={Colors.white} />
              </View>
              <AppText size="body" weight="bold" style={styles.flex}>
                (익명) 님의 진로 로드맵
              </AppText>
              <Pressable hitSlop={8} onPress={() => comingSoon('Best Case 로드맵')} style={styles.seeButton} accessibilityRole="button">
                <AppText size="small" weight="semibold" color={Colors.white}>
                  보러가기
                </AppText>
              </Pressable>
            </View>
            <PlanBar steps={shortTermPlans[0].steps} />
            <Pressable hitSlop={8} onPress={() => comingSoon('Best Case')} style={styles.more} accessibilityRole="button">
              <AppText size="small" color={Colors.textMuted}>
                더 알아보기
              </AppText>
              <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
            </Pressable>
          </View>
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({
  icon,
  caption,
  title,
  children,
}: {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  caption: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <View style={styles.sectionIcon}>
          <MaterialCommunityIcons name={icon} size={26} color={Colors.blue} />
        </View>
        <View>
          <AppText size="small" weight="semibold" color={Colors.blue}>
            {caption}
          </AppText>
          <AppText size="bodyLarge" weight="bold">
            {title}
          </AppText>
        </View>
      </View>
      {children}
    </View>
  );
}

/** 단계별 비중을 색 막대로 보여주고 아래에 범례를 달아요. */
function PlanBar({ steps }: { steps: { label: string; weight: number; color: string }[] }) {
  return (
    <View style={styles.planBarWrap}>
      <View style={styles.planBar}>
        {steps.map((s) => (
          <View key={s.label} style={{ flex: s.weight, backgroundColor: s.color }} />
        ))}
      </View>
      <View style={styles.legend}>
        {steps.map((s) => (
          <View key={s.label} style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: s.color }]} />
            <AppText size="caption">{s.label}</AppText>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  flex: { flex: 1 },
  scroll: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.xl,
  },
  filters: {
    flexDirection: 'row',
    gap: 6,
  },
  goalInput: {
    flex: 1.4,
    minWidth: 0,
    height: 44,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.blueTint,
    fontFamily: FontFamily.semibold,
    fontSize: FontSize.small,
    color: Colors.text,
    outlineWidth: 0,
  },
  filter: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    height: 44,
    paddingHorizontal: 4,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  section: {
    gap: Spacing.sm,
  },
  sectionHead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.xs,
  },
  sectionIcon: {
    width: 47,
    height: 47,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.blueTint,
  },
  more: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 2,
    paddingVertical: Spacing.xs,
  },
  plans: {
    gap: Spacing.md,
  },
  planCard: {
    width: 300,
    gap: Spacing.md,
    padding: Spacing.lg,
    borderRadius: Radius.md,
    backgroundColor: Colors.blueTint,
  },
  planBarWrap: {
    gap: Spacing.sm,
  },
  planBar: {
    flexDirection: 'row',
    height: 18,
    borderRadius: 4,
    overflow: 'hidden',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 2,
  },
  bestCard: {
    gap: Spacing.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
  },
  bestTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primarySoft,
  },
  seeButton: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 5,
    borderRadius: Radius.sm,
    backgroundColor: Colors.blue,
  },
});
