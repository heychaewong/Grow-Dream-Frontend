import { router } from 'expo-router';
import { useState } from 'react';
import { Linking, Pressable, StyleSheet, View } from 'react-native';

import { QuizButton, QuizLayout } from '@/components/education/quiz-layout';
import { AppText } from '@/components/ui/app-text';
import { RichText } from '@/components/ui/rich-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import { todayIssue } from '@/data/education';

/** 오늘의 이슈: 표지 1장 + 본문 여러 장을 넘겨 보는 화면 */
export default function TodayIssueScreen() {
  const [page, setPage] = useState(0);
  const lastPage = todayIssue.pages.length; // 0 = 표지
  const isLast = page === lastPage;

  return (
    <QuizLayout
      title="New! 경제 교육"
      footer={
        <>
          {page > 0 ? <QuizButton label="이전" onPress={() => setPage((p) => p - 1)} /> : <View />}
          <QuizButton label={isLast ? '완료' : '다음'} onPress={() => (isLast ? router.back() : setPage((p) => p + 1))} />
        </>
      }>
      {page === 0 ? (
        <View style={styles.cover}>
          <AppText weight="bold" color={Colors.white} style={styles.coverTitle}>
            {todayIssue.title}
          </AppText>
          <RichText size="title" style={styles.coverQuestion}>
            {todayIssue.question}
          </RichText>
        </View>
      ) : (
        <View style={styles.page}>
          <RichText size="body" style={styles.pageText}>
            {todayIssue.pages[page - 1]}
          </RichText>

          {page === 1 && (
            <View style={styles.source}>
              <AppText size="small" weight="bold">
                기사 출처
              </AppText>
              <Pressable
                onPress={() => Linking.openURL(todayIssue.source.url)}
                style={({ pressed }) => [styles.sourceCard, pressed && { opacity: 0.7 }]}
                accessibilityRole="link">
                <AppText size="small" weight="bold">
                  {todayIssue.source.title}
                </AppText>
                <AppText size="caption" color={Colors.blue} numberOfLines={1}>
                  {todayIssue.source.url}
                </AppText>
              </Pressable>
            </View>
          )}
        </View>
      )}

      <AppText size="caption" color={Colors.textMuted} style={styles.pager}>
        {page + 1} / {lastPage + 1}
      </AppText>
    </QuizLayout>
  );
}

const styles = StyleSheet.create({
  cover: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Spacing.xxl,
    gap: 150,
  },
  coverTitle: {
    fontSize: 40,
    lineHeight: 52,
    paddingHorizontal: 4,
    backgroundColor: Colors.quizGreen,
  },
  coverQuestion: {
    textAlign: 'center',
    lineHeight: 44,
  },
  page: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.xxl,
  },
  pageText: {
    textAlign: 'center',
    lineHeight: 34,
  },
  source: {
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sourceCard: {
    width: '90%',
    gap: Spacing.xs,
    padding: Spacing.md,
    borderWidth: 1.5,
    borderColor: Colors.quizGreen,
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
  },
  pager: {
    textAlign: 'center',
    marginTop: Spacing.lg,
  },
});
