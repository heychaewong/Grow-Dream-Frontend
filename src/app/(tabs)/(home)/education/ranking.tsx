import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { formatRankingRecord, ranking } from '@/data/education';

const RANK_COLORS = [Colors.gold, Colors.silver, Colors.bronze];

export default function RankingScreen() {
  const leader = ranking[0];
  const me = ranking.find((r) => r.isMe);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.top}>
        <Pressable
          onPress={() => (router.canGoBack() ? router.back() : router.replace('/education'))}
          hitSlop={12}
          style={styles.back}
          accessibilityRole="button"
          accessibilityLabel="뒤로 가기">
          <Ionicons name="arrow-back" size={26} color={Colors.text} />
        </Pressable>
        <MaterialCommunityIcons name="trophy-award" size={52} color={Colors.gold} />
        <AppText size="display" weight="bold">
          진도율 랭킹
        </AppText>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.summary}>
          <AppText size="small" weight="bold">
            현재 1위 {formatRankingRecord(leader)}
          </AppText>
          {me && <AppText size="small">나의 퀴즈 {formatRankingRecord(me)}</AppText>}
          <Pressable
            onPress={() => router.push('/education/daily-quiz')}
            style={({ pressed }) => [styles.dailyButton, pressed && { opacity: 0.8 }]}
            accessibilityRole="button">
            <AppText size="caption" weight="semibold">
              데일리 퀴즈 풀기
            </AppText>
          </Pressable>
        </View>

        <View>
          {ranking.map((r, i) => (
            <View key={r.name} style={[styles.row, r.isMe && styles.meRow]}>
              <AppText
                weight="bold"
                color={RANK_COLORS[i] ?? Colors.text}
                style={[styles.rank, r.isMe && { color: Colors.silver }]}>
                {i + 1}위
              </AppText>
              <View style={styles.rowText}>
                <AppText size="bodyLarge" weight="bold">
                  {r.name}
                  {r.isMe ? ' (나)' : ''}
                </AppText>
                <AppText size="small">{formatRankingRecord(r)}</AppText>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  top: {
    alignItems: 'center',
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  back: {
    position: 'absolute',
    left: Spacing.xl,
    top: Spacing.lg,
  },
  scroll: {
    paddingBottom: Spacing.xxl,
  },
  summary: {
    alignItems: 'center',
    gap: Spacing.md,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
    paddingVertical: Spacing.xl,
    borderRadius: Radius.lg,
    backgroundColor: Colors.highlight,
  },
  dailyButton: {
    paddingHorizontal: 60,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    backgroundColor: Colors.orange,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  meRow: {
    backgroundColor: Colors.highlight,
  },
  rank: {
    width: 52,
    fontSize: 28,
    lineHeight: 36,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
});
