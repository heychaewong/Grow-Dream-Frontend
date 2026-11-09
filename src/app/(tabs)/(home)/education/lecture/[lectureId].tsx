import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { DoneCircle, LessonRow } from '@/components/education/lesson-row';
import { LockedAlertModal } from '@/components/ui/app-modal';
import { AppText } from '@/components/ui/app-text';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Colors, Spacing } from '@/constants/theme';
import { BASIC_COURSE_TITLE, lectures } from '@/data/education';
import { useAppStore } from '@/store/app-store';

/** 웹 정적 배포용: 강의마다 HTML을 미리 만들어서 주소로 바로 들어와도 열리게 해요. */
export function generateStaticParams(): { lectureId: string }[] {
  return lectures.map((l) => ({ lectureId: String(l.id) }));
}

export default function LectureScreen() {
  const { lectureId } = useLocalSearchParams<{ lectureId: string }>();
  const lecture = lectures.find((l) => String(l.id) === lectureId);
  const { completedChapters } = useAppStore();
  const [lockedVisible, setLockedVisible] = useState(false);

  if (!lecture) {
    return (
      <SafeAreaView style={styles.safe} edges={['top']}>
        <ScreenHeader title={BASIC_COURSE_TITLE} />
        <AppText style={styles.empty}>강의를 찾을 수 없어요.</AppText>
      </SafeAreaView>
    );
  }

  const completed = completedChapters[lecture.id] ?? 0;

  const openChapter = (index: number) => {
    if (index > completed) {
      setLockedVisible(true);
      return;
    }
    const chapter = lecture.chapters[index];
    if (!chapter.lesson) {
      router.push({ pathname: '/coming-soon', params: { title: chapter.title } });
      return;
    }
    router.push({
      pathname: '/education/chapter/[lectureId]/[chapter]',
      params: { lectureId: String(lecture.id), chapter: String(index + 1) },
    });
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScreenHeader title={BASIC_COURSE_TITLE} />
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <AppText size="title" weight="bold" style={styles.title}>
          {lecture.id}강 {lecture.title}
        </AppText>

        {lecture.chapters.map((chapter, i) => (
          <LessonRow
            key={chapter.title}
            badge={`${i + 1}장`}
            title={chapter.title}
            locked={i > completed}
            right={<DoneCircle done={i < completed} />}
            onPress={() => openChapter(i)}
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
  title: {
    paddingHorizontal: Spacing.sm,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.xxl,
  },
  empty: { textAlign: 'center', marginTop: Spacing.xxl },
});
