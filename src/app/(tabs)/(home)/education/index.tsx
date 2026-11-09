import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { SectionTag } from '@/components/education/section-tag';
import { LockedAlertModal } from '@/components/ui/app-modal';
import { AppText } from '@/components/ui/app-text';
import { CoinBadge } from '@/components/ui/coin-badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { RichText } from '@/components/ui/rich-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, Radius, Spacing } from '@/constants/theme';
import {
  BASIC_COURSE_DESCRIPTION,
  BASIC_COURSE_STARTED_AT,
  BASIC_COURSE_TITLE,
  advancedCourses,
  dailyQuiz,
  ranking,
  todayIssue,
} from '@/data/education';
import { useCourseProgress } from '@/store/app-store';

export default function EducationMainScreen() {
  const course = useCourseProgress();
  const [lockedVisible, setLockedVisible] = useState(false);
  const remain = Math.round((1 - course.progress) * 100);
  const percent = Math.round(course.progress * 100);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader
        title="경제 교육"
        right={
          <View style={styles.headerRight}>
            <CoinBadge />
            <Ionicons name="ellipsis-vertical" size={22} color={Colors.text} />
          </View>
        }
      />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* 데일리 Quiz */}
        <Section title="데일리 Quiz">
          <FeatureCard
            illustration={<MaterialCommunityIcons name="home-heart" size={52} color={Colors.wrong} />}
            actionLabel="퀴즈 풀러가기"
            onPress={() => router.push('/education/daily-quiz')}>
            <AppText size="caption">{`< ${dailyQuiz.dateLabel}의 퀴즈 >`}</AppText>
            <RichText size="body" style={styles.quizPreview}>
              {dailyQuiz.preview}
            </RichText>
          </FeatureCard>
        </Section>

        {/* 내 서재 */}
        <Section title="내 서재">
          <SectionTag label={BASIC_COURSE_TITLE} />
          <AppText size="body">{BASIC_COURSE_DESCRIPTION}</AppText>

          <View style={styles.library}>
            <Pressable
              onPress={() => router.push('/education/basic')}
              style={({ pressed }) => [styles.bookColumn, pressed && { opacity: 0.7 }]}
              accessibilityRole="button"
              accessibilityLabel={`${BASIC_COURSE_TITLE} 시작하기`}>
              <View style={[styles.book, styles.bookActive]}>
                <MaterialCommunityIcons name="book" size={56} color="#C6373A" />
              </View>
              <AppText size="caption" color={Colors.textMuted}>
                클릭하여 시작
              </AppText>
            </Pressable>

            <View style={styles.courseInfo}>
              <InfoLine label="시작 :" value={BASIC_COURSE_STARTED_AT} />
              <View style={styles.infoRow}>
                <AppText size="body" weight="bold" style={styles.infoLabel}>
                  진도율 :
                </AppText>
                <AppText size="body" weight="bold" style={styles.flex}>
                  완료까지{' '}
                  <AppText size="body" weight="bold" color={Colors.quizGreen}>
                    {remain}%
                  </AppText>{' '}
                  남았어요. 힘내세요!
                </AppText>
              </View>
              <View style={styles.bar}>
                <ProgressBar value={course.progress} height={12} color={Colors.quizGreen} trackColor={Colors.primaryTint} />
                <AppText size="caption" weight="bold" style={styles.barLabel}>
                  {percent}%
                </AppText>
              </View>
              {course.last && (
                <AppText size="body" weight="bold">
                  마지막 학습:{' '}
                  <AppText size="body" weight="bold" color={Colors.quizGreen}>
                    {`‘${course.last.lectureId}강 - ${course.last.chapterTitle}’`}
                  </AppText>
                </AppText>
              )}
            </View>
          </View>

          <SectionTag label="세부 분야 교육" />
          <AppText size="body">{BASIC_COURSE_TITLE} 완료 후 이수할 수 있습니다.</AppText>
          <View style={styles.lockedRow}>
            {advancedCourses.map((c) => (
              <Pressable
                key={c.id}
                onPress={() => setLockedVisible(true)}
                style={styles.bookColumn}
                accessibilityRole="button"
                accessibilityLabel={`${c.title} 교육, 잠김`}>
                <View style={[styles.book, styles.bookLocked]}>
                  <MaterialCommunityIcons name="book-lock" size={56} color={c.color} />
                </View>
                <AppText size="caption" color={Colors.textMuted}>
                  잠김
                </AppText>
              </Pressable>
            ))}
          </View>

          <SectionTag label="New! 경제 교육" dot />
          <AppText size="body">최신 이슈에 맞춰 업데이트 되는 새로운 교육입니다.</AppText>
          <FeatureCard
            illustration={<MaterialCommunityIcons name="magnify" size={56} color={Colors.coin} />}
            actionLabel="교육 받기"
            onPress={() => router.push('/education/issue')}>
            <AppText size="bodyLarge" weight="bold">
              {todayIssue.title}
            </AppText>
            <AppText size="body" style={styles.issuePreview}>
              {todayIssue.question.replaceAll('**', '')}
            </AppText>
          </FeatureCard>
        </Section>

        {/* 진도율 랭킹 */}
        <View style={styles.rankingHeader}>
          <View style={styles.rankingTitle}>
            <AppText size="title" weight="bold">
              진도율 랭킹
            </AppText>
            <MaterialCommunityIcons name="trophy" size={24} color={Colors.gold} />
          </View>
          <Pressable
            onPress={() => router.push('/education/ranking')}
            style={styles.more}
            hitSlop={8}
            accessibilityRole="button">
            <AppText size="caption" color={Colors.textMuted}>
              더보기
            </AppText>
            <Ionicons name="chevron-forward" size={14} color={Colors.textMuted} />
          </Pressable>
        </View>
        <View style={styles.rankingList}>
          {ranking.slice(0, 3).map((r, i) => (
            <View key={r.name} style={styles.rankingRow}>
              <AppText size="body" weight="medium">
                {i + 1}위 {r.name}
                {r.isMe ? ' (나)' : ''}
              </AppText>
            </View>
          ))}
        </View>
      </ScrollView>

      <LockedAlertModal
        visible={lockedVisible}
        onClose={() => setLockedVisible(false)}
        message={`${BASIC_COURSE_TITLE}을 완료한 후\n수강하여 주십시오`}
      />
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <AppText size="title" weight="bold">
        {title}
      </AppText>
      {children}
    </View>
  );
}

