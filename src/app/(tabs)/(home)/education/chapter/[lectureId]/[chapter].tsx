import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { BlankQuestionBlock, OxQuestionRow, isCorrect } from '@/components/education/chapter-quiz';
import { QuizButton, QuizLayout } from '@/components/education/quiz-layout';
import { ResultModal } from '@/components/education/result-modal';
import { ExplanationModal } from '@/components/ui/app-modal';
import { AppText } from '@/components/ui/app-text';
import { CoinBadge } from '@/components/ui/coin-badge';
import { RichText } from '@/components/ui/rich-text';
import { Colors, Spacing } from '@/constants/theme';
import { lectures, type QuizQuestion } from '@/data/education';
import { useAppStore } from '@/store/app-store';

type Step = 'lesson' | 'quiz';

export default function ChapterScreen() {
  const params = useLocalSearchParams<{ lectureId: string; chapter: string }>();
  const lecture = lectures.find((l) => String(l.id) === params.lectureId);
  const chapterIndex = Number(params.chapter) - 1;
  const chapter = lecture?.chapters[chapterIndex];

  const { rewardQuiz, completeChapter } = useAppStore();
  const [step, setStep] = useState<Step>('lesson');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [graded, setGraded] = useState(false);
  const [result, setResult] = useState<{ correct: number; rewarded: number } | null>(null);
  const [resultVisible, setResultVisible] = useState(false);
  const [explaining, setExplaining] = useState<QuizQuestion | null>(null);

  if (!lecture || !chapter) {
    return (
      <QuizLayout title="학습">
        <AppText style={styles.center}>학습 내용을 찾을 수 없어요.</AppText>
      </QuizLayout>
    );
  }

  const quiz = chapter.quiz ?? [];
  const allAnswered = quiz.every((q) => (answers[q.id] ?? '').trim().length > 0);
  // 화면 순서: OX 문제 먼저, 빈칸 문제 나중 (Figma 배치)
  const oxQuestions = quiz.filter((q) => q.type === 'ox');
  const blankQuestions = quiz.filter((q) => q.type === 'blank');

  const finishLesson = () => {
    if (quiz.length > 0) {
      setStep('quiz');
      return;
    }
    completeChapter(lecture.id, chapterIndex);
    router.back();
  };

  const submit = () => {
    const correct = quiz.filter((q) => isCorrect(q, answers[q.id])).length;
    const rewarded = rewardQuiz(`chapter-${lecture.id}-${chapterIndex + 1}`, correct);
    completeChapter(lecture.id, chapterIndex);
    setGraded(true);
    setResult({ correct, rewarded });
    setResultVisible(true);
  };

  const setAnswer = (id: string) => (value: string) => setAnswers((a) => ({ ...a, [id]: value }));

  const footer =
    step === 'lesson' ? (
      <>
        <View />
        <QuizButton label="다음" onPress={finishLesson} />
      </>
    ) : graded ? (
      <>
        <View />
        <QuizButton label="목록으로" onPress={() => router.back()} />
      </>
    ) : (
      <>
        <QuizButton label="이전" onPress={() => setStep('lesson')} />
        <QuizButton label="제출" onPress={submit} disabled={!allAnswered} />
      </>
    );

  return (
    <QuizLayout title={chapter.title} headerRight={<CoinBadge />} footer={footer}>
      {step === 'lesson' ? (
        <View style={styles.lesson}>
          <AppText size="display" weight="bold" color={Colors.white} style={styles.lessonTitle}>
            {chapter.title}
          </AppText>
          <View style={styles.lessonLines}>
            {(chapter.lesson ?? []).map((line) => (
              <RichText key={line} size="bodyLarge" style={styles.lessonLine}>
                {line}
              </RichText>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.quiz}>
          {oxQuestions.map((q) => (
            <OxQuestionRow
              key={q.id}
              question={q}
              answer={answers[q.id]}
              onAnswer={setAnswer(q.id)}
              graded={graded}
              onShowExplanation={() => setExplaining(q)}
            />
          ))}
          {blankQuestions.map((q) => (
            <BlankQuestionBlock
              key={q.id}
              question={q}
              answer={answers[q.id]}
              onAnswer={setAnswer(q.id)}
              graded={graded}
              onShowExplanation={() => setExplaining(q)}
            />
          ))}
          {!graded && !allAnswered && (
            <AppText size="small" color={Colors.textMuted} style={styles.center}>
              모든 문제에 답하면 제출할 수 있어요.
            </AppText>
          )}
        </View>
      )}

      <ResultModal
        visible={resultVisible}
        onClose={() => setResultVisible(false)}
        correct={result?.correct ?? 0}
        total={quiz.length}
        rewarded={result?.rewarded ?? 0}
      />
      <ExplanationModal
        visible={explaining !== null}
        onClose={() => setExplaining(null)}
        text={explaining?.explanation ?? ''}
      />
    </QuizLayout>
  );
}

const styles = StyleSheet.create({
  center: { textAlign: 'center' },
  lesson: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Spacing.xxl,
  },
  lessonTitle: {
    backgroundColor: Colors.quizGreen,
    paddingHorizontal: 4,
  },
  lessonLines: {
    marginTop: 140,
    gap: Spacing.xl,
  },
  lessonLine: {
    textAlign: 'center',
    fontSize: 22,
    lineHeight: 31,
  },
  quiz: {
    gap: Spacing.xxl,
    paddingTop: Spacing.xl,
  },
});
