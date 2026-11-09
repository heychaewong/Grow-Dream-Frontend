import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppModal } from '@/components/ui/app-modal';
import { AppText } from '@/components/ui/app-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { DONATION_AMOUNTS, recipients, type Recipient } from '@/data/funding';
import { useFundingStore } from '@/store/funding-store';

const SORTS = ['최근 업로드순', '추천순', '정확도순'] as const;
type Sort = (typeof SORTS)[number];

const sorters: Record<Sort, (a: Recipient, b: Recipient) => number> = {
  '최근 업로드순': (a, b) => b.uploadedAt.localeCompare(a.uploadedAt),
  추천순: (a, b) => b.score - a.score,
  // 검수 완료된 프로필을 먼저 보여줘요.
  정확도순: (a, b) => Number(b.verified) - Number(a.verified) || b.score - a.score,
};

const GENDERS = ['전체', '여성', '남성'] as const;
const AGES = ['전체', '19~20세', '21세 이상'] as const;

const won = (n: number) => `${n.toLocaleString('ko-KR')}원`;

export default function DonateScreen() {
  const { isSponsoring, sponsor } = useFundingStore();
  const [sort, setSort] = useState<Sort>('최근 업로드순');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [gender, setGender] = useState(0);
  const [age, setAge] = useState(0);
  const [target, setTarget] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState(DONATION_AMOUNTS[1]);
  const [done, setDone] = useState(false);

  const list = recipients
    .filter((r) => !verifiedOnly || r.verified)
    .filter((r) => gender === 0 || r.gender === GENDERS[gender])
    .filter((r) => age === 0 || (age === 1 ? r.age <= 20 : r.age >= 21))
    .sort(sorters[sort]);

  const openSponsor = (r: Recipient) => {
    setTarget(r);
    setAmount(DONATION_AMOUNTS[1]);
    setDone(false);
  };

  const confirm = () => {
    if (!target) return;
    sponsor(target.id, amount);
    setDone(true);
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title="정기후원하기" />

      {/* 정렬 탭 */}
      <View style={styles.tabs} accessibilityRole="tablist">
        {SORTS.map((s) => {
          const active = s === sort;
          return (
            <Pressable
              key={s}
              onPress={() => setSort(s)}
              style={[styles.tab, active && styles.tabActive]}
              accessibilityRole="tab"
              accessibilityState={{ selected: active }}>
              <AppText size={active ? 'bodyLarge' : 'body'} weight={active ? 'bold' : 'medium'} color={active ? Colors.text : Colors.textMuted}>
                {s}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      {/* 필터 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters} style={styles.filterBar}>
        <FilterChip label="키워드림 확인" active={verifiedOnly} onPress={() => setVerifiedOnly((v) => !v)} />
        <FilterChip
          label={gender === 0 ? '성별' : GENDERS[gender]}
          active={gender !== 0}
          onPress={() => setGender((g) => (g + 1) % GENDERS.length)}
        />
        <FilterChip
          label={age === 0 ? '연령' : AGES[age]}
          active={age !== 0}
          onPress={() => setAge((a) => (a + 1) % AGES.length)}
        />
      </ScrollView>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {list.map((r) => {
          const sponsoring = isSponsoring(r.id);
          return (
            <View key={r.id} style={styles.item}>
              <View style={styles.profile}>
                <View style={styles.photo}>
                  <Ionicons name="person" size={44} color={Colors.white} />
                </View>
                <View style={styles.nameRow}>
                  <AppText size="bodyLarge" weight="bold">
                    {r.name}
                  </AppText>
                  {r.verified && (
                    <Ionicons name="checkmark-circle" size={16} color={Colors.blue} accessibilityLabel="키워드림 확인 완료" />
                  )}
                </View>
              </View>
              <View style={styles.info}>
                <AppText size="body">
                  <AppText size="body" weight="bold">
                    나의 꿈 :{' '}
                  </AppText>
                  {r.dream}
                </AppText>
                <AppText size="body" style={styles.intro}>
                  <AppText size="body" weight="bold">
                    한줄 소개 :{' '}
                  </AppText>
                  {r.intro}
                </AppText>
                <View style={styles.actions}>
                  <ActionButton label="마이페이지 보러가기" color={Colors.mustard} textColor={Colors.text} onPress={() => router.push({ pathname: '/coming-soon', params: { title: `${r.name} 님의 마이페이지` } })} />
                  <ActionButton
                    label={sponsoring ? '후원중' : '후원하기'}
                    color={sponsoring ? Colors.primarySoft : Colors.primary}
                    textColor={Colors.white}
                    onPress={() => openSponsor(r)}
                  />
                </View>
              </View>
            </View>
          );
        })}
        {list.length === 0 && (
          <AppText size="body" color={Colors.textMuted} style={styles.empty}>
            조건에 맞는 수급자가 없어요.
          </AppText>
        )}
        <View style={styles.page}>
          <AppText size="small" weight="bold" color={Colors.white}>
            1
          </AppText>
        </View>
      </ScrollView>

      <AppModal visible={target !== null} onClose={() => setTarget(null)} showClose cardStyle={styles.modal}>
        {target &&
          (done ? (
            <View style={styles.doneBox}>
              <Ionicons name="heart" size={48} color={Colors.wrong} />
              <AppText size="title" weight="bold" style={styles.center}>
                {target.name} 님의 후원자가 되었어요!
              </AppText>
              <AppText size="body" color={Colors.textSub} style={styles.center}>
                매달 {won(amount)}씩 후원돼요.{'\n'}키워드림톡에서 소식을 받아볼 수 있어요.
              </AppText>
              <Pressable
                onPress={() => {
                  setTarget(null);
                  router.push({ pathname: '/talk/[recipientId]', params: { recipientId: target.id } });
                }}
                style={styles.confirm}
                accessibilityRole="button">
                <AppText size="body" weight="bold" color={Colors.white}>
                  키워드림톡으로 가기
                </AppText>
              </Pressable>
            </View>
          ) : (
            <>
              <AppText size="title" weight="bold">
                {target.name} 님 정기후원
              </AppText>
              <AppText size="small" color={Colors.textSub}>
                나의 꿈: {target.dream}
              </AppText>
              <AppText size="body" weight="semibold" style={styles.amountLabel}>
                매달 후원할 금액
              </AppText>
              <View style={styles.amounts}>
                {DONATION_AMOUNTS.map((a) => (
                  <Pressable
                    key={a}
                    onPress={() => setAmount(a)}
                    style={[styles.amount, a === amount && styles.amountActive]}
                    accessibilityRole="radio"
                    accessibilityState={{ selected: a === amount }}>
                    <AppText size="body" weight="bold" color={a === amount ? Colors.white : Colors.text}>
                      {won(a)}
                    </AppText>
                  </Pressable>
                ))}
              </View>
              <Pressable onPress={confirm} style={styles.confirm} accessibilityRole="button">
                <AppText size="body" weight="bold" color={Colors.white}>
                  {isSponsoring(target.id) ? '후원 금액 변경하기' : '정기후원 시작하기'}
                </AppText>
              </Pressable>
            </>
          ))}
      </AppModal>
    </SafeAreaView>
  );
}

function FilterChip({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}>
      <AppText size="body" weight="medium" color={active ? Colors.primary : Colors.textSub}>
        {label}
      </AppText>
      <Ionicons name={active ? 'checkmark' : 'chevron-down'} size={14} color={active ? Colors.primary : Colors.textSub} />
    </Pressable>
  );
}

function ActionButton({
  label,
  color,
  textColor,
  onPress,
}: {
  label: string;
  color: string;
  textColor: string;
  onPress: () => void;
}) {
  return (
    <Pressable hitSlop={8}
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [styles.action, { backgroundColor: color }, pressed && { opacity: 0.8 }]}>
      <AppText size="small" weight="semibold" color={textColor}>
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  center: { textAlign: 'center' },
  tabs: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: Spacing.lg,
    marginHorizontal: Spacing.xl,
    borderBottomWidth: 2,
    borderBottomColor: Colors.primarySoft,
  },
  tab: {
    paddingHorizontal: 4,
    paddingVertical: Spacing.sm,
    marginBottom: -2,
  },
  tabActive: {
    borderBottomWidth: 4,
    borderBottomColor: Colors.primary,
  },
  filterBar: {
    flexGrow: 0,
  },
  filters: {
    gap: Spacing.sm,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderWidth: 2,
    borderColor: Colors.borderLight,
    borderRadius: Radius.pill,
  },
  chipActive: {
    borderColor: Colors.primarySoft,
    backgroundColor: Colors.primaryTint,
  },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.xl,
  },
  item: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  profile: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: Radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primarySoft,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  info: {
    flex: 1,
    gap: 4,
  },
  intro: {
    lineHeight: 25,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
  },
  action: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: Radius.sm,
    elevation: 2,
    shadowColor: Colors.black,
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  empty: {
    textAlign: 'center',
    paddingVertical: Spacing.xxl,
  },
  page: {
    alignSelf: 'center',
    width: 24,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Radius.sm,
    backgroundColor: Colors.primaryDark,
  },
  modal: {
    gap: Spacing.sm,
    padding: Spacing.xl,
    paddingTop: 0,
  },
  amountLabel: {
    marginTop: Spacing.md,
  },
  amounts: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  amount: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: Radius.md,
  },
  amountActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  confirm: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.primaryDark,
  },
  doneBox: {
    alignItems: 'center',
    gap: Spacing.md,
  },
});
