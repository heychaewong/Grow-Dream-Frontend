import { router } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { LessonRow } from '@/components/education/lesson-row';
import { LockedAlertModal } from '@/components/ui/app-modal';
import { AppText } from '@/components/ui/app-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, Spacing } from '@/constants/theme';
import { BASIC_COURSE_TITLE } from '@/data/education';
import { currentUser } from '@/data/user';
import { useCourseProgress } from '@/store/app-store';

export default function BasicCourseScreen() {
  const { lectureStatus, last } = useCourseProgress();
  const [lockedVisible, setLockedVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title={BASIC_COURSE_TITLE} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <AppText size="title" weight="bold">
            {currentUser.name}님!
          </AppText>
          {last ? (
            <>
              <AppText size="title" weight="bold" color={Colors.primary}>
                {last.lectureId}강 {last.chapterTitle}
              </AppText>
              <AppText size="title" weight="bold">
                까지 학습했어요
              </AppText>
            </>
          ) : (
            <AppText size="title" weight="bold">
              첫 강의를 시작해 볼까요?
            </AppText>
          )}
        </View>

        {lectureStatus.map(({ lecture, progress, unlocked }) => (
          <LessonRow
            key={lecture.id}
            badge={`${lecture.id}강`}
            title={lecture.title}
            subtitle={`${lecture.chapters.length}장 · 진도율 ${Math.round(progress * 100)}%`}
            locked={!unlocked}
            onPress={() =>
              unlocked
                ? router.push({ pathname: '/education/lecture/[lectureId]', params: { lectureId: String(lecture.id) } })
                : setLockedVisible(true)
            }
          />
        ))}
      </ScrollView>

      <LockedAlertModal visible={lockedVisible} onClose={() => setLockedVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.white },
  scroll: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  greeting: {
    gap: 6,
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
});
