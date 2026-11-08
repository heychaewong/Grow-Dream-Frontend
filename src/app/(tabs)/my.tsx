import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppText } from '@/components/ui/app-text';
import { HighlightTitle } from '@/components/ui/highlight-title';
import { Pill } from '@/components/ui/pill';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { currentUser } from '@/data/user';
import { useCourseProgress } from '@/store/app-store';

const comingSoon = (title: string) => router.push({ pathname: '/coming-soon', params: { title } });

export default function MyPageScreen() {
  const { stats } = currentUser;
  const course = useCourseProgress();
  const lastLecture = course.last ? `${course.last.lectureId}강` : '1강';

  const statItems = [
    { label: '취득 자격증', value: stats.certificates, unit: '' },
    { label: '나의 일기', value: stats.diaryDays, unit: '일째 작성중' },
    { label: '오늘의 질문', value: stats.answeredQuestions, unit: '개 답변중' },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <HighlightTitle size="display" style={styles.pageTitle}>
          마이페이지
        </HighlightTitle>

        {/* 프로필 */}
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={56} color={Colors.white} />
          </View>
          <View style={styles.profileText}>
            <AppText size="headline" weight="bold">
              {currentUser.name}
              <AppText size="title" weight="medium">
                {' '}님
              </AppText>
            </AppText>
            <AppText size="small" weight="semibold">
              {currentUser.school}
            </AppText>
          </View>
          <Pill
            label="프로필 수정"
            backgroundColor={Colors.surface}
            color={Colors.borderLight}
            style={styles.editPill}
            onPress={() => comingSoon('프로필 수정')}
          />
        </View>

        {/* 활동 요약 */}
        <View style={styles.stats}>
          {statItems.map((item) => (
            <View key={item.label} style={styles.stat}>
              <AppText size="small" weight="medium">
                {item.label}
              </AppText>
              <AppText size="headline" weight="semibold" color={Colors.primary}>
                {item.value}
              </AppText>
              <AppText size="small" weight="medium" style={styles.statUnit}>
                {item.unit}
              </AppText>
              <Pill label="자세히 보기" onPress={() => comingSoon(item.label)} />
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        {/* 나의 꿈 */}
        <View style={styles.dream}>
          <AppText size="display" weight="extrabold" style={[styles.quote, styles.quoteOpen]}>
            “
          </AppText>
          <AppText size="title" weight="bold" style={styles.dreamText}>
            {currentUser.dream}
          </AppText>
          <AppText size="display" weight="extrabold" style={[styles.quote, styles.quoteClose]}>
            ”
          </AppText>
          <Pill
            label="나의 진로 로드맵 보러가기"
            backgroundColor={Colors.highlight}
            color={Colors.textSub}
            size="small"
            onPress={() => router.push({ pathname: '/roadmap', params: { id: 'social' } })}
          />
        </View>

        <View style={styles.divider} />

        {/* 경제교육 진도율 */}
        <View style={styles.progressRow}>
          <AppText size="body" weight="bold">
            경제교육 진도율
          </AppText>
          <View style={styles.progressBox}>
            <ProgressBar value={course.progress} />
            <AppText size="caption" weight="medium" color={Colors.primary}>
              {lastLecture}까지 · {Math.round(course.progress * 100)}% 수강중
            </AppText>
          </View>
        </View>

        <View style={styles.divider} />

        {/* 자기소개 */}
        <AppText size="display" weight="bold" style={styles.introTitle}>
          자기소개
        </AppText>
        <View style={styles.introBox}>
          <AppText size="small" color={Colors.textMuted}>
            {currentUser.introduction}
          </AppText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  scroll: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  pageTitle: {
    alignSelf: 'center',
    marginBottom: Spacing.xl,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
  },
  avatar: {
    width: 94,
    height: 94,
    borderRadius: 47,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileText: {
    flex: 1,
    gap: Spacing.sm,
  },
  editPill: {
    alignSelf: 'flex-start',
    marginTop: Spacing.xl,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xxl,
    marginBottom: Spacing.xl,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  statUnit: {
    minHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginHorizontal: Spacing.xs,
  },
  dream: {
    alignItems: 'center',
    gap: Spacing.md,
    paddingVertical: Spacing.xl,
  },
  dreamText: {
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  quote: {
    position: 'absolute',
    fontSize: 40,
    lineHeight: 44,
  },
  quoteOpen: {
    left: 0,
    top: Spacing.md,
  },
  quoteClose: {
    right: 0,
    top: 0,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.lg,
    paddingVertical: Spacing.xl,
  },
  progressBox: {
    flex: 1,
    gap: 4,
    paddingTop: 3,
  },
  introTitle: {
    textAlign: 'center',
    marginTop: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  introBox: {
    minHeight: 200,
    padding: Spacing.lg,
    borderRadius: Radius.md,
    backgroundColor: Colors.cream,
  },
});
