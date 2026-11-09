import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { AnswerInput } from '@/components/education/answer-input';
import { QuizButton, QuizLayout } from '@/components/education/quiz-layout';
import { ExplanationModal } from '@/components/ui/app-modal';
import { AppText } from '@/components/ui/app-text';
import { Colors, Spacing } from '@/constants/theme';
import { dailyQuiz } from '@/data/education';
import { useAppStore } from '@/store/app-store';

const normalize = (s: string) => s.replace(/\s/g, '');

export default function DailyQuizScreen() {
  const { rewardQuiz } = useAppStore();
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<{ correct: boolean; rewarded: number } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const submit = () => {
    const correct = normalize(answer) === normalize(dailyQuiz.answer);
    const rewarded = correct ? rewardQuiz(dailyQuiz.id, 1) : 0;
    setResult({ correct, rewarded });
    setModalVisible(true);
  };

  const banner = result && (
    <View style={styles.banner}>
      <AppText weight="extrabold" color={Colors.white} style={styles.bannerText}>
        {result.correct ? '정답입니다!' : '아쉬워요!'}
      </AppText>
      {result.rewarded > 0 && (
        <AppText size="bodyLarge" weight="bold" color={Colors.white} style={styles.bannerReward}>
          {result.rewarded}코인 지급
        </AppText>
      )}
    </View>
  );

  const explanation = result?.correct
    ? dailyQuiz.explanation
    : `정답은 '${dailyQuiz.answer}'예요.\n\n${dailyQuiz.explanation}`;

  return (
    <QuizLayout
      title="# 데일리 Quiz"
      footer={
        <>
          <View />
          {result ? (
            <QuizButton label="돌아가기" onPress={() => router.back()} />
          ) : (
            <QuizButton label="제출" onPress={submit} disabled={answer.trim().length === 0} />
          )}
        </>
      }>
      <View style={styles.body}>
        <AppText size="bodyLarge" style={styles.question}>
          {dailyQuiz.question}
        </AppText>
        <AnswerInput value={answer} onChangeText={setAnswer} editable={!result} width={190} wrong={result?.correct === false} />
      </View>

      <ExplanationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        text={explanation}
        above={banner}
      />
    </QuizLayout>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    gap: Spacing.xxl,
    paddingBottom: 80,
  },
  question: {
    textAlign: 'center',
    lineHeight: 42,
  },
  banner: {
    alignItems: 'center',
  },
  bannerText: {
    fontSize: 44,
    lineHeight: 58,
    paddingHorizontal: 4,
    backgroundColor: Colors.quizGreen,
  },
  bannerReward: {
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: 2,
    borderRadius: 999,
    overflow: 'hidden',
    backgroundColor: Colors.quizGreen,
  },
});
