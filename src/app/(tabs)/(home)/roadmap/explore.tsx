import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { GoalAddRow } from '@/components/roadmap/goal-add-row';
import { AppText } from '@/components/ui/app-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, FontFamily, FontSize, Radius, Spacing } from '@/constants/theme';
import { goalCatalog } from '@/data/roadmap';
import { useRoadmapStore } from '@/store/roadmap-store';

const comingSoon = (title: string) => router.push({ pathname: '/coming-soon', params: { title } });

export default function GoalExploreScreen() {
  const { roadmapId } = useLocalSearchParams<{ roadmapId?: string }>();
  const { roadmaps, addGoal } = useRoadmapStore();
  const roadmap = roadmaps.find((r) => r.id === roadmapId) ?? roadmaps[0];
  const [query, setQuery] = useState('');

  const q = query.trim();
  const results = q ? goalCatalog.filter((g) => g.title.includes(q)) : goalCatalog.slice(0, 3);
  const addedTitles = roadmap.goals.map((g) => g.title);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="목표 탐색" />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* 광고 배너 */}
        <Pressable
          onPress={() => comingSoon('무료 적성 검사')}
          style={({ pressed }) => [styles.ad, pressed && { opacity: 0.8 }]}
          accessibilityRole="button"
          accessibilityLabel="광고: 무료 적성 검사 받으러 가기">
          <View style={styles.adImage}>
            <MaterialCommunityIcons name="account-group" size={40} color={Colors.primary} />
          </View>
          <View style={styles.flex}>
            <View style={styles.adLink}>
              <AppText size="caption" weight="semibold" color={Colors.textSub}>
                무료 적성 검사 받으러 가기
              </AppText>
              <Ionicons name="open-outline" size={12} color={Colors.textSub} />
            </View>
            <AppText size="bodyLarge" weight="bold">
              새로운 나를 알아가는{'\n'}가장 완벽한 선택 !
            </AppText>
          </View>
          <AppText size="caption" color={Colors.textMuted} style={styles.adLabel}>
            광고
          </AppText>
        </Pressable>

        <View style={styles.titleBlock}>
          <AppText size="headline" weight="bold">
            진로 목표 탐색하기
          </AppText>
          <AppText size="small" color={Colors.textSub}>
            진로 로드맵 설계가 막막할 때! 키워드림이 추천해드려요.
          </AppText>
        </View>

        <View style={styles.divider} />

        {/* AI 추천받기 */}
        <Pressable
          onPress={() => router.push({ pathname: '/roadmap/ai', params: { roadmapId: roadmap.id } })}
          style={({ pressed }) => [styles.aiCard, pressed && { opacity: 0.85 }]}
          accessibilityRole="button">
          <View style={styles.sectionTitle}>
            <MaterialCommunityIcons name="robot-happy-outline" size={30} color={Colors.blue} />
            <AppText size="title" weight="bold">
              AI 추천받기
            </AppText>
            <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} style={styles.push} />
          </View>
          <View style={styles.aiIllustration}>
            <MaterialCommunityIcons name="map-marker-path" size={64} color={Colors.blue} />
            <AppText size="small" color={Colors.textSub} style={styles.center}>
              나이, 기간, 최종 목표를 알려주면{'\n'}딱 맞는 목표와 플랜을 추천해요
            </AppText>
          </View>
        </Pressable>

        <View style={styles.divider} />

        {/* 직접 탐색하기 */}
        <View style={styles.sectionTitle}>
          <MaterialCommunityIcons name="compass-outline" size={30} color={Colors.blue} />
          <AppText size="title" weight="bold">
            직접 탐색하기
          </AppText>
        </View>
        <View style={styles.search}>
          <Ionicons name="search" size={20} color={Colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="검색어 입력 (예: 자격증, 대학교)"
            placeholderTextColor={Colors.textMuted}
            style={styles.searchInput}
            returnKeyType="search"
            accessibilityLabel="목표 검색"
          />
        </View>

        <AppText size="small" color={Colors.textMuted}>
          {q ? `'${q}' 검색 결과 ${results.length}개` : '많이 찾는 목표'}
        </AppText>
        <View>
          {results.map((g) => (
            <GoalAddRow
              key={g.title}
              goal={g}
              added={addedTitles.includes(g.title)}
              onAdd={() => addGoal(roadmap.id, g)}
            />
          ))}
          {q !== '' && results.length === 0 && (
            <AppText size="body" color={Colors.textMuted} style={styles.empty}>
              찾는 목표가 없어요. 다른 검색어를 입력해 보세요.
            </AppText>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  flex: { flex: 1 },
  center: { textAlign: 'center' },
  push: { marginLeft: 'auto' },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  ad: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
  },
  adImage: {
    width: 100,
    height: 68,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryTint,
  },
  adLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  adLabel: {
    position: 'absolute',
    right: Spacing.sm,
    bottom: 4,
  },
  titleBlock: {
    gap: 4,
    marginTop: Spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
  },
  sectionTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  aiCard: {
    gap: Spacing.md,
  },
  aiIllustration: {
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.xl,
    borderRadius: Radius.lg,
    backgroundColor: Colors.blueTint,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    height: 46,
    paddingHorizontal: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.pill,
  },
  searchInput: {
    flex: 1,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.text,
    outlineWidth: 0,
  },
  empty: {
    textAlign: 'center',
    paddingVertical: Spacing.xl,
  },
});