function InfoLine({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <AppText size="body" weight="bold" style={styles.infoLabel}>
        {label}
      </AppText>
      <AppText size="body" weight="bold">
        {value}
      </AppText>
    </View>
  );
}

/** 연두색 카드 + 오른쪽 위 원형 일러스트 + 오른쪽 아래 초록 버튼 */
function FeatureCard({
  children,
  illustration,
  actionLabel,
  onPress,
}: {
  children: React.ReactNode;
  illustration: React.ReactNode;
  actionLabel: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.featureCard}>
      <View style={styles.featureBody}>
        <View style={styles.flex}>{children}</View>
        <View style={styles.illustration}>{illustration}</View>
      </View>
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        style={({ pressed }) => [styles.featureButton, pressed && { opacity: 0.8 }]}>
        <AppText size="bodyLarge" weight="bold" color={Colors.white}>
          {actionLabel}
        </AppText>
        <Ionicons name="chevron-forward" size={22} color={Colors.white} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  flex: { flex: 1 },
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  scroll: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.xl,
  },
  section: { gap: Spacing.md },
  featureCard: {
    backgroundColor: Colors.primaryTint,
    borderRadius: Radius.lg,
    paddingTop: Spacing.md,
    paddingLeft: Spacing.lg,
    // 버튼이 카드 오른쪽 아래로 살짝 튀어나오는 Figma 모양
    marginRight: -Spacing.xs,
  },
  featureBody: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingRight: Spacing.lg,
  },
  quizPreview: { marginTop: Spacing.sm, lineHeight: 27 },
  issuePreview: { marginTop: Spacing.sm, lineHeight: 26 },
  illustration: {
    width: 86,
    height: 86,
    borderRadius: 43,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureButton: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: -Spacing.sm,
    marginBottom: -Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: Radius.pill,
    backgroundColor: Colors.quizGreen,
  },
  library: {
    flexDirection: 'row',
    gap: Spacing.lg,
    marginTop: Spacing.xs,
  },
  bookColumn: { alignItems: 'center', gap: Spacing.sm },
  book: {
    width: 84,
    height: 84,
    borderRadius: Radius.md,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookActive: { borderColor: Colors.quizGreen, backgroundColor: Colors.white },
  bookLocked: { borderColor: Colors.primarySoft, backgroundColor: Colors.divider },
  courseInfo: { flex: 1, gap: 6, paddingTop: Spacing.xs },
  infoRow: { flexDirection: 'row', gap: Spacing.sm },
  infoLabel: { width: 62 },
  bar: { justifyContent: 'center' },
  barLabel: { position: 'absolute', alignSelf: 'center', fontSize: 9, lineHeight: 12 },
  lockedRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: Spacing.sm },
  rankingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.sm,
  },
  rankingTitle: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  more: { flexDirection: 'row', alignItems: 'center' },
  rankingList: { gap: Spacing.md, marginTop: -Spacing.sm },
  rankingRow: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: 4,
  },
});
