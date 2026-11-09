import { Pressable, StyleSheet, View } from 'react-native';

import { AppText } from '@/components/ui/app-text';
import { Colors, Radius, Spacing } from '@/constants/theme';
import type { BlankQuestion, OxQuestion, QuizQuestion } from '@/data/education';

import { AnswerInput } from './answer-input';

/** 빈칸 답 비교: 띄어쓰기 차이는 봐줘요. */
export const isCorrect = (q: QuizQuestion, answer: string | undefined) =>
  !!answer && answer.replace(/\s/g, '') === q.answer.replace(/\s/g, '');

type QuestionProps<Q extends QuizQuestion> = {
  question: Q;
  answer: string | undefined;
  onAnswer: (value: string) => void;
  /** 제출 후 채점 결과를 보여줄지 */
  graded: boolean;
  onShowExplanation: () => void;
};

export function OxQuestionRow({ question, answer, onAnswer, graded, onShowExplanation }: QuestionProps<OxQuestion>) {
  const wrong = graded && !isCorrect(question, answer);

  return (
    <View style={styles.oxBlock}>
      <View style={styles.oxRow}>
        <AppText size="body" weight="medium" style={styles.oxText}>
          {question.text}
        </AppText>
        <View style={styles.oxButtons}>
          {(['O', 'X'] as const).map((choice) => {
            const selected = answer === choice;
            const background = selected ? (wrong ? Colors.wrong : Colors.quizGreen) : Colors.quizGreenSoft;
            return (
              <Pressable
                key={choice}
                onPress={() => onAnswer(choice)}
                disabled={graded}
                accessibilityRole="radio"
                accessibilityState={{ selected, disabled: graded }}
                accessibilityLabel={`${question.text} ${choice}`}
                style={[styles.oxButton, { backgroundColor: background }]}>
                <AppText size="body" weight="medium" color={selected ? Colors.white : Colors.textSub}>
                  {choice}
                </AppText>
              </Pressable>
            );
          })}
        </View>
      </View>
      {wrong && question.explanation && <ExplanationChip onPress={onShowExplanation} />}
    </View>
  );
}

export function BlankQuestionBlock({
  question,
  answer,
  onAnswer,
  graded,
  onShowExplanation,
}: QuestionProps<BlankQuestion>) {
  const wrong = graded && !isCorrect(question, answer);

  return (
    <View style={styles.blankBlock}>
      <AppText size="bodyLarge" style={styles.blankText}>
        {question.text}
      </AppText>
      <AnswerInput value={answer ?? ''} onChangeText={onAnswer} editable={!graded} wrong={wrong} width={180} />
      {wrong && (
        <>
          <AppText size="small" color={Colors.wrong} weight="semibold">
            정답: {question.answer}
          </AppText>
          {question.explanation && <ExplanationChip onPress={onShowExplanation} />}
        </>
      )}
    </View>
  );
}

function ExplanationChip({ onPress }: { onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={styles.chip} accessibilityRole="button" accessibilityLabel="해설 보기">
      <AppText size="small" weight="semibold" color={Colors.textMuted}>
        해설
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  oxBlock: {
    alignItems: 'flex-end',
    gap: 4,
  },
  oxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  oxText: {
    flex: 1,
    textAlign: 'center',
  },
  oxButtons: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  oxButton: {
    width: 48,
    height: 26,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  blankBlock: {
    alignItems: 'center',
    gap: Spacing.md,
  },
  blankText: {
    textAlign: 'center',
    lineHeight: 34,
  },
  chip: {
    alignSelf: 'flex-end',
    marginRight: 34,
    paddingHorizontal: Spacing.md,
    paddingVertical: 1,
    borderRadius: Radius.sm,
    backgroundColor: Colors.white,
  },
});
