import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppModal } from '@/components/ui/app-modal';
import { AppText } from '@/components/ui/app-text';
import { DropdownChip } from '@/components/ui/dropdown-chip';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, FontFamily, FontSize, Radius, Spacing } from '@/constants/theme';
import { FIELDS, REGIONS, programs, type Program } from '@/data/funding';
import { useFundingStore } from '@/store/funding-store';

export default function CompanyFundingScreen() {
  const { appliedProgramIds, bookmarkedProgramIds, applyProgram, toggleBookmark } = useFundingStore();
  const [region, setRegion] = useState('대전');
  const [field, setField] = useState(FIELDS[0]);
  const [query, setQuery] = useState('');
  const [detail, setDetail] = useState<Program | null>(null);

  const q = query.trim();
  const list = programs.filter(
    (p) =>
      (region === REGIONS[0] || p.region === region) &&
      (field === FIELDS[0] || p.field === field) &&
      (!q || p.company.includes(q) || p.title.includes(q)),
  );

  /** 내가 신청하면 신청 인원이 한 명 늘어나요. */
  const appliedCount = (p: Program) => p.applied + (appliedProgramIds.includes(p.id) ? 1 : 0);
  const isFull = (p: Program) => appliedCount(p) >= p.capacity && !appliedProgramIds.includes(p.id);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="기업 펀딩 신청하기" />

      <View style={styles.filters}>
        <DropdownChip label="지역" options={REGIONS} value={region} onChange={setRegion} />
        <DropdownChip label="분야" options={FIELDS} value={field} onChange={setField} />
        <View style={styles.search}>
          <Ionicons name="search-outline" size={20} color={Colors.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="검색어 입력"
            placeholderTextColor={Colors.textMuted}
            style={styles.searchInput}
            accessibilityLabel="공고 검색"
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppText size="title" weight="bold" style={styles.title}>
          지금 HOT한 공고
        </AppText>

        {list.map((p) => {
          const applied = appliedProgramIds.includes(p.id);
          const full = isFull(p);
          const bookmarked = bookmarkedProgramIds.includes(p.id);
          return (
            <View key={p.id} style={styles.card}>
              <Pressable
                onPress={() => toggleBookmark(p.id)}
                hitSlop={10}
                style={styles.star}
                accessibilityRole="button"
                accessibilityLabel={bookmarked ? '관심 공고 해제' : '관심 공고 등록'}>
                <Ionicons name={bookmarked ? 'star' : 'star-outline'} size={20} color={bookmarked ? Colors.coin : Colors.textSub} />
              </Pressable>
              <View style={styles.cardBody}>
                <View style={styles.programIcon}>
                  <MaterialCommunityIcons
                    name={p.icon as keyof typeof MaterialCommunityIcons.glyphMap}
                    size={48}
                    color={p.iconColor}
                  />
                </View>
                <View style={styles.cardTexts}>
                  <AppText size="body" weight="bold">
                    {p.company}
                  </AppText>
                  <AppText size="body" color={Colors.textMuted}>
                    {p.title}
                  </AppText>
                  <View style={styles.statusRow}>
                    <AppText size="small" color={Colors.textSub}>
                      상태 :
                    </AppText>
                    <StatusPill program={p} count={appliedCount(p)} applied={applied} full={full} />
                  </View>
                </View>
              </View>
              <Pressable onPress={() => setDetail(p)} style={styles.more} accessibilityRole="button">
                <AppText size="small" color={Colors.textMuted}>
                  더 알아보기
                </AppText>
                <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
              </Pressable>
            </View>
          );
        })}

        {list.length === 0 && (
          <AppText size="body" color={Colors.textMuted} style={styles.empty}>
            조건에 맞는 공고가 없어요.
          </AppText>
        )}
      </ScrollView>

      <AppModal visible={detail !== null} onClose={() => setDetail(null)} showClose cardStyle={styles.detail}>
        {detail && (
          <>
            <AppText size="title" weight="bold">
              {detail.title}
            </AppText>
            <AppText size="small" color={Colors.textSub}>
              {detail.company} · {detail.region} · {detail.field}
            </AppText>
            <AppText size="body" style={styles.detailText}>
              {detail.description}
            </AppText>
            <AppText size="small" color={Colors.textMuted}>
              모집 인원 {appliedCount(detail)} / {detail.capacity}명
            </AppText>
            <Pressable
              onPress={() => applyProgram(detail.id)}
              disabled={isFull(detail) || appliedProgramIds.includes(detail.id)}
              accessibilityRole="button"
              style={[
                styles.applyButton,
                (isFull(detail) || appliedProgramIds.includes(detail.id)) && styles.applyDisabled,
              ]}>
              <AppText size="body" weight="bold" color={Colors.white}>
                {appliedProgramIds.includes(detail.id) ? '신청 완료' : isFull(detail) ? '모집이 마감됐어요' : '교육 신청하기'}
              </AppText>
            </Pressable>
          </>
        )}
      </AppModal>
    </SafeAreaView>
  );
}

function StatusPill({ program, count, applied, full }: { program: Program; count: number; applied: boolean; full: boolean }) {
  const label = applied ? '신청완료' : full ? '모집완료' : '모집중';
  const background = applied ? Colors.blue : full ? Colors.primaryDark : Colors.primarySoft;
  return (
    <View style={[styles.pill, { backgroundColor: background }]}>
      <AppText size="small" weight="semibold" color={Colors.white}>
        {label} ( {count} / {program.capacity} )
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  filters: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.sm,
    zIndex: 10,
  },
  search: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 44,
    paddingHorizontal: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    borderRadius: 4,
  },
  searchInput: {
    flex: 1,
    minWidth: 0,
    fontFamily: FontFamily.regular,
    fontSize: FontSize.body,
    color: Colors.text,
  },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  title: {
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  card: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    borderRadius: Radius.lg,
  },
  star: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    zIndex: 1,
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  programIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surface,
  },
  cardTexts: {
    flex: 1,
    gap: 4,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  pill: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: Radius.pill,
  },
  more: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    gap: 2,
    marginTop: Spacing.sm,
  },
  empty: {
    textAlign: 'center',
    paddingVertical: Spacing.xxl,
  },
  detail: {
    gap: Spacing.sm,
    padding: Spacing.xl,
    paddingTop: 0,
  },
  detailText: {
    marginVertical: Spacing.sm,
  },
  applyButton: {
    alignItems: 'center',
    marginTop: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryDark,
  },
  applyDisabled: {
    backgroundColor: Colors.borderLight,
  },
});
